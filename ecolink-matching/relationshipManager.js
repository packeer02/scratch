/**
 * EcoLink Relationship Management Module
 * 
 * Simulates REST API endpoints and backend logic for tracking mentor-startup
 * engagements, logging activity, and automatically determining health status.
 */

class EcoLinkRelationshipManager {
  constructor() {
    this.relationships = [];
    this.currentDate = new Date(); // Using a mutable date for simulation testing
  }

  // --- API Endpoint: POST /relationships/create ---
  createRelationship(mentorId, startupId, adminId) {
    const newRel = {
      relationshipId: 'REL-' + Math.floor(Math.random() * 100000),
      mentorId: mentorId,
      startupId: startupId,
      createdAt: this.currentDate.toISOString(),
      status: "Active",
      createdBy: adminId,
      meetings: [],
      milestones: [],
      lastActivityDate: this.currentDate.toISOString()
    };
    
    this.relationships.push(newRel);
    return newRel;
  }

  // --- API Endpoint: GET /relationships/:id ---
  getRelationship(id) {
    const rel = this.relationships.find(r => r.relationshipId === id);
    if (!rel) throw new Error("Relationship not found");
    this._calculateStatus(rel); // Ensure status is up to date when fetched
    return rel;
  }

  // --- API Endpoint: POST /relationships/:id/meeting-log ---
  logMeeting(id, meetingData) {
    const rel = this.getRelationship(id);
    
    const newMeeting = {
      meetingId: 'MTG-' + Math.floor(Math.random() * 10000),
      date: meetingData.date || this.currentDate.toISOString(),
      type: meetingData.type,
      notes: meetingData.notes,
      actionItems: meetingData.actionItems || [],
      createdBy: meetingData.createdBy
    };

    // Keep chronological
    rel.meetings.push(newMeeting);
    rel.meetings.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    rel.lastActivityDate = this.currentDate.toISOString();
    this._calculateStatus(rel);
    return rel;
  }

  // --- API Endpoint: POST /relationships/:id/milestone ---
  addMilestone(id, milestoneData) {
    const rel = this.getRelationship(id);
    
    const newMilestone = {
      milestoneId: 'MS-' + Math.floor(Math.random() * 10000),
      title: milestoneData.title,
      description: milestoneData.description,
      status: milestoneData.status || "Pending",
      targetDate: milestoneData.targetDate,
      completedDate: milestoneData.status === "Completed" ? this.currentDate.toISOString() : null
    };

    rel.milestones.push(newMilestone);
    rel.lastActivityDate = this.currentDate.toISOString();
    this._calculateStatus(rel);
    return rel;
  }

  // --- API Endpoint: PATCH /relationships/:id/status ---
  updateStatus(id, newStatus) {
    const validStatuses = ["Active", "Idle", "At-Risk", "Completed"];
    if (!validStatuses.includes(newStatus)) throw new Error("Invalid status");
    
    const rel = this.getRelationship(id);
    rel.status = newStatus;
    // If manually overriding to Completed, it stays completed.
    return rel;
  }

  // --- Core Status Engine Logic ---
  _calculateStatus(rel) {
    if (rel.status === "Completed") return; // Terminal state

    const msInDay = 24 * 60 * 60 * 1000;
    const daysSinceActivity = (this.currentDate.getTime() - new Date(rel.lastActivityDate).getTime()) / msInDay;

    let newStatus = "Active";

    // Rule 1: Check for missed milestones
    const hasMissedMilestones = rel.milestones.some(ms => {
      return ms.status !== "Completed" && (this.currentDate.getTime() > new Date(ms.targetDate).getTime());
    });

    if (hasMissedMilestones) {
      newStatus = "At-Risk";
    } 
    // Rule 2: Check for inactivity duration
    else if (daysSinceActivity > 21) {
      newStatus = "At-Risk"; // Extremely stale
    }
    else if (daysSinceActivity > 14) {
      newStatus = "Idle"; // No activity in 2-3 weeks
    }

    rel.status = newStatus;
  }

  // Helper for simulation: fast forward time
  simulateDaysPassing(days) {
    this.currentDate.setDate(this.currentDate.getDate() + days);
    // Recalculate all active statuses
    this.relationships.forEach(r => this._calculateStatus(r));
  }
}

// Export for usage (browser or node)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EcoLinkRelationshipManager;
} else {
  window.EcoLinkRelationshipManager = EcoLinkRelationshipManager;
}
