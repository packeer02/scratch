// ===== GAIN Platform App =====

// ---- Navigation ----
const pages = ['dashboard', 'mentors', 'startups', 'matching', 'relationships', 'cohorts'];

function navigate(pageId) {
  pages.forEach(p => {
    document.getElementById('page-' + p).classList.remove('active');
    const nav = document.getElementById('nav-' + p);
    if (nav) nav.classList.remove('active');
  });
  document.getElementById('page-' + pageId).classList.add('active');
  const activeNav = document.getElementById('nav-' + pageId);
  if (activeNav) activeNav.classList.add('active');
  window._currentPage = pageId;
}

// ---- Global State ----
const PENDING_REGISTRATIONS = [
  { id: "P001", name: "Aisha Rahman", bio: "Hi, I'm Aisha. I have 15 years of experience in agritech and supply chain logistics in Southeast Asia. I want to mentor early-stage startups.", type: "Mentor", extractedTags: ["agritech", "supply chain logistics", "Southeast Asia"] }
];

document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    navigate(item.dataset.page);
  });
});

document.querySelectorAll('[data-goto]').forEach(el => {
  el.addEventListener('click', () => navigate(el.dataset.goto));
});

// ---- Dashboard ----
function initDashboard() {
  // Relationship health list
  const container = document.getElementById('dashboard-rel-list');
  container.innerHTML = '';
  RELATIONSHIPS.forEach(rel => {
    const mentor = MENTORS.find(m => m.id === rel.mentorId);
    const startup = STARTUPS.find(s => s.id === rel.startupId);
    const warnClass = rel.healthScore < 80 ? 'warn' : '';
    const el = document.createElement('div');
    el.className = 'rel-health-item';
    el.innerHTML = `
      <div class="rel-avatars">
        <div class="rel-avatar" style="background:${mentor.avatarColor}">${mentor.avatar}</div>
        <div class="rel-avatar" style="background:${startup.avatarColor}">${startup.avatar}</div>
      </div>
      <div class="rel-health-info">
        <div class="rel-health-names">${startup.name} ↔ ${mentor.name.split(' ')[0]} ${mentor.name.split(' ').slice(-1)[0]}</div>
        <div class="rel-health-sub">${rel.programme} · Match ${rel.matchScore}%</div>
      </div>
      <div class="health-bar-wrap">
        <div class="health-score" style="color:${rel.healthScore>=85?'var(--green)':'var(--yellow)'}">${rel.healthScore}%</div>
        <div class="health-bar"><div class="health-fill ${warnClass}" style="width:${rel.healthScore}%"></div></div>
      </div>`;
    el.addEventListener('click', () => { navigate('relationships'); });
    container.appendChild(el);
  });

  // Cohort list
  const cohortContainer = document.getElementById('dashboard-cohort-list');
  cohortContainer.innerHTML = '';
  COHORTS.forEach(c => {
    const el = document.createElement('div');
    el.className = 'cohort-dash-item';
    const statusClass = c.status === 'Active' ? 'badge-green' : 'badge-gray';
    el.innerHTML = `
      <div>
        <div class="cohort-dash-name">${c.name}</div>
        <div class="cohort-dash-meta">${c.startups} startups · ${c.mentors} mentors · ${c.country}</div>
      </div>
      <span class="badge ${statusClass}" style="margin-left:auto">${c.status}</span>`;
    cohortContainer.appendChild(el);
  });

  renderPendingRegistrations();
}

function renderPendingRegistrations() {
  const card = document.getElementById('pending-registrations-card');
  const list = document.getElementById('pending-registrations-list');
  if (!can('approve_registration') || PENDING_REGISTRATIONS.length === 0) {
    if (card) card.style.display = 'none';
    return;
  }
  if (card) card.style.display = 'block';
  list.innerHTML = '';
  PENDING_REGISTRATIONS.forEach(p => {
    const el = document.createElement('div');
    el.className = 'rel-health-item';
    el.style.borderBottom = '1px solid var(--border)';
    el.innerHTML = `
      <div class="rel-health-info" style="padding:8px 0">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div>
            <div class="rel-health-names">${p.name} <span class="badge badge-purple" style="margin-left:6px">AI Categorized: ${p.type}</span></div>
            <div class="rel-health-sub" style="margin-top:6px;max-width:500px;line-height:1.4">"${p.bio}"</div>
            <div style="margin-top:8px;display:flex;gap:4px">
              ${p.extractedTags.map(t => `<span class="tag" style="background:rgba(255,255,255,0.05)">${t}</span>`).join('')}
            </div>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn-approve" onclick="approveRegistration('${p.id}')">✓ Approve</button>
            <button class="btn-reject" onclick="rejectRegistration('${p.id}')">✕ Reject</button>
          </div>
        </div>
      </div>`;
    list.appendChild(el);
  });
}

function approveRegistration(id) {
  const idx = PENDING_REGISTRATIONS.findIndex(p => p.id === id);
  if (idx > -1) {
    PENDING_REGISTRATIONS.splice(idx, 1);
    showToast('✅ Registration approved. Added to platform.');
    renderPendingRegistrations();
  }
}

function rejectRegistration(id) {
  const idx = PENDING_REGISTRATIONS.findIndex(p => p.id === id);
  if (idx > -1) {
    PENDING_REGISTRATIONS.splice(idx, 1);
    showToast('❌ Registration rejected.');
    renderPendingRegistrations();
  }
}

// ---- Mentors ----
function renderMentors(filter = '') {
  const grid = document.getElementById('mentor-grid');
  grid.innerHTML = '';
  const filtered = MENTORS.filter(m =>
    !filter || m.name.toLowerCase().includes(filter) ||
    m.expertise.some(e => e.toLowerCase().includes(filter))
  );
  filtered.forEach(m => {
    const card = document.createElement('div');
    card.className = 'entity-card';
    const topTags = m.expertise.slice(0, 3);
    card.innerHTML = `
      <div class="entity-card-top">
        <div class="entity-avatar" style="background:${m.avatarColor}">${m.avatar}</div>
        <div>
          <div class="entity-name">${m.name}</div>
          <div class="entity-title">${m.title} · ${m.company}</div>
        </div>
      </div>
      <div class="entity-tags">${topTags.map(t => `<span class="tag">${t}</span>`).join('')}${m.crossBorder ? '<span class="tag" style="color:var(--accent2);border-color:rgba(99,102,241,0.3)">🌏 Cross-border</span>' : ''}</div>
      <div class="entity-meta">
        <span class="entity-rating">★ ${m.rating} · ${m.totalMentorships} mentorships</span>
        <span class="entity-status">${m.status}</span>
      </div>
      <div style="margin-top:10px;font-size:12px;color:var(--text2);line-height:1.5">${m.bio.slice(0, 100)}…</div>`;
    grid.appendChild(card);
  });
}

document.getElementById('mentor-search').addEventListener('input', e => {
  renderMentors(e.target.value.toLowerCase());
});

// ---- Startups ----
function renderStartups(filter = '') {
  const grid = document.getElementById('startup-grid');
  grid.innerHTML = '';
  const filtered = STARTUPS.filter(s =>
    !filter || s.name.toLowerCase().includes(filter) ||
    s.industry.toLowerCase().includes(filter)
  );
  filtered.forEach(s => {
    const card = document.createElement('div');
    card.className = 'entity-card';
    const stageColors = { 'Pre-seed': 'var(--text2)', 'Seed': 'var(--yellow)', 'Series A': 'var(--green)' };
    card.innerHTML = `
      <div class="entity-card-top">
        <div class="entity-avatar" style="background:${s.avatarColor}">${s.avatar}</div>
        <div>
          <div class="entity-name">${s.name}</div>
          <div class="entity-title">${s.tagline}</div>
        </div>
      </div>
      <div class="entity-tags">
        <span class="tag" style="color:${stageColors[s.stage]||'var(--text2)'}">${s.stage}</span>
        <span class="tag">${s.industry}</span>
        <span class="tag">📍 ${s.country}</span>
      </div>
      <div style="font-size:12px;color:var(--text2);line-height:1.5;margin-bottom:10px">${s.description.slice(0,100)}…</div>
      <div class="entity-meta">
        <span style="font-size:12px;color:var(--text3)">${s.employees} employees · ${s.fundingTarget}</span>
        <span class="entity-status">${s.cohort}</span>
      </div>`;
    grid.appendChild(card);
  });
}

document.getElementById('startup-search').addEventListener('input', e => {
  renderStartups(e.target.value.toLowerCase());
});

// ---- AI Matching ----
let selectedStartup = null;
const approvedMatches = {};

function initMatching() {
  const list = document.getElementById('startup-selector');
  list.innerHTML = '';
  STARTUPS.forEach(s => {
    const el = document.createElement('div');
    el.className = 'startup-sel-item';
    el.dataset.id = s.id;
    el.innerHTML = `
      <div class="mini-avatar" style="background:${s.avatarColor}">${s.avatar}</div>
      <div class="startup-sel-info">
        <div class="sel-name">${s.name}</div>
        <div class="sel-stage">${s.stage} · ${s.country}</div>
      </div>`;
    el.addEventListener('click', () => selectStartupForMatch(s.id));
    list.appendChild(el);
  });
}

function selectStartupForMatch(id) {
  selectedStartup = STARTUPS.find(s => s.id === id);
  document.querySelectorAll('.startup-sel-item').forEach(el => {
    el.classList.toggle('selected', el.dataset.id === id);
  });
  document.getElementById('matching-placeholder').classList.add('hidden');
  document.getElementById('matching-results').classList.remove('hidden');
  renderMatchResults();
}

function renderMatchResults() {
  const container = document.getElementById('matching-results');
  container.innerHTML = `
    <div class="card" style="margin-bottom:16px">
      <div style="display:flex;align-items:center;gap:12px">
        <div class="entity-avatar" style="background:${selectedStartup.avatarColor};width:42px;height:42px;font-size:14px">${selectedStartup.avatar}</div>
        <div>
          <div style="font-size:15px;font-weight:700">${selectedStartup.name}</div>
          <div style="font-size:12.5px;color:var(--text2);margin-top:2px">Needs: ${selectedStartup.needs.join(', ')}</div>
        </div>
        <div style="margin-left:auto">
          <div style="font-size:11px;color:var(--text3);margin-bottom:4px">Scoring all ${MENTORS.length} mentors…</div>
          <div style="font-size:12px;font-weight:600;color:var(--accent2)">AI matching complete</div>
        </div>
      </div>
    </div>`;

  const scored = MENTORS.map(m => {
    const { score, breakdown } = computeMatchScore(m, selectedStartup);
    return { mentor: m, score, breakdown };
  }).sort((a, b) => b.score - a.score);

  scored.forEach(({ mentor, score, breakdown }) => {
    const key = `${mentor.id}_${selectedStartup.id}`;
    const isApproved = approvedMatches[key];
    const scoreClass = score >= 80 ? 'high' : score >= 55 ? 'med' : 'low';
    const cardClass = score >= 80 ? 'top' : score < 40 ? 'low' : '';

    const card = document.createElement('div');
    card.className = `match-card ${cardClass}`;
    card.innerHTML = `
      <div class="match-header">
        <div class="match-score-big ${scoreClass}">${score}%</div>
        <div class="entity-avatar" style="background:${mentor.avatarColor};width:42px;height:42px;font-size:14px;flex-shrink:0">${mentor.avatar}</div>
        <div>
          <div class="match-mentor-name">${mentor.name}</div>
          <div class="match-mentor-sub">${mentor.title} · ${mentor.company}</div>
          <div style="margin-top:5px;display:flex;gap:6px;flex-wrap:wrap">
            ${mentor.geography.map(g => `<span class="tag" style="font-size:10px">📍 ${g}</span>`).join('')}
            ${mentor.crossBorder ? `<span class="tag" style="font-size:10px;color:var(--accent2)">🌏 Cross-border</span>` : ''}
          </div>
        </div>
        ${score >= 80 ? `<span class="badge badge-green" style="margin-left:auto">Top Match</span>` : score < 40 ? `<span class="badge badge-red" style="margin-left:auto">Poor Fit</span>` : ''}
      </div>
      <div class="match-breakdown">
        ${breakdown.map(b => `
          <div class="breakdown-row">
            <div class="breakdown-label">${b.label}</div>
            <div class="breakdown-bar"><div class="breakdown-fill" style="width:${(b.value/b.max)*100}%"></div></div>
            <div class="breakdown-val">${b.value}/${b.max}</div>
          </div>`).join('')}
      </div>
      ${breakdown.filter(b => b.matched.length > 0).flatMap(b => b.matched).length > 0 ? `
      <div class="match-tags">
        ${breakdown.filter(b => b.matched.length > 0).flatMap(b => b.matched).map(m => `<span class="match-tag">✓ ${m}</span>`).join('')}
      </div>` : ''}
      <div class="match-actions" id="actions-${key}">
        ${isApproved
          ? `<div class="match-approved-banner">✓ Match Approved</div>`
          : score >= 40 
            ? (can('approve_match') 
                ? `<button class="btn-approve" onclick="approveMatch('${mentor.id}','${selectedStartup.id}')">✓ Approve Match</button><button class="btn-reject">✕ Skip</button>`
                : can('request_match')
                  ? `<button class="btn-approve" onclick="requestMatch('${mentor.id}','${selectedStartup.id}')">✋ Request Match</button>`
                  : ``)
            : `<span style="font-size:12px;color:var(--text3)">Not recommended for this startup</span>`}
      </div>`;
    container.appendChild(card);
  });
}

function approveMatch(mentorId, startupId) {
  const key = `${mentorId}_${startupId}`;
  approvedMatches[key] = true;
  const actionsDiv = document.getElementById('actions-' + key);
  if (actionsDiv) {
    actionsDiv.innerHTML = `<div class="match-approved-banner">✓ Match Approved — Relationship created</div>`;
  }
}

function requestMatch(mentorId, startupId) {
  const key = `${mentorId}_${startupId}`;
  const actionsDiv = document.getElementById('actions-' + key);
  if (actionsDiv) {
    actionsDiv.innerHTML = `<div class="match-approved-banner" style="color:var(--yellow);background:rgba(245,158,11,0.1);border-color:rgba(245,158,11,0.3)">⏳ Match Requested — Pending Programme Admin approval</div>`;
  }
}

document.getElementById('run-matching-btn').addEventListener('click', () => navigate('matching'));
document.getElementById('run-match-page-btn').addEventListener('click', () => {
  if (selectedStartup) renderMatchResults();
  else if (STARTUPS.length > 0) selectStartupForMatch(STARTUPS[0].id);
});

// ---- Relationships ----
function renderRelationships(filterProgramme = 'all') {
  const container = document.getElementById('relationships-list');
  container.innerHTML = '';

  // Role-restricted empty state
  if (!can('view_relationships')) {
    container.innerHTML = `<div class="rbac-locked"><div class="rbac-locked-icon">🔒</div><div class="rbac-locked-title">Access Restricted</div><div class="rbac-locked-sub">You don't have permission to view relationships.</div></div>`;
    return;
  }

  const visible = getVisibleRelationships();
  const filtered = visible.filter(r =>
    filterProgramme === 'all' || r.programme.includes(filterProgramme.replace('GAIN-', 'Cohort ').replace('GAIN-ID-', 'Indonesia Cohort ')) || r.id.includes(filterProgramme) || r.programme.includes(filterProgramme)
  );

  if (filtered.length === 0) {
    container.innerHTML = `<div class="rbac-locked"><div class="rbac-locked-icon">🔗</div><div class="rbac-locked-title">No relationships found</div><div class="rbac-locked-sub">You don't have any assigned relationships in this view.</div></div>`;
    return;
  }

  filtered.forEach(rel => {
    const mentor = MENTORS.find(m => m.id === rel.mentorId);
    const startup = STARTUPS.find(s => s.id === rel.startupId);
    const avgScore = rel.feedbackScores.length ? (rel.feedbackScores.reduce((a, b) => a + b, 0) / rel.feedbackScores.length).toFixed(1) : '—';

    const card = document.createElement('div');
    card.className = 'rel-card';
    card.innerHTML = `
      <div class="rel-card-top">
        <div class="rel-avatars" style="display:flex">
          <div class="rel-avatar" style="background:${mentor.avatarColor};width:38px;height:38px;font-size:13px">${mentor.avatar}</div>
          <div class="rel-avatar" style="background:${startup.avatarColor};width:38px;height:38px;font-size:13px;margin-left:-10px">${startup.avatar}</div>
        </div>
        <div>
          <div class="rel-parties">${startup.name} ↔ ${mentor.name}</div>
          <div class="rel-programme">${rel.programme}</div>
        </div>
        <span class="rel-id" style="margin-left:auto">#${rel.id}</span>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;margin-left:16px">
          <span class="badge badge-green">Active</span>
          <span style="font-size:12px;color:var(--yellow);font-weight:600">Match ${rel.matchScore}%</span>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
        <div style="font-size:12px;color:var(--text2)">📅 Started ${rel.startDate}</div>
        <div style="font-size:12px;color:var(--text2)">🤝 Last meeting ${rel.lastMeeting}</div>
        <div style="font-size:12px;color:var(--yellow)">★ Avg score ${avgScore}</div>
        <div style="font-size:12px;color:${rel.healthScore>=85?'var(--green)':'var(--yellow)'}">Health ${rel.healthScore}%</div>
      </div>
      <div class="rel-milestones">
        ${rel.milestones.map(ms => {
          const icon = ms.status === 'completed' ? '✓' : ms.status === 'upcoming' ? '●' : ' ';
          return `
          <div class="pipeline-node node-${ms.status}">
            <div class="node-circle">${icon}</div>
            <div class="node-title">${ms.label}</div>
            <div class="node-date">${ms.date}</div>
          </div>`;
        }).join('')}
      </div>
      ${rel.flags.length > 0 ? `<div style="display:flex;gap:8px">${rel.flags.map(f => `<span class="flag-chip">⚠️ ${f}</span>`).join('')}</div>` : ''}
      ${can('update_checkin') && canEditRelationship(rel) ? `<div style="margin-top:12px"><button class="btn-checkin" onclick="event.stopPropagation();openCheckinModal('${rel.id}')">📝 Submit Check-in</button></div>` : ''}`;
    card.addEventListener('click', () => openRelModal(rel));
    container.appendChild(card);
  });
}

function openRelModal(rel) {
  const mentor = MENTORS.find(m => m.id === rel.mentorId);
  const startup = STARTUPS.find(s => s.id === rel.startupId);
  const avgScore = rel.feedbackScores.length ? (rel.feedbackScores.reduce((a, b) => a + b, 0) / rel.feedbackScores.length).toFixed(1) : '—';

  const canCheckin = can('update_checkin') && canEditRelationship(rel);
  document.getElementById('rel-modal-content').innerHTML = `
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:24px">
      <div class="rel-avatars" style="display:flex">
        <div class="rel-avatar" style="background:${mentor.avatarColor};width:44px;height:44px;font-size:15px">${mentor.avatar}</div>
        <div class="rel-avatar" style="background:${startup.avatarColor};width:44px;height:44px;font-size:15px;margin-left:-12px">${startup.avatar}</div>
      </div>
      <div>
        <h2 style="font-family:'Outfit',sans-serif;font-size:20px;font-weight:800">${startup.name} ↔ ${mentor.name}</h2>
        <div style="color:var(--text2);font-size:13px;margin-top:3px">${rel.programme} · <span class="rel-id">#${rel.id}</span></div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px">
      <div style="background:var(--surface2);border-radius:10px;padding:14px;text-align:center">
        <div style="font-family:'Outfit',sans-serif;font-size:24px;font-weight:800;color:var(--green)">${rel.matchScore}%</div>
        <div style="font-size:11px;color:var(--text3);margin-top:3px">Match Score</div>
      </div>
      <div style="background:var(--surface2);border-radius:10px;padding:14px;text-align:center">
        <div style="font-family:'Outfit',sans-serif;font-size:24px;font-weight:800;color:var(--yellow)">${rel.healthScore}%</div>
        <div style="font-size:11px;color:var(--text3);margin-top:3px">Health Score</div>
      </div>
      <div style="background:var(--surface2);border-radius:10px;padding:14px;text-align:center">
        <div style="font-family:'Outfit',sans-serif;font-size:24px;font-weight:800;color:var(--yellow)">★ ${avgScore}</div>
        <div style="font-size:11px;color:var(--text3);margin-top:3px">Avg Feedback</div>
      </div>
      <div style="background:var(--surface2);border-radius:10px;padding:14px;text-align:center">
        <div style="font-family:'Outfit',sans-serif;font-size:24px;font-weight:800;color:var(--accent2)">${rel.meetingFrequency}</div>
        <div style="font-size:11px;color:var(--text3);margin-top:3px">Meeting Cadence</div>
      </div>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">Milestones</div>
      ${rel.milestones.map(ms => {
        const icon = ms.status === 'completed' ? '✅' : ms.status === 'upcoming' ? '⏳' : '🔒';
        return `
        <div class="milestone-detail">
          <div class="milestone-icon">${icon}</div>
          <div style="flex:1">
            <div class="milestone-label">${ms.label}</div>
            <div class="milestone-date">${ms.date}</div>
            ${ms.score ? `<div class="milestone-score">★ ${ms.score}/5</div>` : ''}
            ${ms.notes ? `<div class="milestone-notes">${ms.notes}</div>` : ''}
          </div>
        </div>`;
      }).join('')}
    </div>

    ${rel.flags.length > 0 ? `
    <div class="modal-section">
      <div class="modal-section-title">Flags</div>
      ${rel.flags.map(f => `<div class="flag-chip" style="display:inline-flex;margin-right:8px;margin-bottom:8px">⚠️ ${f}</div>`).join('')}
    </div>` : ''}

    <div class="modal-section">
      <div class="modal-section-title">Mentor — ${mentor.name}</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${mentor.expertise.map(e => `<span class="tag">${e}</span>`).join('')}
      </div>
      <div style="font-size:12.5px;color:var(--text2);margin-top:10px;line-height:1.6">${mentor.bio}</div>
    </div>

    ${canCheckin ? `
    <div class="modal-section">
      <div class="modal-section-title">Quick Check-in</div>
      <div style="background:var(--surface2);border-radius:10px;padding:16px">
        <textarea id="checkin-notes-${rel.id}" placeholder="What was discussed? Any blockers? Key decisions made..." style="width:100%;background:transparent;border:none;outline:none;color:var(--text);font-family:'Inter',sans-serif;font-size:13px;resize:vertical;min-height:80px"></textarea>
        <div style="display:flex;align-items:center;gap:10px;margin-top:10px">
          <select id="checkin-rating-${rel.id}" style="background:var(--surface);border:1px solid var(--border);color:var(--text);font-family:'Inter',sans-serif;font-size:12px;padding:5px 10px;border-radius:6px;outline:none">
            <option value="5">⭐⭐⭐⭐⭐ Excellent</option><option value="4">⭐⭐⭐⭐ Good</option><option value="3">⭐⭐⭐ Average</option>
          </select>
          <button class="btn-checkin" onclick="submitCheckin('${rel.id}')">Submit Check-in</button>
        </div>
      </div>
    </div>` : ''}

    <div class="modal-section">
      <div class="modal-section-title">Startup — ${startup.name}</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">
        ${startup.needs.map(n => `<span class="tag" style="color:var(--green);border-color:rgba(16,185,129,0.3)">${n}</span>`).join('')}
      </div>
      <div style="font-size:12.5px;color:var(--text2);line-height:1.6">${startup.description}</div>
    </div>`;

  document.getElementById('rel-modal-overlay').classList.remove('hidden');
}

document.getElementById('rel-modal-close').addEventListener('click', () => {
  document.getElementById('rel-modal-overlay').classList.add('hidden');
});
document.getElementById('rel-modal-overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('rel-modal-overlay'))
    document.getElementById('rel-modal-overlay').classList.add('hidden');
});

document.getElementById('rel-filter').addEventListener('change', e => {
  renderRelationships(e.target.value);
});

function openCheckinModal(relId) {
  const rel = RELATIONSHIPS.find(r => r.id === relId);
  if (rel) openRelModal(rel);
  // Scroll to the check-in section after modal opens
  setTimeout(() => {
    const ta = document.getElementById('checkin-notes-' + relId);
    if (ta) ta.focus();
  }, 100);
}

function submitCheckin(relId) {
  const ta = document.getElementById('checkin-notes-' + relId);
  const select = document.getElementById('checkin-rating-' + relId);
  const notes = ta ? ta.value.trim() : '';
  const score = select ? parseFloat(select.value) : 5.0;

  if (!notes) { ta.style.border = '1px solid var(--red)'; ta.placeholder = 'Please enter notes before submitting.'; return; }
  
  // Persist to in-memory database
  const rel = RELATIONSHIPS.find(r => r.id === relId);
  if (rel) {
    rel.milestones.push({
      id: Date.now(),
      label: "Recent Check-in",
      status: "completed",
      date: new Date().toISOString().split('T')[0],
      score: score,
      notes: notes
    });
    rel.feedbackScores.push(score);
    rel.lastMeeting = new Date().toISOString().split('T')[0];
    // Re-render relationships list to update avg scores & dates
    const filterVal = document.getElementById('rel-filter') ? document.getElementById('rel-filter').value : 'all';
    renderRelationships(filterVal);
  }

  document.getElementById('rel-modal-overlay').classList.add('hidden');
  showToast('✅ Check-in submitted successfully!');
}

function showToast(msg) {
  const t = document.createElement('div');
  t.style.cssText = 'position:fixed;bottom:28px;right:28px;background:var(--surface2);border:1px solid rgba(16,185,129,0.4);color:var(--green);padding:12px 20px;border-radius:10px;font-size:13.5px;font-weight:600;z-index:999;box-shadow:0 8px 24px rgba(0,0,0,0.4);animation:fadeUp 0.3s ease';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// ---- Cohorts ----
function renderCohorts() {
  const container = document.getElementById('cohorts-list');
  container.innerHTML = '';
  COHORTS.forEach(c => {
    const statusBadge = c.status === 'Active' ? 'badge-green' : 'badge-gray';
    const card = document.createElement('div');
    card.className = 'cohort-card';
    card.innerHTML = `
      <div>
        <div class="cohort-name">${c.name}</div>
        <div class="cohort-meta">📍 ${c.country} · ${c.startDate} → ${c.endDate}</div>
        ${c.status === 'Active' ? '<div style="font-size:12px;color:var(--green);margin-top:4px">● Live now</div>' : `<div style="font-size:12px;color:var(--text3);margin-top:4px">${c.graduated} of ${c.startups} startups graduated</div>`}
      </div>
      <span class="badge ${statusBadge}" style="margin-left:20px">${c.status}</span>
      <div class="cohort-stats">
        <div class="cstat"><div class="cstat-val" style="color:var(--accent2)">${c.startups}</div><div class="cstat-label">Startups</div></div>
        <div class="cstat"><div class="cstat-val" style="color:var(--green)">${c.mentors}</div><div class="cstat-label">Mentors</div></div>
        <div class="cstat"><div class="cstat-val" style="color:var(--yellow)">${c.graduated}</div><div class="cstat-label">Graduated</div></div>
      </div>`;
    container.appendChild(card);
  });
}

// ---- RBAC Role Switcher Init ----
function initRBAC() {
  const dropdown = document.getElementById('role-dropdown');
  const trigger = document.getElementById('role-switcher-trigger');

  // Build dropdown items
  dropdown.innerHTML = '';
  const roleBadgeStyles = {
    platform_admin:  'background:rgba(139,92,246,0.2);color:#C4B5FD',
    programme_admin: 'background:rgba(16,185,129,0.15);color:#34D399',
    mentor:          'background:rgba(245,158,11,0.15);color:#FCD34D',
    company_user:    'background:rgba(59,130,246,0.15);color:#93C5FD',
  };
  USERS.forEach(u => {
    const el = document.createElement('div');
    el.className = 'role-option' + (u.id === currentUser.id ? ' active' : '');
    el.innerHTML = `
      <div class="role-option-avatar" style="background:${u.color}">${u.initials}</div>
      <div>
        <div class="role-option-name">${u.name}</div>
        <div class="role-option-role">${u.description}</div>
      </div>
      <span class="role-option-badge" style="${roleBadgeStyles[u.role]}">${u.roleLabel}</span>`;
    el.addEventListener('click', () => {
      setCurrentUser(u.id);
      dropdown.classList.add('hidden');
      trigger.classList.remove('open');
      // Re-render dropdown to update active state
      initRBAC();
    });
    dropdown.appendChild(el);
  });

  // Toggle dropdown
  trigger.onclick = (e) => {
    e.stopPropagation();
    const isOpen = !dropdown.classList.contains('hidden');
    dropdown.classList.toggle('hidden', isOpen);
    trigger.classList.toggle('open', !isOpen);
  };
  document.addEventListener('click', () => {
    dropdown.classList.add('hidden');
    trigger.classList.remove('open');
  });

  // Render permission chips in banner
  const perms = PERMISSIONS[currentUser.role] || [];
  const friendly = {
    view_dashboard: 'Dashboard', view_mentors: 'Mentors', view_startups: 'Startups',
    view_matching: 'AI Matching', view_relationships: 'Relationships', view_cohorts: 'Cohorts',
    run_matching: 'Run Matching', approve_match: 'Approve Match', update_checkin: 'Check-ins',
    create_mentor: 'Add Mentor', create_startup: 'Add Startup', manage_users: 'Manage Users',
    delete_entity: 'Delete', view_insights: 'Insights',
  };
  const chips = perms.filter(p => friendly[p]).map(p =>
    `<span class="perm-chip">${friendly[p]}</span>`
  ).join('');
  document.getElementById('role-banner-permissions').innerHTML = chips;
}

// ---- Self-Registration ----
document.getElementById('open-register-btn').addEventListener('click', () => {
  document.getElementById('register-modal-overlay').classList.remove('hidden');
  document.getElementById('register-name').value = '';
  document.getElementById('register-bio').value = '';
  document.getElementById('register-tags').value = '';
  document.getElementById('register-type').value = 'Mentor';
});

document.getElementById('register-modal-close').addEventListener('click', () => {
  document.getElementById('register-modal-overlay').classList.add('hidden');
});

document.getElementById('submit-register-btn').addEventListener('click', () => {
  const name = document.getElementById('register-name').value.trim();
  const type = document.getElementById('register-type').value;
  const bio = document.getElementById('register-bio').value.trim();
  const tagsStr = document.getElementById('register-tags').value.trim();
  
  if (!name || !bio) return;
  
  const extracted = tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(t => t) : [];

  PENDING_REGISTRATIONS.unshift({
    id: 'P' + Math.floor(Math.random()*10000),
    name: name,
    bio: bio,
    type: type,
    extractedTags: extracted.length ? extracted : ['New Member']
  });

  document.getElementById('register-modal-overlay').classList.add('hidden');
  showToast(`✅ Profile submitted! You registered as a ${type}. Pending Programme Admin approval.`);
  
  // Update dashboard if visible
  renderPendingRegistrations();
});

// ---- Cohort Creation ----
const openCohortBtn = document.getElementById('open-new-cohort-btn');
if (openCohortBtn) {
  openCohortBtn.addEventListener('click', () => {
    document.getElementById('cohort-modal-overlay').classList.remove('hidden');
    document.getElementById('cohort-name').value = '';
    document.getElementById('cohort-country').value = '';
    document.getElementById('cohort-start').value = '';
    document.getElementById('cohort-end').value = '';
  });
}

document.getElementById('cohort-modal-close').addEventListener('click', () => {
  document.getElementById('cohort-modal-overlay').classList.add('hidden');
});

document.getElementById('submit-cohort-btn').addEventListener('click', () => {
  const name = document.getElementById('cohort-name').value.trim();
  const country = document.getElementById('cohort-country').value.trim();
  const start = document.getElementById('cohort-start').value;
  const end = document.getElementById('cohort-end').value;

  if (!name || !start || !end) return;

  const newCohortId = "GAIN-" + Math.floor(Math.random() * 1000);
  
  COHORTS.unshift({
    id: newCohortId,
    name: name,
    country: country || "Unknown",
    status: "Active",
    startDate: start,
    endDate: end,
    startups: 0,
    mentors: 0,
    graduated: 0
  });

  // Add it to the filter dropdown dynamically
  const filter = document.getElementById('rel-filter');
  if (filter) {
    const opt = document.createElement('option');
    opt.value = newCohortId;
    opt.textContent = name;
    filter.appendChild(opt);
  }

  document.getElementById('cohort-modal-overlay').classList.add('hidden');
  showToast(`✅ Programme '${name}' created successfully!`);
  
  renderCohorts();
  initDashboard(); // Update dashboard cohort list too
});

// ---- Mobile Menu Toggle ----
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileCloseBtn = document.getElementById('mobile-close-btn');
const sidebar = document.getElementById('sidebar');

if (mobileMenuBtn && sidebar) {
  mobileMenuBtn.addEventListener('click', () => {
    sidebar.classList.add('open');
  });
}
if (mobileCloseBtn && sidebar) {
  mobileCloseBtn.addEventListener('click', () => {
    sidebar.classList.remove('open');
  });
}

// Close sidebar on mobile when a nav item is clicked
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('open');
    }
  });
});

// ---- INIT ----
initDashboard();
renderMentors();
renderStartups();
initMatching();
renderRelationships();
renderCohorts();
initRBAC();
applyRBAC();
