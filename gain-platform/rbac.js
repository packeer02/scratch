// ===== GAIN Platform — RBAC Module =====

// ---- Simulated Users (personas) ----
const USERS = [
  {
    id: "U001",
    name: "Cradle HQ",
    initials: "CH",
    color: "#6366F1",
    role: "platform_admin",
    roleLabel: "Platform Admin (IT)",
    description: "IT Services Manager. No functional approval rights.",
  },
  {
    id: "U002",
    name: "Amirah Yusof",
    initials: "AM",
    color: "#059669",
    role: "programme_admin",
    roleLabel: "Programme Admin",
    programmeId: "GAIN-7",
    description: "Manages GAIN Cohort 7 (Malaysia)",
  },
  {
    id: "U003",
    name: "Dr. Priya Nair",
    initials: "PN",
    color: "#059669",
    role: "mentor",
    roleLabel: "Mentor",
    entityId: "M002",
    description: "Sustainability & ESG Strategist",
  },
  {
    id: "U004",
    name: "Lim Wei Jian",
    initials: "LW",
    color: "#D97706",
    role: "company_user",
    roleLabel: "Company User",
    entityId: "S001",
    companyName: "GreenPack",
    description: "Co-founder, GreenPack",
  },
  {
    id: "U005",
    name: "Budi Santoso",
    initials: "BS",
    color: "#0891B2",
    role: "programme_admin",
    roleLabel: "Programme Admin",
    programmeId: "GAIN-ID-2",
    description: "Manages GAIN Indonesia Cohort 2",
  },
];

// ---- Permissions Map ----
const PERMISSIONS = {
  platform_admin: [
    "view_dashboard", "manage_users", "view_cohorts"
  ],
  programme_admin: [
    "view_dashboard", "view_mentors", "view_startups",
    "view_matching", "view_relationships", "view_cohorts",
    "run_matching", "approve_match", "reject_match",
    "update_checkin", "view_insights", "view_all_relationships",
    "approve_registration"
  ],
  mentor: [
    "view_relationships", "update_checkin", "view_own_profile",
    "view_matching", "request_match"
  ],
  company_user: [
    "view_relationships", "view_own_profile",
    "view_matching", "request_match"
  ],
};

// ---- NAV visibility per role ----
const NAV_VISIBILITY = {
  platform_admin:  ["dashboard", "cohorts"],
  programme_admin: ["dashboard", "mentors", "startups", "matching", "relationships", "cohorts"],
  mentor:          ["relationships", "matching"],
  company_user:    ["relationships", "matching"],
};

// ---- State ----
let currentUser = USERS[1]; // default: Amirah (Programme Admin)

function setCurrentUser(userId) {
  currentUser = USERS.find(u => u.id === userId) || USERS[1];
  applyRBAC();
}

function can(permission) {
  return PERMISSIONS[currentUser.role]?.includes(permission) ?? false;
}

function canSeeNav(page) {
  return NAV_VISIBILITY[currentUser.role]?.includes(page) ?? false;
}

// ---- Apply RBAC to the DOM ----
function applyRBAC() {
  const role = currentUser.role;

  // Update sidebar user chip
  document.getElementById('rbac-user-name').textContent = currentUser.name;
  document.getElementById('rbac-user-role').textContent = currentUser.roleLabel;
  document.getElementById('rbac-user-initials').textContent = currentUser.initials;
  document.getElementById('rbac-user-initials').style.background = currentUser.color;

  // Show/hide role banner
  const banner = document.getElementById('role-banner');
  banner.className = `role-banner role-banner-${role}`;
  document.getElementById('role-banner-role').textContent = currentUser.roleLabel;
  document.getElementById('role-banner-name').textContent = currentUser.name;
  document.getElementById('role-banner-desc').textContent = currentUser.description;

  // Nav visibility
  const allPages = ["dashboard", "mentors", "startups", "matching", "relationships", "cohorts"];
  allPages.forEach(page => {
    const navEl = document.getElementById('nav-' + page);
    if (navEl) navEl.style.display = canSeeNav(page) ? '' : 'none';
  });

  // Hide section labels if no items visible under them
  const programmeItems = ["mentors", "startups", "matching", "relationships"];
  const intelligenceItems = ["cohorts"];
  const programmeLabelVisible = programmeItems.some(p => canSeeNav(p));
  const intelligenceLabelVisible = intelligenceItems.some(p => canSeeNav(p));
  document.getElementById('nav-label-programme').style.display = programmeLabelVisible ? '' : 'none';
  document.getElementById('nav-label-intelligence').style.display = intelligenceLabelVisible ? '' : 'none';
  document.getElementById('nav-label-overview').style.display = canSeeNav('dashboard') ? '' : 'none';

  // Show/hide action buttons
  document.querySelectorAll('[data-permission]').forEach(el => {
    const perm = el.dataset.permission;
    el.style.display = can(perm) ? '' : 'none';
  });

  // Navigate to first allowed page
  const firstAllowed = NAV_VISIBILITY[role][0] || 'relationships';
  navigate(firstAllowed);

  // Re-render data with RBAC filters applied
  renderRelationships('all');
  if (typeof initDashboard === 'function' && can('view_dashboard')) initDashboard();
}

// ---- Data filters ----
function getVisibleRelationships() {
  if (can('view_all_relationships')) return RELATIONSHIPS;
  if (currentUser.role === 'mentor') {
    return RELATIONSHIPS.filter(r => r.mentorId === currentUser.entityId);
  }
  if (currentUser.role === 'company_user') {
    return RELATIONSHIPS.filter(r => r.startupId === currentUser.entityId);
  }
  return RELATIONSHIPS;
}

function canEditRelationship(rel) {
  if (can('approve_match')) return true; // Programme Admin
  if (currentUser.role === 'mentor' && rel.mentorId === currentUser.entityId) return true;
  return false;
}
