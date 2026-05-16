// ============================================================
//  GAIN Platform — Seed Data
// ============================================================

const MENTORS = [
  {
    id: "M001",
    type: "Mentor",
    name: "Dato' Rajan Krishnamurthy",
    avatar: "DR",
    avatarColor: "#7C3AED",
    title: "Serial Entrepreneur & VC Partner",
    company: "Axiata Ventures",
    expertise: ["fintech", "payments", "Series B exits", "venture capital", "digital banking"],
    languages: ["English", "Tamil", "Malay"],
    availability: 2,
    geography: ["Malaysia", "Singapore"],
    crossBorder: true,
    rating: 4.7,
    totalMentorships: 8,
    cohorts: ["GAIN-3", "GAIN-4", "GAIN-5", "GAIN-6"],
    pastRelationships: [
      { startup: "PayEasy", cohort: "GAIN-5", outcome: "graduated", rating: 4.8 },
      { startup: "LoanBase", cohort: "GAIN-6", outcome: "graduated", rating: 4.6 },
    ],
    status: "Available",
    bio: "20+ years in financial services across SEA. Led 3 successful fintech exits. Passionate about scaling payment infrastructure in emerging markets.",
  },
  {
    id: "M002",
    type: "Mentor",
    name: "Dr. Priya Nair",
    avatar: "PN",
    avatarColor: "#059669",
    title: "Sustainability & ESG Strategist",
    company: "Ex-Unilever APAC",
    expertise: ["ESG compliance", "green tech", "sustainability", "retail distribution", "FMCG", "supply chain"],
    languages: ["English", "Tamil"],
    availability: 2,
    geography: ["Malaysia", "Indonesia", "Thailand"],
    crossBorder: true,
    rating: 4.9,
    totalMentorships: 6,
    cohorts: ["GAIN-5", "GAIN-6"],
    pastRelationships: [
      { startup: "EcoBrew", cohort: "GAIN-5", outcome: "graduated", rating: 5.0 },
      { startup: "RePackIt", cohort: "GAIN-6", outcome: "active", rating: 4.8 },
    ],
    status: "Available",
    bio: "Former Head of Sustainability at Unilever APAC. Has guided 6 green startups to market. Deep networks in retail chains and ESG certification bodies across SEA.",
  },
  {
    id: "M003",
    type: "Mentor",
    name: "Ahmad Fadzillah",
    avatar: "AF",
    avatarColor: "#D97706",
    title: "Manufacturing & Ops Expert",
    company: "Petronas Industrial",
    expertise: ["manufacturing scale-up", "operations", "supply chain", "industrial automation", "cost optimization"],
    languages: ["Malay", "English"],
    availability: 3,
    geography: ["Malaysia"],
    crossBorder: false,
    rating: 4.8,
    totalMentorships: 10,
    cohorts: ["GAIN-2", "GAIN-3", "GAIN-4", "GAIN-5", "GAIN-6"],
    pastRelationships: [
      { startup: "MakerHub", cohort: "GAIN-4", outcome: "graduated", rating: 4.9 },
      { startup: "FabTech", cohort: "GAIN-5", outcome: "graduated", rating: 4.7 },
    ],
    status: "Available",
    bio: "30 years in industrial manufacturing. Built 3 plants from ground up. Specialises in scaling hardware startups past the 'death valley' of production.",
  },
  {
    id: "M004",
    type: "Mentor",
    name: "Sarah Tan",
    avatar: "ST",
    avatarColor: "#DB2777",
    title: "Growth & Digital Marketing Lead",
    company: "Shopee SEA",
    expertise: ["growth hacking", "e-commerce", "digital marketing", "user acquisition", "marketplace strategy"],
    languages: ["English", "Mandarin", "Malay"],
    availability: 2,
    geography: ["Malaysia", "Indonesia", "Thailand"],
    crossBorder: true,
    rating: 4.6,
    totalMentorships: 5,
    cohorts: ["GAIN-6"],
    pastRelationships: [
      { startup: "StyleSnap", cohort: "GAIN-6", outcome: "active", rating: 4.6 },
    ],
    status: "Available",
    bio: "Head of Seller Growth at Shopee. Grew 3 marketplace verticals from 0 to $50M GMV. Expert in Southeast Asian consumer behaviour.",
  },
  {
    id: "M005",
    type: "Mentor",
    name: "Budi Santoso",
    avatar: "BS",
    avatarColor: "#0891B2",
    title: "Logistics & Last-Mile Expert",
    company: "JNE Express",
    expertise: ["logistics", "last-mile delivery", "e-commerce logistics", "warehouse automation", "Indonesia market"],
    languages: ["Bahasa Indonesia", "English"],
    availability: 2,
    geography: ["Indonesia"],
    crossBorder: false,
    rating: 4.5,
    totalMentorships: 3,
    cohorts: ["GAIN-ID-1"],
    pastRelationships: [
      { startup: "KirimCepat", cohort: "GAIN-ID-1", outcome: "graduated", rating: 4.5 },
    ],
    status: "Available",
    bio: "20 years in Indonesian logistics. Built last-mile network across Java. Deep knowledge of regulatory landscape and local market dynamics.",
  },
  {
    id: "M006",
    type: "Mentor",
    name: "Lek Wiroj",
    avatar: "LW",
    avatarColor: "#7C3AED",
    title: "HealthTech & MedDevice Specialist",
    company: "Bangkok Hospital Group",
    expertise: ["healthtech", "medical devices", "regulatory affairs", "hospital procurement", "Thailand market"],
    languages: ["Thai", "English"],
    availability: 1,
    geography: ["Thailand"],
    crossBorder: false,
    rating: 4.4,
    totalMentorships: 2,
    cohorts: ["GAIN-TH-1"],
    pastRelationships: [],
    status: "Available",
    bio: "Chief Innovation Officer at Bangkok Hospital Group. Expert in navigating TFDA regulations and hospital procurement processes.",
  },
];

const STARTUPS = [
  {
    id: "S001",
    type: "Company",
    name: "GreenPack",
    avatar: "GP",
    avatarColor: "#059669",
    tagline: "Sustainable Packaging for Southeast Asia",
    industry: "sustainability / green tech",
    stage: "Pre-seed",
    country: "Malaysia",
    founders: ["Lim Wei Jian", "Nurul Ain"],
    needs: ["manufacturing scale-up", "ESG compliance", "retail distribution"],
    cohort: "GAIN-7",
    status: "Active",
    fundingTarget: "RM 2M",
    employees: 8,
    description: "Developing compostable packaging alternatives from agricultural waste (rice husks, palm fibre). Currently in MVP stage with 2 retail pilot customers.",
  },
  {
    id: "S002",
    type: "Company",
    name: "HealthBridge",
    avatar: "HB",
    avatarColor: "#0891B2",
    tagline: "Telemedicine for Rural Malaysia",
    industry: "healthtech",
    stage: "Seed",
    country: "Malaysia",
    founders: ["Dr. Azri Hamdan"],
    needs: ["hospital procurement", "regulatory affairs", "Series A prep"],
    cohort: "GAIN-7",
    status: "Active",
    fundingTarget: "RM 5M",
    employees: 15,
    description: "Connecting rural communities with specialist doctors via AI-assisted video consultations. 3,000 monthly active patients in Sabah and Sarawak.",
  },
  {
    id: "S003",
    type: "Company",
    name: "FlowPay",
    avatar: "FP",
    avatarColor: "#7C3AED",
    tagline: "Cross-border B2B Payments for SMEs",
    industry: "fintech",
    stage: "Series A",
    country: "Malaysia",
    founders: ["Kevin Chong", "Amira Yusof"],
    needs: ["venture capital", "Series B exits", "payments"],
    cohort: "GAIN-7",
    status: "Active",
    fundingTarget: "RM 20M",
    employees: 40,
    description: "Enabling Malaysian SMEs to pay suppliers in Thailand and Indonesia without currency friction. $2M monthly transaction volume growing 30% MoM.",
  },
  {
    id: "S004",
    type: "Company",
    name: "KampungMart",
    avatar: "KM",
    avatarColor: "#D97706",
    tagline: "Social Commerce for Village Entrepreneurs",
    industry: "e-commerce",
    stage: "Pre-seed",
    country: "Malaysia",
    founders: ["Siti Norzahra"],
    needs: ["e-commerce", "growth hacking", "user acquisition"],
    cohort: "GAIN-7",
    status: "Active",
    fundingTarget: "RM 1.5M",
    employees: 5,
    description: "Enabling rural women entrepreneurs to sell via WhatsApp-native checkout. 800 active sellers in Kelantan and Terengganu.",
  },
  {
    id: "S005",
    type: "Company",
    name: "TokoKilat",
    avatar: "TK",
    avatarColor: "#DB2777",
    tagline: "10-minute Grocery Delivery, Indonesia",
    industry: "logistics / e-commerce",
    stage: "Seed",
    country: "Indonesia",
    founders: ["Rina Hartanto", "Doni Prabowo"],
    needs: ["logistics", "last-mile delivery", "warehouse automation"],
    cohort: "GAIN-ID-2",
    status: "Active",
    fundingTarget: "IDR 15B",
    employees: 32,
    description: "Quick-commerce platform serving Surabaya and Malang. 45 dark stores, 15-minute average delivery time. Growing into Bandung Q2 2026.",
  },
];

const RELATIONSHIPS = [
  {
    id: "R-2026-0847",
    mentorId: "M002",
    startupId: "S001",
    programme: "GAIN Cohort 7",
    status: "Active",
    matchScore: 91,
    startDate: "2026-01-15",
    milestones: [
      { id: 1, label: "Month 1 Check-in", status: "completed", date: "2026-02-15", score: 4.8, notes: "Excellent alignment on ESG roadmap. Dr. Priya connected GreenPack to 2 potential retail buyers." },
      { id: 2, label: "Month 3 Review", status: "upcoming", date: "2026-04-15", score: null, notes: "" },
      { id: 3, label: "Mid-cohort Pitch", status: "locked", date: "2026-07-01", score: null, notes: "" },
      { id: 4, label: "Graduation", status: "locked", date: "2026-07-15", score: null, notes: "" },
    ],
    meetingFrequency: "Weekly",
    lastMeeting: "2026-05-10",
    healthScore: 92,
    flags: [],
    feedbackScores: [4.8, 4.9],
  },
  {
    id: "R-2026-0848",
    mentorId: "M003",
    startupId: "S001",
    programme: "GAIN Cohort 7",
    status: "Active",
    matchScore: 84,
    startDate: "2026-01-15",
    milestones: [
      { id: 1, label: "Month 1 Check-in", status: "completed", date: "2026-02-15", score: 4.5, notes: "Good progress on manufacturing process review. Identified 3 bottlenecks in production line." },
      { id: 2, label: "Month 3 Review", status: "upcoming", date: "2026-04-15", score: null, notes: "" },
      { id: 3, label: "Mid-cohort Pitch", status: "locked", date: "2026-07-01", score: null, notes: "" },
      { id: 4, label: "Graduation", status: "locked", date: "2026-07-15", score: null, notes: "" },
    ],
    meetingFrequency: "Bi-weekly",
    lastMeeting: "2026-05-08",
    healthScore: 78,
    flags: ["Meeting frequency dropped last 2 weeks"],
    feedbackScores: [4.5],
  },
  {
    id: "R-2026-0851",
    mentorId: "M001",
    startupId: "S003",
    programme: "GAIN Cohort 7",
    status: "Active",
    matchScore: 96,
    startDate: "2026-01-15",
    milestones: [
      { id: 1, label: "Month 1 Check-in", status: "completed", date: "2026-02-15", score: 5.0, notes: "Outstanding. Dato' Rajan made an intro to 2 Series A investors. Term sheet discussions beginning." },
      { id: 2, label: "Month 3 Review", status: "completed", date: "2026-04-15", score: 4.9, notes: "On track for Series A close by Q3. Revenue grew 40% since cohort start." },
      { id: 3, label: "Mid-cohort Pitch", status: "upcoming", date: "2026-07-01", score: null, notes: "" },
      { id: 4, label: "Graduation", status: "locked", date: "2026-07-15", score: null, notes: "" },
    ],
    meetingFrequency: "Weekly",
    lastMeeting: "2026-05-14",
    healthScore: 98,
    flags: [],
    feedbackScores: [5.0, 4.9],
  },
  {
    id: "R-2026-0852",
    mentorId: "M004",
    startupId: "S004",
    programme: "GAIN Cohort 7",
    status: "Active",
    matchScore: 88,
    startDate: "2026-01-15",
    milestones: [
      { id: 1, label: "Month 1 Check-in", status: "completed", date: "2026-02-15", score: 4.3, notes: "Good start. Sarah shared e-commerce playbook, seller onboarding improved 30%." },
      { id: 2, label: "Month 3 Review", status: "upcoming", date: "2026-04-15", score: null, notes: "" },
      { id: 3, label: "Mid-cohort Pitch", status: "locked", date: "2026-07-01", score: null, notes: "" },
      { id: 4, label: "Graduation", status: "locked", date: "2026-07-15", score: null, notes: "" },
    ],
    meetingFrequency: "Weekly",
    lastMeeting: "2026-05-13",
    healthScore: 85,
    flags: [],
    feedbackScores: [4.3],
  },
  {
    id: "R-2026-0855",
    mentorId: "M005",
    startupId: "S005",
    programme: "GAIN Cohort Indonesia 2",
    status: "Active",
    matchScore: 94,
    startDate: "2026-02-01",
    milestones: [
      { id: 1, label: "Month 1 Check-in", status: "completed", date: "2026-03-01", score: 4.7, notes: "Budi's network opened 3 new dark store locations." },
      { id: 2, label: "Month 3 Review", status: "upcoming", date: "2026-05-01", score: null, notes: "" },
      { id: 3, label: "Graduation", status: "locked", date: "2026-08-01", score: null, notes: "" },
    ],
    meetingFrequency: "Weekly",
    lastMeeting: "2026-05-12",
    healthScore: 90,
    flags: [],
    feedbackScores: [4.7],
  },
];

const COHORTS = [
  { id: "GAIN-7", name: "GAIN Cohort 7", country: "Malaysia", status: "Active", startDate: "2026-01-15", endDate: "2026-07-15", startups: 4, mentors: 4, graduated: 0 },
  { id: "GAIN-ID-2", name: "GAIN Indonesia Cohort 2", country: "Indonesia", status: "Active", startDate: "2026-02-01", endDate: "2026-08-01", startups: 1, mentors: 1, graduated: 0 },
  { id: "GAIN-6", name: "GAIN Cohort 6", country: "Malaysia", status: "Completed", startDate: "2025-07-01", endDate: "2026-01-01", startups: 8, mentors: 6, graduated: 6 },
  { id: "GAIN-5", name: "GAIN Cohort 5", country: "Malaysia", status: "Completed", startDate: "2025-01-01", endDate: "2025-07-01", startups: 10, mentors: 8, graduated: 8 },
];

// ---- Matching Engine ----
function computeMatchScore(mentor, startup) {
  let score = 0;
  let breakdown = [];

  // Expertise overlap
  const expertiseMatches = startup.needs.filter(need =>
    mentor.expertise.some(exp => exp.toLowerCase().includes(need.toLowerCase()) || need.toLowerCase().includes(exp.toLowerCase()))
  );
  const expertiseScore = Math.round((expertiseMatches.length / startup.needs.length) * 50);
  score += expertiseScore;
  breakdown.push({ label: "Expertise Match", value: expertiseScore, max: 50, matched: expertiseMatches });

  // Geography
  const geoMatch = mentor.geography.includes(startup.country) || mentor.crossBorder;
  const geoScore = geoMatch ? 20 : 0;
  score += geoScore;
  breakdown.push({ label: "Geography / Availability", value: geoScore, max: 20, matched: geoMatch ? [startup.country] : [] });

  // Track record / rating
  const ratingScore = Math.round(((mentor.rating - 4) / 1) * 15);
  score += ratingScore;
  breakdown.push({ label: "Track Record", value: ratingScore, max: 15, matched: [`${mentor.rating}/5 avg rating`] });

  // Availability
  const availScore = mentor.availability > 0 ? 10 : 0;
  score += availScore;
  breakdown.push({ label: "Availability", value: availScore, max: 10, matched: mentor.availability > 0 ? [`${mentor.availability} slots open`] : [] });

  // Cap at 97
  score = Math.min(score, 97);

  return { score, breakdown };
}
