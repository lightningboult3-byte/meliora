/* ============================================================
   U&I MEL Hub — content data layer (STATIC scaffolding)
   ------------------------------------------------------------
   This is the stable source of truth the site renders from:
   levels, domains, badges, gateway, fieldTrends, and meta.
   The weekly "Brief" is NOT here — it lives in data/brief.js,
   which is loaded AFTER this file and overrides window.HUB.brief
   (and the brief stamp in meta). CI regenerates ONLY brief.js.
   It is plain JS that assigns window.HUB so the site works
   when opened locally (file://) AND when hosted on Pages.
   Skills spine: 2018 AEA Evaluator Competencies (5 domains)
   + an added "Data & Technology" domain for modern MEL.
   ============================================================ */
window.HUB = {
  meta: {
    site: "Meliora",
    tagline: "Ever better — a field guide for the MEL team.",
    briefIssue: 26,
    briefDate: "June 26, 2026",
    updated: "2026-06-26"
  },

  /* Career ladder — rename to match your team */
  levels: [
    { id: "officer",    name: "Officer",    years: "0–2 yrs" },
    { id: "specialist", name: "Specialist", years: "3–6 yrs" },
    { id: "manager",    name: "Manager",    years: "7–12 yrs" },
    { id: "lead",       name: "Lead",       years: "12+ yrs" }
  ],

  /* The Mirror: competency domains x levels */
  domains: [
    {
      id: "methodology", name: "Methodology", glyph: "▣", color: "#1f7367", spine: "AEA 2018",
      blurb: "Designing and running sound inquiry — quant, qual and mixed; sampling; causal logic.",
      cells: {
        officer: "Collects clean data; applies a given design.",
        specialist: "Picks fit-for-purpose designs; samples & analyses soundly.",
        manager: "Designs evaluations end-to-end; defends causal claims.",
        lead: "Sets standards; reviews rigour; innovates methods."
      },
      learn: [
        { label: "J-PAL/MITx DEDP MicroMasters", href: "https://micromasters.mit.edu/dedp/" },
        { label: "CLEAR/J-PAL — survey design (2026)", href: "https://www.povertyactionlab.org/event/clearj-pal-south-asia-make-measurement-matter-designing-surveys-better-evidence-2026" }
      ]
    },
    {
      id: "professional", name: "Professional Practice", glyph: "✚", color: "#a33029", spine: "AEA 2018",
      blurb: "Acting ethically and to standard — integrity, safeguarding, cultural responsiveness, reflective practice.",
      cells: {
        officer: "Works ethically; follows safeguarding & data rules.",
        specialist: "Applies AEA/UNEG standards; culturally responsive.",
        manager: "Owns ethics & quality assurance.",
        lead: "Shapes org ethics; mentors; represents the team."
      },
      learn: [
        { label: "AEA Competencies & Standards", href: "https://www.eval.org/About/Competencies-Standards" },
        { label: "MEASURE Evaluation — free courses", href: "https://www.measureevaluation.org/resources/training/online-courses-and-resources/certificate-courses" }
      ]
    },
    {
      id: "context", name: "Context", glyph: "◎", color: "#8a5600", spine: "AEA 2018",
      blurb: "Understanding the setting — stakeholders, systems, power, culture — and tailoring to it.",
      cells: {
        officer: "Learns the programme, community & stakeholders.",
        specialist: "Maps systems & power; adapts to culture.",
        manager: "Aligns evaluation to strategy; manages the politics.",
        lead: "Reads the policy landscape; positions M&E for uptake."
      },
      learn: [
        { label: "BetterEvaluation", href: "https://www.betterevaluation.org/" },
        { label: "India Development Review (IDR)", href: "https://idronline.org/" }
      ]
    },
    {
      id: "planning", name: "Planning & Management", glyph: "◆", color: "#2a5b8c", spine: "AEA 2018",
      blurb: "Scoping, budgeting and running evaluations and M&E systems on time and on budget.",
      cells: {
        officer: "Keeps trackers, timelines & logistics on track.",
        specialist: "Plans scope, budget & fieldwork.",
        manager: "Runs multiple evaluations, vendors & budgets.",
        lead: "Builds the M&E function & capability."
      },
      learn: [
        { label: "ITCILO — M&E Certification", href: "https://www.itcilo.org/courses/monitoring-and-evaluation-certification-programme-online" },
        { label: "World Bank — free courses", href: "https://courses.wbginstitute.org/courses" }
      ]
    },
    {
      id: "interpersonal", name: "Interpersonal", glyph: "✦", color: "#4c4196", spine: "AEA 2018",
      blurb: "Communication, facilitation and collaboration — making evidence land with people.",
      cells: {
        officer: "Communicates clearly; works well in a team.",
        specialist: "Facilitates; turns data into plain-language insight.",
        manager: "Manages stakeholders & teams; coaches juniors.",
        lead: "Influences leaders & funders; develops people."
      },
      learn: [
        { label: "Coursera — data storytelling", href: "https://www.coursera.org/courses?query=data%20storytelling" },
        { label: "The Field — find a mentor", href: "#/gateway" }
      ]
    },
    {
      id: "datatech", name: "Data & Technology", glyph: "⬡", color: "#985277", spine: "added for MEL",
      blurb: "The data systems, statistics and tools a modern MEL team runs on — plus responsible AI.",
      cells: {
        officer: "Confident in Excel/Sheets & a mobile data tool.",
        specialist: "Builds dashboards; analyses in R/Python/Power BI.",
        manager: "Designs data systems; pilots responsible AI.",
        lead: "Owns data strategy, architecture & AI roadmap."
      },
      learn: [
        { label: "DHIS2 Academy — free", href: "https://academy.dhis2.org/" },
        { label: "DataCamp — AI/data literacy", href: "https://www.datacamp.com/blog/the-most-important-ai-skills-for-2026-a-practical-ai-and-data-literacy-framework" }
      ]
    }
  ],

  /* Badges = competency MILESTONES (informational, not currency).
     Earning/tracking is parked for the Training Hall phase. */
  badges: [
    { id: "methodologist", name: "Methodologist", glyph: "▣", domain: "methodology",
      criterion: "Designs and defends a rigorous evaluation end-to-end (Manager+)." },
    { id: "standard-bearer", name: "Standard-Bearer", glyph: "✚", domain: "professional",
      criterion: "Embeds ethics, safeguarding and AEA standards into everyday practice." },
    { id: "systems-reader", name: "Systems Reader", glyph: "◎", domain: "context",
      criterion: "Tailors evaluation to context, power and stakeholders." },
    { id: "operator", name: "Operator", glyph: "◆", domain: "planning",
      criterion: "Plans and manages evaluations on time and on budget." },
    { id: "translator", name: "Translator", glyph: "✦", domain: "interpersonal",
      criterion: "Turns evidence into decisions people actually act on." },
    { id: "data-smith", name: "Data Smith", glyph: "⬡", domain: "datatech",
      criterion: "Builds the data systems and analytics a modern MEL team relies on." }
  ],

  /* Guild Hall: the outward gateway to the global MEL world */
  gateway: {
    people_orgs: [
      { name: "J-PAL", note: "Randomized evaluations, 90+ countries", href: "https://www.povertyactionlab.org/" },
      { name: "Innovations for Poverty Action (IPA)", note: "Research–practice on what works", href: "https://poverty-action.org/" },
      { name: "3ie", note: "Impact evaluation evidence hub", href: "https://www.3ieimpact.org/" },
      { name: "IDinsight", note: "Data & advisory for social impact", href: "https://www.idinsight.org/" },
      { name: "NITI Aayog DMEO (India)", note: "Govt monitoring & evaluation office", href: "https://dmeo.gov.in/" },
      { name: "ISDM (India)", note: "Development management education", href: "https://www.isdm.org.in/" },
      { name: "BetterEvaluation", note: "Methods & approaches library", href: "https://www.betterevaluation.org/" },
      { name: "World Bank DIME", note: "Development impact evaluation", href: "https://www.worldbank.org/en/research/dime" }
    ],
    communities_events: [
      { name: "EvalCommunity", note: "M&E jobs, courses & community", href: "https://www.evalcommunity.com/" },
      { name: "MERL Tech", note: "Tech + data in MERL", href: "https://merltech.org/" },
      { name: "American Evaluation Association", note: "Competencies, standards, conf.", href: "https://www.eval.org/" },
      { name: "ICT4D Conference 2026", note: "Digital & data for development", href: "https://www.ict4dconference.org/" },
      { name: "NCMEL (India, DMEO)", note: "National M&E + learning conference", href: "https://dmeo.gov.in/" }
    ],
    jobs: [
      { name: "Devex Jobs", note: "Global development roles", href: "https://www.devex.com/jobs/search" },
      { name: "ReliefWeb Jobs", note: "Humanitarian & development", href: "https://reliefweb.int/jobs" },
      { name: "Impactpool", note: "UN / NGO / mission-driven", href: "https://www.impactpool.org/" },
      { name: "DevNetJobsIndia", note: "India NGO & development jobs", href: "https://devnetjobsindia.org/" },
      { name: "NGOBOX — M&E", note: "India M&E openings", href: "https://ngobox.org/tag--jobs-in-Monitoring-&-Evaluation" }
    ]
  },

  /* Field trend reports — sub-pages reached from The Field (not in the nav) */
  fieldTrends: {
    career: {
      title: "Career Trends",
      kicker: "Where the work is heading",
      summary: "The social-sector job market is tighter, more local and more data-driven. Long-term donor-funded posts are thinning as aid contracts; short-term and portfolio careers are the norm; hiring is shifting to Global-South talent hubs; and AI + data literacy is now a baseline expectation, not a bonus.",
      bars: [
        { label: "Leaders reporting a data-skills gap", v: 60 },
        { label: "Leaders reporting an AI-skills gap", v: 59 },
        { label: "New roles that are short-term", v: 41 }
      ],
      figures: [
        { b: "−23%", s: "Global ODA, 2025 (largest drop on record)" },
        { b: "−25%", s: "WHO workforce reduction (planned)" }
      ],
      points: [
        { t: "AI & data literacy is the new baseline skill.", src: { label: "DataCamp", href: "https://www.datacamp.com/blog/the-state-of-data-and-ai-literacy-in-2026-definitions-statistics-and-the-ai-skills-gap" } },
        { t: "Short-term, portfolio careers are now the norm.", src: { label: "Devex", href: "https://www.devex.com/news/10-ways-the-global-development-job-market-shifted-in-2025-111604" } },
        { t: "Hiring is localising to Global-South talent hubs.", src: { label: "The Conversation", href: "https://theconversation.com/international-aid-groups-are-dealing-with-the-pain-of-slashed-usaid-funding-by-cutting-staff-localizing-and-coordinating-better-273184" } },
        { t: "A shrinking aid base has thinned the field.", src: { label: "OECD", href: "https://www.oecd.org/en/data/insights/data-explainers/2026/04/a-historic-decline-in-foreign-aid-preliminary-2025-oda-data.html" } }
      ]
    },
    education: {
      title: "Social Development & Education",
      kicker: "How the field learns",
      summary: "As traditional aid retreats, learning is going domestic, online and outcome-focused. Free platforms and MicroMasters scale skill-building cheaply, fellowships keep feeding leadership pipelines, and in India mandatory CSR is pushing money toward outcome-based, measured programmes — raising demand for evaluation skills.",
      bars: [
        { label: "SDG indicators with good data coverage", v: 70 },
        { label: "NSOs (low-income) with severe funding gaps", v: 23 }
      ],
      figures: [
        { b: "350k+", s: "DEDP MicroMasters learners (214 countries)" },
        { b: "52k+", s: "DHIS2 Academy learners (175+ countries)" },
        { b: "₹27,000cr", s: "India CSR spend, FY24" }
      ],
      points: [
        { t: "Free platforms (DHIS2, World Bank) democratise MEL skills.", src: { label: "DHIS2 Academy", href: "https://academy.dhis2.org/" } },
        { t: "MicroMasters & MOOCs scale credentialing globally.", src: { label: "MITx DEDP", href: "https://micromasters.mit.edu/dedp/" } },
        { t: "India's CSR is shifting to outcome-based, measured work.", src: { label: "Smile Foundation", href: "https://www.smilefoundationindia.org/blog/csr-spending-in-india-2026/" } },
        { t: "As aid retreats, domestic & online learning fills gaps.", src: { label: "OECD", href: "https://www.oecd.org/en/data/insights/data-explainers/2026/04/a-historic-decline-in-foreign-aid-preliminary-2025-oda-data.html" } }
      ]
    }
  },

  /* Newsroom: the weekly Brief. This is only a FALLBACK — the real content
     lives in data/brief.js (loaded after this file), which the weekly CI job
     regenerates. If brief.js is missing, the site still loads with an empty
     Brief rather than breaking. */
  brief: { ticker: [], sections: [], education: [] }
};
