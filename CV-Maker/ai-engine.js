/* AxonCV AI Engine — Axon Systems */

const AI = (function(){

const _r = a => a[Math.floor(Math.random()*a.length)];
const _n = (min,max) => Math.floor(Math.random()*(max-min+1))+min;

const PH = {
  users:  ['1,200','5,000','10,000','25,000','50,000','100,000','500,000'],
  usersK: ['1K+','5K+','10K+','25K+','50K+','100K+','500K+'],
  pct:    [15,18,20,22,25,27,30,32,35,38,40,42,45],
  team:   [3,4,5,6,7,8,10,12,15],
  num:    [3,4,5,6,7,8,10,12,15,20,25],
  money:  ['$50K','$100K','$200K','$300K','$500K','$1M','$2M'],
  time:   ['2 weeks','3 weeks','1 month','6 weeks','2 months','3 months'],
};

function fill(t){
  return t
    .replace(/{users}/g, _r(PH.users))
    .replace(/{usersK}/g, _r(PH.usersK))
    .replace(/{pct}/g,  _r(PH.pct))
    .replace(/{team}/g, _r(PH.team))
    .replace(/{num}/g,  _r(PH.num))
    .replace(/{money}/g,_r(PH.money))
    .replace(/{time}/g, _r(PH.time));
}

// ─── JOB DATABASE ───────────────────────────────────────────────────────────
const JOBS = {
  'software engineer':{
    skills:'JavaScript, TypeScript, Python, React, Node.js, AWS, Docker, Git, REST APIs, PostgreSQL, CI/CD, Agile',
    bullets:[
      'Developed and maintained {num} production applications serving {users}+ users with 99.9% uptime',
      'Reduced application load time by {pct}% through performance optimization and code refactoring',
      'Built RESTful APIs handling {users}+ daily requests with sub-100ms average response time',
      'Led code review process for team of {team}, reducing production bugs by {pct}%',
      'Implemented CI/CD pipeline reducing deployment time from {time} to under 15 minutes',
      'Collaborated with product and design teams to deliver {num} major features per quarter',
      'Mentored {team} junior developers, improving team velocity by {pct}%',
      'Optimized database queries reducing response time by {pct}% for {users}+ daily users',
      'Wrote unit and integration tests achieving {pct}% code coverage',
      'Architected microservices solution handling {users}+ concurrent requests reliably'
    ],
    summary:'Results-driven Software Engineer with {years}+ years designing and building scalable, production-grade applications. Proficient in full-stack development with expertise in JavaScript, Python, and cloud infrastructure. Proven track record of delivering high-quality solutions on time while collaborating across cross-functional teams.'
  },
  'frontend developer':{
    skills:'React, Vue.js, TypeScript, JavaScript, Next.js, CSS3, HTML5, Redux, Tailwind CSS, Jest, Webpack, Figma',
    bullets:[
      'Built responsive React applications serving {users}+ monthly active users',
      'Improved Core Web Vitals scores by {pct}%, boosting SEO and user experience',
      'Reduced JavaScript bundle size by {pct}% through code splitting and lazy loading',
      'Developed reusable component library adopted across {num} products company-wide',
      'Implemented WCAG 2.1 AA accessibility improvements across entire web application',
      'Built real-time features using WebSockets supporting {users}+ concurrent connections',
      'Led migration from legacy jQuery codebase to modern React/TypeScript architecture',
      'Improved page performance by {pct}% through image optimization and caching strategies',
      'Collaborated with UX team to implement {num} design systems pixel-perfectly',
      'Wrote unit and E2E tests achieving {pct}% code coverage with Jest and Cypress'
    ],
    summary:'Creative Frontend Developer with {years}+ years building high-performance, accessible web applications. Expert in React, TypeScript, and modern CSS with a passion for exceptional user experiences. Skilled at translating complex designs into clean, maintainable code with a relentless focus on performance.'
  },
  'backend developer':{
    skills:'Node.js, Python, Java, Go, PostgreSQL, MongoDB, Redis, Docker, Kubernetes, REST API, GraphQL, AWS',
    bullets:[
      'Designed scalable backend services handling {users}+ requests per day with sub-50ms latency',
      'Implemented microservices architecture reducing system downtime by {pct}%',
      'Optimized database indexing strategy improving query performance by {pct}%',
      'Built event-driven architecture using message queues processing {users}+ events daily',
      'Developed GraphQL and REST APIs consumed by {num}+ client applications',
      'Reduced infrastructure costs by {pct}% through caching and architecture optimization',
      'Led zero-downtime database migration for {users}+ active users',
      'Built automated test suite covering {pct}% of codebase, reducing production bugs by {pct}%',
      'Implemented authentication system handling {users}+ registered users securely',
      'Mentored {team} junior backend engineers, improving team delivery velocity by {pct}%'
    ],
    summary:'Senior Backend Developer with {years}+ years building robust, scalable server-side systems. Expert in Node.js, Python, and cloud infrastructure with deep knowledge of distributed systems design. Consistently delivers high-performance APIs and services that support millions of users reliably.'
  },
  'full stack developer':{
    skills:'React, Node.js, TypeScript, Python, PostgreSQL, MongoDB, Docker, AWS, REST API, Git, Redis, GraphQL',
    bullets:[
      'Built complete end-to-end features from database design to React UI for {users}+ active users',
      'Delivered {num} full web applications from concept to production independently',
      'Reduced full-stack response time by {pct}% through optimization across all application layers',
      'Built RESTful API and React frontend serving {users}+ monthly active users',
      'Reduced cloud infrastructure costs by {pct}% through architectural improvements',
      'Implemented real-time features using WebSockets with {users}+ concurrent connections',
      'Led team of {team} developers in adopting modern full-stack best practices',
      'Delivered {num} client projects on time with combined budgets of {money}',
      'Improved deployment pipeline reducing release cycle from {time} to under 30 minutes',
      'Architected and implemented {num} major product features adopted by {users}+ users'
    ],
    summary:'Versatile Full Stack Developer with {years}+ years building complete, production-ready web solutions. Equally comfortable designing databases, building APIs, and crafting pixel-perfect UIs. Known for taking full ownership of features and delivering polished products that users love.'
  },
  'devops engineer':{
    skills:'Kubernetes, Docker, AWS, Terraform, CI/CD, Jenkins, Ansible, Linux, Prometheus, Grafana, Python, GitOps',
    bullets:[
      'Designed and maintained Kubernetes clusters supporting {num} microservices in production',
      'Built CI/CD pipelines reducing deployment time from {time} to under 10 minutes',
      'Achieved {pct}% reduction in cloud infrastructure costs through optimization and rightsizing',
      'Maintained {pct}% SLA uptime for production systems serving {users}+ users',
      'Implemented infrastructure-as-code with Terraform managing {num}+ cloud resources',
      'Automated {num}+ manual operational processes saving {num} engineering hours weekly',
      'Led cloud migration of legacy monolith to AWS with zero customer-facing downtime',
      'Built monitoring and alerting system reducing mean time to resolution (MTTR) by {pct}%',
      'Implemented disaster recovery plan with RTO under 15 minutes tested quarterly',
      'Managed security patching and compliance for {num}+ server fleet'
    ],
    summary:'Experienced DevOps Engineer with {years}+ years automating and optimizing infrastructure at scale. Expert in Kubernetes, AWS, and Terraform with a passion for building reliable, self-healing systems. Proven track record of improving deployment velocity, system reliability, and reducing operational overhead.'
  },
  'data scientist':{
    skills:'Python, Machine Learning, TensorFlow, PyTorch, SQL, Pandas, NumPy, Scikit-learn, Tableau, NLP, Deep Learning, Statistics',
    bullets:[
      'Built ML model achieving {pct}% accuracy improvement over baseline, serving {users}+ predictions daily',
      'Developed recommendation system increasing user engagement by {pct}% and revenue by {money}',
      'Reduced customer churn by {pct}% using predictive modeling and targeted intervention',
      'Processed and analyzed datasets of {users}+ records generating actionable business insights',
      'Built NLP pipeline processing {users}+ text documents daily with {pct}% precision',
      'Delivered {num} A/B testing experiments resulting in {pct}% conversion rate improvement',
      'Created executive dashboards in Tableau used by {num}+ stakeholders for daily decisions',
      'Automated data pipeline processing {users}+ daily records, saving {num} hours of manual work',
      'Collaborated with engineering to deploy {num} ML models to production serving real users',
      'Published {num} internal research reports leading to {money} in measurable business impact'
    ],
    summary:'Data Scientist with {years}+ years transforming data into actionable insights and ML-powered products. Expert in Python, machine learning, and statistical modeling with a track record of delivering measurable business impact. Passionate about solving complex problems through rigorous analysis and innovative algorithms.'
  },
  'data analyst':{
    skills:'SQL, Python, Excel, Tableau, Power BI, Google Analytics, Statistics, Data Modeling, ETL, R, Business Intelligence',
    bullets:[
      'Analyzed datasets of {users}+ records identifying trends driving {pct}% revenue improvement',
      'Built {num} executive dashboards in Tableau reducing manual reporting time by {pct}%',
      'Identified cost reduction opportunity saving the company {money} annually',
      'Automated {num} recurring reports saving {num} hours of manual work per week',
      'Conducted A/B testing analysis for {num} experiments directly influencing product roadmap',
      'Built ETL pipeline processing {users}+ daily transactions with {pct}% accuracy',
      'Presented data-driven insights to C-suite executives influencing {money} budget decisions',
      'Improved SQL query performance by {pct}% through indexing and optimization',
      'Trained {num}+ team members on self-service analytics, reducing analyst bottleneck by {pct}%',
      'Collaborated with {num} business units to define and track KPIs aligned with company OKRs'
    ],
    summary:'Detail-oriented Data Analyst with {years}+ years turning raw data into compelling business insights. Proficient in SQL, Python, and Tableau with strong business acumen. Known for simplifying complex data into clear visualizations that drive strategic decisions and measurable outcomes.'
  },
  'product manager':{
    skills:'Product Strategy, Roadmapping, User Research, Agile/Scrum, SQL, Figma, A/B Testing, OKRs, Stakeholder Management, Jira, Analytics, Go-to-Market',
    bullets:[
      'Led development of {num} major product features reaching {users}+ active users',
      'Increased user retention by {pct}% through data-driven UX improvements',
      'Managed cross-functional team of {team} engineers, designers, and analysts',
      'Delivered {money} revenue impact through strategic product initiatives',
      'Conducted {num}+ user interviews and usability studies informing product decisions',
      'Improved key conversion metric by {pct}% through A/B testing ({num} experiments)',
      'Defined and launched {num}-year product roadmap aligned with company OKRs',
      'Reduced time-to-market for new features by {pct}% through process improvements',
      'Grew product from {users} to {usersK} users through strategic feature development',
      'Collaborated with sales on go-to-market strategy resulting in {money} first-year revenue'
    ],
    summary:'Strategic Product Manager with {years}+ years leading product development at high-growth companies. Expert at defining vision, ruthless prioritization, and shipping products users love. Proven track record of driving significant growth through data-informed product decisions and strong cross-functional leadership.'
  },
  'ux designer':{
    skills:'Figma, User Research, Wireframing, Prototyping, Usability Testing, Design Systems, Adobe XD, Interaction Design, HTML/CSS, Accessibility, InVision',
    bullets:[
      'Designed end-to-end user experience for {num} major product areas serving {users}+ users',
      'Increased user satisfaction (CSAT) score by {pct}% through comprehensive UX research and redesign',
      'Built design system with {num}+ reusable components reducing design time by {pct}%',
      'Conducted {num}+ usability tests and user interviews directly informing product decisions',
      'Reduced user onboarding drop-off by {pct}% through improved UX flow redesign',
      'Delivered high-fidelity prototypes in Figma for {num} major features per quarter',
      'Improved landing page conversion rate by {pct}% through data-driven redesign',
      'Collaborated with {num} engineering teams ensuring pixel-perfect implementation',
      'Developed accessibility improvements meeting WCAG 2.1 AA standards across platform',
      'Led design sprint workshops generating {num} validated concepts for next product cycle'
    ],
    summary:'Creative UX/UI Designer with {years}+ years crafting intuitive digital experiences that users love. Expert in user research, interaction design, and Figma with a human-centered design philosophy. Consistently delivers designs that balance user needs with business goals, driving measurable improvements in engagement.'
  },
  'marketing manager':{
    skills:'Digital Marketing, SEO/SEM, Google Analytics, Content Strategy, Social Media, Email Marketing, HubSpot, Salesforce, A/B Testing, Brand Strategy, Paid Ads',
    bullets:[
      'Grew organic website traffic by {pct}% through comprehensive SEO and content strategy',
      'Managed {money} annual marketing budget delivering {pct}% ROI improvement year-over-year',
      'Led multi-channel campaign reaching {users}+ prospects, generating {money} in pipeline',
      'Increased email marketing CTR by {pct}% through segmentation and personalization',
      'Built social media presence growing following by {pct}% to {usersK} followers',
      'Launched {num} product campaigns resulting in {pct}% increase in qualified leads',
      'Reduced customer acquisition cost (CAC) by {pct}% through campaign optimization',
      'Managed team of {team} marketing specialists and agency partners',
      'Developed thought leadership content strategy producing {num}+ pieces per month',
      'Increased brand awareness score by {pct}% in target market through integrated campaigns'
    ],
    summary:'Results-driven Marketing Manager with {years}+ years developing and executing growth strategies. Expert in digital marketing, content strategy, and data-driven campaign optimization. Proven track record of building brand awareness, generating qualified leads, and driving measurable revenue impact.'
  },
  'project manager':{
    skills:'Agile/Scrum, PMP, Jira, Confluence, Risk Management, Stakeholder Management, Budgeting, MS Project, Communication, Change Management, Leadership',
    bullets:[
      'Successfully delivered {num} projects on time and within budget totaling {money}',
      'Managed cross-functional teams of {team} members across {num} departments',
      'Reduced project delivery time by {pct}% through improved planning and risk management',
      'Implemented Agile/Scrum framework increasing team velocity by {pct}%',
      'Managed portfolio of {num} simultaneous projects with combined budget of {money}',
      'Improved stakeholder satisfaction score by {pct}% through proactive communication',
      'Identified and mitigated {num} critical risks preventing {money} in potential losses',
      'Reduced project overruns from {pct}% to under 5% across all managed projects',
      'Onboarded and mentored {num} junior project managers on best practices',
      'Led delivery of company flagship project with {money} budget and {team} team members'
    ],
    summary:'Certified Project Manager (PMP) with {years}+ years delivering complex projects across diverse industries. Expert in Agile and Waterfall methodologies with strong stakeholder management and communication skills. Consistent record of bringing projects in on time, within budget, and exceeding expectations.'
  },
  'graphic designer':{
    skills:'Adobe Photoshop, Illustrator, InDesign, Figma, After Effects, Typography, Brand Identity, UI Design, Print Design, Motion Graphics',
    bullets:[
      'Designed visual identity systems for {num} brands including logos, style guides, and assets',
      'Created {num}+ marketing materials increasing brand recognition by {pct}%',
      'Designed UI components for web and mobile apps used by {users}+ daily users',
      'Delivered {num} complete brand identity projects from concept to final deliverable',
      'Reduced design-to-approval cycle by {pct}% through improved client communication',
      'Created social media content increasing platform engagement by {pct}%',
      'Managed {num} concurrent design projects consistently meeting tight deadlines',
      'Built template library of {num}+ reusable assets reducing production time by {pct}%',
      'Collaborated with marketing team on campaigns reaching {users}+ target audience',
      'Produced print and digital materials for events with {users}+ attendees'
    ],
    summary:'Creative Graphic Designer with {years}+ years crafting compelling visual experiences for brands and digital products. Proficient in Adobe Creative Suite and Figma with a strong eye for typography and composition. Passionate about design that solves problems beautifully while staying true to brand identity.'
  },
  'cybersecurity engineer':{
    skills:'Network Security, SIEM, Penetration Testing, ISO 27001, CISSP, Python, Incident Response, SOC, Vulnerability Assessment, Zero Trust, Firewall',
    bullets:[
      'Led incident response for {num} security events, reducing average resolution time by {pct}%',
      'Implemented security monitoring covering {users}+ endpoints with SIEM integration',
      'Conducted {num} penetration tests identifying and remediating {num}+ critical vulnerabilities',
      'Reduced attack surface by {pct}% through network segmentation and access control improvements',
      'Managed security compliance program achieving ISO 27001 / SOC 2 Type II certification',
      'Built security awareness training program reaching {num}+ employees, reducing phishing by {pct}%',
      'Developed incident response playbooks covering {num}+ threat scenarios',
      'Implemented zero-trust architecture protecting {num}+ internal applications',
      'Reduced mean time to detect (MTTD) threats from {time} to under 4 hours',
      'Managed vulnerability program patching {pct}% of critical issues within defined SLA'
    ],
    summary:'Certified Cybersecurity Engineer (CISSP) with {years}+ years protecting enterprise systems and sensitive data. Expert in threat detection, incident response, and security architecture. Proven ability to build robust security programs that protect organizations while enabling business agility.'
  },
  'mobile developer':{
    skills:'iOS, Android, React Native, Flutter, Swift, Kotlin, Firebase, REST APIs, App Store Optimization, Git, Xcode, Android Studio',
    bullets:[
      'Developed and shipped {num} mobile applications with {users}+ combined downloads',
      'Built and maintained iOS/Android app serving {users}+ monthly active users',
      'Improved App Store rating from 3.{num} to 4.{num} through UX improvements and fixes',
      'Reduced app crash rate by {pct}% through proactive monitoring and targeted fixes',
      'Implemented offline-first architecture improving user experience by {pct}%',
      'Reduced app binary size by {pct}% through asset optimization and code cleanup',
      'Built push notification system achieving {pct}% open rate for {users}+ users',
      'Led performance optimization reducing cold app startup time by {pct}%',
      'Integrated {num}+ third-party SDKs (payments, analytics, auth) seamlessly',
      'Mentored {team} mobile developers improving team delivery velocity by {pct}%'
    ],
    summary:'Experienced Mobile Developer with {years}+ years building native and cross-platform applications. Proficient in iOS (Swift), Android (Kotlin), and React Native. Passionate about creating smooth, responsive mobile experiences that feel effortless to users and perform flawlessly under load.'
  },
  'cloud engineer':{
    skills:'AWS, Azure, GCP, Terraform, Kubernetes, Docker, CI/CD, Python, Linux, Security Compliance, Cost Optimization, Networking',
    bullets:[
      'Architected cloud infrastructure supporting {users}+ users with {pct}% uptime SLA',
      'Reduced cloud costs by {pct}% through rightsizing, reserved instances, and optimization',
      'Migrated {num} on-premise applications to cloud with zero customer-facing downtime',
      'Implemented infrastructure-as-code managing {num}+ cloud resources with Terraform',
      'Built auto-scaling architecture handling {pct}% traffic spikes without intervention',
      'Designed and tested disaster recovery with RTO under 30 minutes and RPO under 1 hour',
      'Established cloud governance framework reducing security incidents by {pct}%',
      'Built shared internal developer platform serving {num}+ engineering teams',
      'Optimized data transfer and networking costs saving {money} annually',
      'Led cloud architecture reviews for {num} major system designs ensuring best practices'
    ],
    summary:'Cloud Engineer with {years}+ years designing and operating large-scale cloud infrastructure. Expert in AWS, Terraform, and Kubernetes with deep expertise in cost optimization, security, and reliability engineering. Passionate about building developer-friendly platforms that enable engineering teams to move fast safely.'
  },
  'qa engineer':{
    skills:'Manual Testing, Selenium, Cypress, Playwright, Jira, Test Planning, API Testing, Python, Postman, Performance Testing, BDD, Test Automation',
    bullets:[
      'Built automated test suite with {num}+ test cases reducing manual testing effort by {pct}%',
      'Reduced production defect escape rate by {pct}% through improved testing processes',
      'Executed {num}+ test cases per sprint achieving {pct}% defect detection before release',
      'Led QA for {num} major product releases with zero critical production defects',
      'Implemented performance testing identifying {num} bottlenecks before they hit production',
      'Developed API test suite covering {num}+ endpoints with {pct}% code coverage',
      'Reduced regression testing time by {pct}% through strategic test automation',
      'Trained {num} developers on unit testing best practices, improving overall coverage by {pct}%',
      'Built cross-browser testing matrix ensuring compatibility across {num}+ configurations',
      'Improved defect documentation quality reducing developer back-and-forth by {pct}%'
    ],
    summary:'Detail-oriented QA Engineer with {years}+ years ensuring software quality through systematic testing and intelligent automation. Expert in test planning, automation frameworks, and defect management. Committed to shipping reliable software and building quality practices that scale with engineering teams.'
  },
  'finance analyst':{
    skills:'Financial Modeling, Excel, Bloomberg Terminal, SQL, PowerPoint, FP&A, Forecasting, DCF Analysis, ERP Systems, Budget Management, Power BI',
    bullets:[
      'Built financial models supporting {money} in strategic investment and acquisition decisions',
      'Prepared monthly financial reports analyzing performance of {money}+ revenue business unit',
      'Reduced budget forecast variance by {pct}% through improved modeling methodology',
      'Identified {money} cost savings opportunity through detailed operational expense analysis',
      'Automated {num} financial reporting processes saving {num} finance hours monthly',
      'Led annual budget process across {num} business units with combined budget of {money}',
      'Conducted due diligence analysis for {num} M&A opportunities totaling {money}',
      'Improved forecast accuracy by {pct}% through enhanced rolling forecast techniques',
      'Built executive KPI dashboard tracking {num} financial metrics for C-suite review',
      'Prepared investor materials for {money}+ funding rounds and board presentations'
    ],
    summary:'Analytical Finance Analyst with {years}+ years delivering actionable financial insights that drive strategic decisions. Expert in financial modeling, forecasting, and business analysis with strong stakeholder communication skills. Proven ability to transform complex financial data into clear insights that accelerate business performance.'
  },
  'hr manager':{
    skills:'Talent Acquisition, Employee Relations, HRIS (Workday/BambooHR), Performance Management, Onboarding, Employment Law, Payroll, L&D, Compensation',
    bullets:[
      'Led full-cycle recruitment for {num}+ roles annually, reducing time-to-fill by {pct}%',
      'Developed onboarding program improving 90-day new hire retention by {pct}%',
      'Managed HR operations for {users}+ employee organization across {num} offices',
      'Reduced voluntary employee turnover by {pct}% through culture and engagement initiatives',
      'Implemented HRIS system streamlining processes for {num}+ employees company-wide',
      'Led annual performance review cycle for {num}+ employees across all departments',
      'Negotiated benefits packages saving company {money} annually with improved employee coverage',
      'Resolved {num}+ employee relations cases with {pct}% satisfactory resolution rate',
      'Developed and delivered {num} training programs reaching {num}+ employees',
      'Built diversity hiring program increasing underrepresented group hiring by {pct}%'
    ],
    summary:'Strategic HR Manager with {years}+ years building people-first organizations. Expert in talent acquisition, employee development, and HR operations. Passionate about creating workplaces where people thrive, combining strong compliance knowledge with genuine empathy for the employee experience.'
  },
  'content writer':{
    skills:'Content Strategy, SEO Copywriting, WordPress, HubSpot, Google Analytics, Social Media Writing, Storytelling, Research, Editing, Email Marketing',
    bullets:[
      'Produced {num}+ high-quality content pieces monthly driving {users}+ organic monthly visits',
      'Grew organic search traffic by {pct}% through SEO-optimized content strategy',
      'Achieved top-3 Google rankings for {num}+ high-value target keywords',
      'Increased email newsletter open rate by {pct}% through improved subject lines and content',
      'Developed thought leadership content contributing to {pct}% increase in brand awareness',
      'Wrote {num}+ case studies and whitepapers generating {num}+ qualified sales leads',
      'Managed team of {team} freelance writers maintaining consistent brand voice',
      'Reduced content production time by {pct}% through templating and editorial process improvement',
      'Generated {users}+ social media impressions monthly through engaging content',
      'Built content calendar and strategy for {num}+ marketing channels simultaneously'
    ],
    summary:'Versatile Content Writer with {years}+ years creating compelling content that builds audiences and drives results. Expert in SEO, storytelling, and multi-channel content strategy. Proven track record of building organic traffic, engaging readers, and producing content that converts browsers into customers.'
  },
  'sales manager':{
    skills:'B2B Sales, CRM (Salesforce/HubSpot), Pipeline Management, Team Leadership, Account Management, Negotiation, Cold Outreach, Revenue Forecasting',
    bullets:[
      'Led sales team of {team} achieving {pct}% above quota for {num} consecutive quarters',
      'Generated {money} in new annual recurring revenue through strategic account development',
      'Increased team average deal size by {pct}% through improved qualification and sales process',
      'Built and managed active pipeline of {money}+ across {num}+ enterprise accounts',
      'Reduced average sales cycle from {time} to {time} through process optimization',
      'Recruited, hired, and onboarded {num} top-performing sales representatives',
      'Improved win rate by {pct}% through competitive positioning and value-based selling',
      'Established {num} net-new enterprise accounts generating {money} annual recurring revenue',
      'Exceeded annual quota by {pct}% while managing and developing team of {team}',
      'Built outbound sales motion acquiring {num}+ new logos in first {time}'
    ],
    summary:'High-performing Sales Manager with {years}+ years leading teams to exceed aggressive revenue targets. Expert in B2B sales strategy, pipeline development, and building high-performance sales cultures. Consistent track record of growing revenue, developing talent, and winning decisively in competitive markets.'
  }
};

// ─── JOB METADATA (soft skills + education field) ────────────────────────────
const JOB_META = {
  'software engineer':    {ss:'Problem Solving, Critical Thinking, Team Collaboration, Communication, Adaptability, Continuous Learning',    ef:'Computer Science'},
  'frontend developer':   {ss:'Creativity, Attention to Detail, Collaboration, Problem Solving, Communication, User Empathy',                ef:'Computer Science'},
  'backend developer':    {ss:'Analytical Thinking, Problem Solving, Team Collaboration, Communication, Reliability, Logical Reasoning',     ef:'Computer Science'},
  'full stack developer': {ss:'Versatility, Problem Solving, Self-Motivation, Collaboration, Communication, Adaptability',                   ef:'Computer Science'},
  'devops engineer':      {ss:'Analytical Thinking, Problem Solving, Communication, Collaboration, Reliability, Continuous Improvement',     ef:'Computer Science'},
  'data scientist':       {ss:'Analytical Thinking, Problem Solving, Communication, Curiosity, Collaboration, Critical Thinking',            ef:'Data Science'},
  'data analyst':         {ss:'Analytical Thinking, Communication, Attention to Detail, Problem Solving, Collaboration, Business Acumen',    ef:'Business Analytics'},
  'product manager':      {ss:'Leadership, Communication, Strategic Thinking, Empathy, Decision Making, Stakeholder Management',             ef:'Business Administration'},
  'ux designer':          {ss:'Empathy, Creativity, Communication, Collaboration, Attention to Detail, Adaptability',                        ef:'UX & Product Design'},
  'marketing manager':    {ss:'Creativity, Communication, Analytical Thinking, Leadership, Collaboration, Strategic Planning',               ef:'Marketing'},
  'project manager':      {ss:'Leadership, Communication, Organization, Risk Management, Problem Solving, Stakeholder Management',           ef:'Business Administration'},
  'graphic designer':     {ss:'Creativity, Attention to Detail, Communication, Time Management, Collaboration, Adaptability',                ef:'Graphic Design'},
  'cybersecurity engineer':{ss:'Analytical Thinking, Attention to Detail, Problem Solving, Communication, Ethics, Continuous Learning',      ef:'Computer Science'},
  'mobile developer':     {ss:'Creativity, Problem Solving, Attention to Detail, Collaboration, Continuous Learning, Communication',         ef:'Computer Science'},
  'cloud engineer':       {ss:'Analytical Thinking, Problem Solving, Communication, Reliability, Continuous Learning, Collaboration',        ef:'Computer Science'},
  'qa engineer':          {ss:'Attention to Detail, Analytical Thinking, Problem Solving, Communication, Persistence, Collaboration',        ef:'Computer Science'},
  'finance analyst':      {ss:'Analytical Thinking, Attention to Detail, Communication, Problem Solving, Time Management, Integrity',        ef:'Finance'},
  'hr manager':           {ss:'Empathy, Communication, Conflict Resolution, Leadership, Discretion, Organizational Skills',                  ef:'Human Resources Management'},
  'content writer':       {ss:'Creativity, Communication, Research Skills, Attention to Detail, Adaptability, Time Management',              ef:'English Literature'},
  'sales manager':        {ss:'Leadership, Communication, Persuasion, Resilience, Strategic Thinking, Relationship Building',               ef:'Business Administration'},
};

// Normalize job title to database key
function normalizeJob(title){
  if(!title) return 'software engineer';
  const t = title.toLowerCase().trim();
  const keys = Object.keys(JOBS);
  if(JOBS[t]) return t;
  for(const k of keys){ if(t.includes(k)||k.includes(t.split(' ')[0])) return k; }
  const aliases = {
    'react':'frontend developer','angular':'frontend developer','vue':'frontend developer',
    'node':'backend developer','express':'backend developer',
    'full stack':'full stack developer','fullstack':'full stack developer',
    'python':'software engineer','java ':'backend developer',
    'machine learning':'data scientist','ml ':'data scientist','ai ':'data scientist',
    'kubernetes':'devops engineer','docker':'devops engineer',
    'aws':'cloud engineer','azure':'cloud engineer','gcp':'cloud engineer',
    'android':'mobile developer','ios':'mobile developer','flutter':'mobile developer','swift':'mobile developer',
    'security':'cybersecurity engineer','cyber':'cybersecurity engineer','infosec':'cybersecurity engineer',
    'ux':'ux designer','ui ':'ux designer','design':'ux designer',
    'graphic':'graphic designer',
    'sales':'sales manager','account exec':'sales manager',
    'marketing':'marketing manager','seo':'content writer','content':'content writer',
    'hr ':'hr manager','human resources':'hr manager','talent':'hr manager','recruiter':'hr manager',
    'finance':'finance analyst','financial':'finance analyst','fp&a':'finance analyst',
    'product':'product manager','pm ':'product manager',
    'project':'project manager','scrum master':'project manager','pmo':'project manager',
    'qa':'qa engineer','test':'qa engineer','quality':'qa engineer',
    'data anal':'data analyst','power bi':'data analyst','tableau':'data analyst',
    'business anal':'project manager',
    'cloud':'cloud engineer','devops':'devops engineer','sre':'devops engineer',
    'mobile':'mobile developer','react native':'mobile developer'
  };
  for(const [kw,mapped] of Object.entries(aliases)){ if(t.includes(kw)) return mapped; }
  return 'software engineer';
}

function toTitleCase(s){ return s.replace(/\w\S*/g,w=>w[0].toUpperCase()+w.slice(1)); }

// ─── GENERATE BULLET POINTS ─────────────────────────────────────────────────
function generateBullets(jobTitle){
  const key = normalizeJob(jobTitle);
  const job = JOBS[key]||JOBS['software engineer'];
  const shuffled = [...job.bullets].sort(()=>Math.random()-.5).slice(0,4);
  return shuffled.map(b=>'• '+fill(b)).join('\n');
}

// ─── GENERATE PROFESSIONAL SUMMARY ──────────────────────────────────────────
function generateSummary(data){
  const pi = data.personalInfo||{};
  const secs = data.sections||[];
  const title = pi.title||'Professional';
  const key = normalizeJob(title);
  const job = JOBS[key]||JOBS['software engineer'];

  const expSec = secs.find(s=>s.id==='experience');
  const years = expSec&&expSec.items ? Math.max(expSec.items.length*2,2) : 3;
  const skillsSec = secs.find(s=>s.id==='skills');
  const skills = skillsSec ? (skillsSec.content||'').split(',').map(x=>x.trim()).filter(Boolean).slice(0,4).join(', ') : '';
  const companies = expSec&&expSec.items ? expSec.items.map(e=>e.company).filter(Boolean).slice(0,2).join(' and ') : '';

  let summary = job.summary.replace('{years}',years);
  if(companies) summary += ` With experience at ${companies}, brings a proven ability to deliver impact in real-world environments.`;
  if(skills){ summary = summary.replace(/\. Proven/,`. Skilled in ${skills}. Proven`); }
  return summary;
}

// ─── GENERATE COVER LETTER ──────────────────────────────────────────────────
function generateCoverLetter(resumeData, companyName, jobTitle, recruiterName, jdText){
  const pi = resumeData.personalInfo||{};
  const secs = resumeData.sections||[];
  const name = pi.name||'Your Name';
  const currentTitle = pi.title||'Professional';
  const expSec = secs.find(s=>s.id==='experience');
  const topExp = expSec&&expSec.items&&expSec.items[0];
  const topRole = topExp ? topExp.title : currentTitle;
  const topCompany = topExp ? topExp.company : '';
  const skillsSec = secs.find(s=>s.id==='skills');
  const topSkills = skillsSec ? (skillsSec.content||'').split(',').map(x=>x.trim()).filter(Boolean).slice(0,3).join(', ') : '';
  const key = normalizeJob(jobTitle||currentTitle);
  const job = JOBS[key]||JOBS['software engineer'];
  const matchedSkills = topSkills||job.skills.split(',').slice(0,3).map(s=>s.trim()).join(', ');
  const salutation = recruiterName ? `Dear ${recruiterName},` : 'Dear Hiring Manager,';
  const today = new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});

  return `${today}\n\n${companyName||'Hiring Team'}\n\n${salutation}\n\nI am writing to express my enthusiastic interest in the ${jobTitle||'open position'} role at ${companyName||'your company'}. As a ${currentTitle}${topCompany?' at '+topCompany:''} with a proven track record of delivering measurable results, I am confident that my skills and experience align strongly with what you are looking for.\n\n${topExp?`In my role as ${topRole}${topCompany?' at '+topCompany:''}, I have ${fill('delivered {num} major initiatives and improved team productivity by {pct}%')}. I am someone who takes full ownership of problems, communicates clearly across teams, and consistently finds ways to create impact beyond what is expected.`:`Throughout my career, I have developed deep expertise in ${matchedSkills}, consistently delivering results that exceed expectations and create measurable value for the organizations I work with.`}\n\nWhat excites me most about ${companyName||'this opportunity'} is the chance to contribute to a team that values ${jdText&&jdText.length>30?'the skills you described — particularly '+extractKeywords(jdText).slice(0,2).join(' and '):'quality, collaboration, and continuous improvement'}. I believe my background makes me well-positioned to make an immediate and lasting contribution.\n\nI am a strong collaborator who thrives in fast-paced environments. Beyond technical skills, I bring the ability to communicate clearly, align work with business goals, and mentor teammates to grow. I am passionate about ${fill('building solutions that serve {usersK} users')} and believe exceptional work comes from technical excellence combined with genuine care.\n\nI would welcome the opportunity to discuss how my experience can help ${companyName||'your team'} achieve its goals. Thank you sincerely for considering my application — I look forward to the conversation.\n\nWarm regards,\n\n${name}\n${[pi.email,pi.phone,pi.linkedin].filter(Boolean).join('  |  ')}`;
}

// ─── LINKEDIN JSON-LD PARSER (auto-fetch path) ──────────────────────────────
function parseLinkedInJsonLd(json){
  if(!json||!json.name) return null;
  const data={personalInfo:{},sections:blankSections()};
  const pi=data.personalInfo;
  pi.name=json.name||'';
  pi.title=json.jobTitle||json.headline||'';
  pi.email=json.email||'';
  if(json.address){
    const a=json.address;
    pi.address=typeof a==='string'?a:[a.addressLocality,a.addressRegion,a.addressCountry].filter(Boolean).join(', ');
  }
  const allUrls=[json.url,...(Array.isArray(json.sameAs)?json.sameAs:[json.sameAs||''])].filter(Boolean);
  const liUrl=allUrls.find(u=>u.includes('linkedin.com'));
  if(liUrl) pi.linkedin=liUrl.replace(/^https?:\/\//,'');
  const ghUrl=allUrls.find(u=>u.includes('github.com'));
  if(ghUrl) pi.github=ghUrl.replace(/^https?:\/\//,'');
  const webUrl=allUrls.find(u=>u&&!u.includes('linkedin.com')&&!u.includes('github.com'));
  if(webUrl) pi.website=webUrl;

  if(json.description){
    const s=data.sections.find(x=>x.id==='summary');
    if(s) s.content=json.description;
  }
  if(json.worksFor){
    const exp=data.sections.find(x=>x.id==='experience');
    if(exp){
      const employers=Array.isArray(json.worksFor)?json.worksFor:[json.worksFor];
      exp.items=employers.map(e=>({title:pi.title||'',company:e.name||'',location:'',start:'',end:'',current:true,desc:''}));
    }
  }
  if(json.alumniOf){
    const edu=data.sections.find(x=>x.id==='education');
    if(edu){
      const schools=Array.isArray(json.alumniOf)?json.alumniOf:[json.alumniOf];
      edu.items=schools.map(s=>({degree:'',field:'',institution:typeof s==='string'?s:s.name||'',location:'',start:'',end:'',grade:''}));
    }
  }
  if(json.knowsAbout){
    const sk=data.sections.find(x=>x.id==='skills');
    if(sk){const skills=Array.isArray(json.knowsAbout)?json.knowsAbout:[json.knowsAbout];sk.content=skills.join(', ');}
  }
  return data;
}

// ─── LINKEDIN TEXT PARSER ────────────────────────────────────────────────────
// Noise patterns — LinkedIn UI elements, ads, sample data
const _LI_NOISE_EXACT=new Set([
  'LinkedIn','Sign in','Join','Join now','Home','My Network','Jobs','Messaging',
  'Notifications','Me','Work','Post','Search','Premium','Connect','Follow',
  'Message','More','Save','Share','Report','Block','Remove connection',
  'Send InMail','Open to work','Available for','Degree connections',
  'Mutual connections','People also viewed','Add profile section',
  'Enhance profile','Resources','Analytics','Activity','Interests',
  'People you may know','Show all','See all','Load more','Show more','Show less',
  'See credentials','Endorse','Give kudos','Follow','Unfollow',
  '1st','2nd','3rd','500+','· 1st','· 2nd','· 3rd',
]);
const _LI_NOISE_REGEX=[
  /^for business$/i,
  /^get \d+%\s*off/i,
  /sales\s*nav(igator)?$/i,
  /^post a job/i,
  /^find leads/i,
  /^advertise$/i,
  /^talent solutions/i,
  /^marketing solutions/i,
  /^small business/i,
  /^community guidelines/i,
  /^privacy\s*&\s*terms/i,
  /linkedin corporation/i,
  /^visit our help center/i,
  /^manage your account/i,
  /^recommendation transparency/i,
  /^select language/i,
  /^accessibility$/i,
  /messaging overlay/i,
  /press enter to open/i,
  /^compose message$/i,
  /^\d+\s+connections?$/i,
  /^\d+\s+followers?$/i,
  /^open to$/i,
  /^©\s*\d{4}/,         // © 2024
  /^status is (online|offline|away|busy)/i,
];

function _liIsNoise(line){
  if(!line||line.length===0) return true;
  if(_LI_NOISE_EXACT.has(line)) return true;
  if(_LI_NOISE_REGEX.some(r=>r.test(line))) return true;
  return false;
}

// Extract clean name from "HashirJunaidStatus is online" or "Hashir Junaid · 2nd"
function _liCleanName(str){
  if(!str) return '';
  return str
    .replace(/\s*Status\s+is\s+\w+.*/i,'')
    .replace(/\s*is\s+(online|offline|away|busy).*/i,'')
    .replace(/\s*·.*$/,'')
    .replace(/\s*\(.*\)$/,'')
    .replace(/\s*(1st|2nd|3rd|degree).*/i,'')
    .trim();
}

// Check if a line looks like a person's name
function _liIsName(str){
  if(!str||str.length<3||str.length>70) return false;
  if(/[@\d]/.test(str)||str.includes('.')||str.includes(',')) return false;
  const parts=str.trim().split(/\s+/).filter(Boolean);
  if(parts.length<2||parts.length>5) return false;
  if(!parts.every(p=>/^[A-ZÀ-ÜĀ-ɏ]/.test(p)||p.length<3)) return false;
  return true;
}

function parseLinkedIn(text){
  if(!text||text.length<50) return null;

  // ── STEP 1: De-contaminate ───────────────────────────────────────
  // If text contains sample/demo data (Alexandra Chen pattern), strip it
  // because user may have accidentally copied the resume builder page
  const SAMPLE_MARKERS=['Alexandra Chen','Apple Inc.','Airbnb','alexchen.io'];
  let workingText=text;
  if(SAMPLE_MARKERS.filter(m=>workingText.includes(m)).length>=2){
    // Find where the real LinkedIn profile starts — look for linkedin.com/in/ URL
    const liMatch=workingText.match(/linkedin\.com\/in\/([\w-]+)/i);
    if(liMatch){
      // Find that position and take text from before + after it (±2000 chars)
      const pos=workingText.indexOf(liMatch[0]);
      workingText=workingText.substring(Math.max(0,pos-800),Math.min(workingText.length,pos+4000));
    }
  }

  // ── STEP 2: Split, clean, and filter lines ──────────────────────
  const rawLines=workingText.split('\n').map(l=>l.trim()).filter(l=>l.length>0);

  // Handle concatenated lines like "Hashir JunaidStatus is online"
  // LinkedIn sometimes omits newlines between name and status
  const expanded=[];
  for(const line of rawLines){
    // Split on known concatenation points
    const split=line
      .replace(/(Status\s+is\s+\w+)/gi,'\n$1\n')
      .replace(/(Messaging|Compose message|You are on the messaging)/gi,'\n$1\n')
      .split('\n').map(l=>l.trim()).filter(l=>l.length>0);
    expanded.push(...split);
  }

  const cleanLines=expanded.map(l=>{
    // Clean name concatenations
    return l.replace(/\s*Status\s+is\s+\w+.*/i,'').replace(/\s*·\s*(1st|2nd|3rd)\s*$/i,'').trim();
  }).filter(l=>l.length>0);

  const lines=cleanLines.filter(l=>!_liIsNoise(l));

  // ── STEP 3: Extract LinkedIn URL first (most reliable anchor) ────
  const data={personalInfo:{},sections:blankSections()};
  const pi=data.personalInfo;
  for(const l of cleanLines){  // scan unfiltered for URLs
    const liM=l.match(/linkedin\.com\/in\/([\w-]+)/i);
    if(liM&&!pi.linkedin){pi.linkedin='linkedin.com/in/'+liM[1];}
    const ghM=l.match(/github\.com\/([\w-]+)/i);
    if(ghM&&!pi.github){pi.github='github.com/'+ghM[1];}
    const em=l.match(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i);
    if(em&&!pi.email){pi.email=em[0];}
    const ph=l.match(/(\+?\d[\d\s\-().]{7,18})/);
    if(ph&&ph[0].replace(/\D/g,'').length>=7&&!pi.phone){pi.phone=ph[0].trim();}
  }

  // ── STEP 4: Find name — multiple strategies ─────────────────────
  // Strategy A: first clean, name-like line in filtered set
  for(let i=0;i<Math.min(20,lines.length);i++){
    const cleaned=_liCleanName(lines[i]);
    if(_liIsName(cleaned)){pi.name=cleaned;break;}
  }
  // Strategy B: scan raw text for "FirstName LastName" before "Status is online"
  if(!pi.name){
    const m=workingText.match(/([A-ZÀÁÂÃÄÅ][a-zàáâãäå]+(?:\s+[A-ZÀÁÂÃÄÅ][a-zàáâãäå]+){1,3})\s*Status\s+is/i);
    if(m) pi.name=m[1].trim();
  }
  // Strategy C: extract from LinkedIn URL username
  if(!pi.name&&pi.linkedin){
    const slug=pi.linkedin.replace('linkedin.com/in/','').replace(/-\w{8,}$/,'');  // remove ID suffix
    pi.name=slug.split('-').map(w=>w[0]?.toUpperCase()+w.slice(1)).join(' ');
  }

  // ── STEP 5: Find title (headline) ───────────────────────────────
  if(pi.name){
    const nameIdx=lines.findIndex(l=>_liCleanName(l)===pi.name||l.includes(pi.name.split(' ')[0]));
    for(let i=Math.max(0,nameIdx);i<Math.min(nameIdx+8,lines.length);i++){
      const l=lines[i];
      if(l===pi.name||_liCleanName(l)===pi.name) continue;
      if(l.length>3&&l.length<140&&!l.includes('@')&&!l.match(/^\+?\d/)&&
         !l.match(/^\d{3,}/)&&!l.includes('linkedin.com')&&!_liIsNoise(l)){
        pi.title=l.replace(/\s+at\s+.+$/i,'').replace(/\s*·.*$/,'').trim();
        break;
      }
    }
  }

  // ── STEP 6: Find location ────────────────────────────────────────
  for(const l of lines){
    if(l.includes(',')&&l.length<60&&!l.includes('@')&&!l.includes('http')&&!pi.address){
      const clean=l.replace(/\s*·.*$/,'').trim();
      if(clean.split(',').length<=3&&!_liIsNoise(clean)){pi.address=clean;break;}
    }
  }

  // ── STEP 7: Section parsing ──────────────────────────────────────
  const SEC_MAP={
    'About':'summary','Summary':'summary',
    'Experience':'experience','Work Experience':'experience',
    'Education':'education',
    'Skills':'skills','Top Skills':'skills',
    'Certifications':'certifications',
    'Licenses & certifications':'certifications',
    'Licenses & Certifications':'certifications',
    'Licenses and certifications':'certifications',
    'Accomplishments':'achievements',
    'Honors & awards':'achievements','Honors & Awards':'achievements',
    'Awards':'achievements',
    'Volunteer experience':'experience',
    'Languages':'languages',
    'Projects':'projects',
    'Publications':'achievements',
    'Recommendations':'','Activity':'','Interests':'',
    'Featured':'',
  };
  const SKIP_IN_SECTION=new Set(['Show more','Show less','See all','Load more',
    'See credentials','Add','Edit','Endorsed','Others also endorsed']);

  let curSec='',curLines=[];
  const raw={};
  for(const line of lines){
    if(SEC_MAP.hasOwnProperty(line)){
      if(curSec&&curLines.length) raw[curSec]=(raw[curSec]||[]).concat(curLines);
      curSec=SEC_MAP[line]; curLines=[];
    } else if(curSec){
      if(!SKIP_IN_SECTION.has(line)&&!_liIsNoise(line)) curLines.push(line);
    }
  }
  if(curSec&&curLines.length) raw[curSec]=(raw[curSec]||[]).concat(curLines);

  // Apply sections — only if content has real data (not just noise)
  if(raw['summary']){
    const content=raw['summary'].filter(l=>l.length>15&&!_liIsNoise(l)).join(' ').trim();
    if(content.length>20){const s=data.sections.find(x=>x.id==='summary');if(s)s.content=content;}
  }
  if(raw['experience']&&raw['experience'].length) parseLinkedInExp(raw['experience'],data);
  if(raw['education']&&raw['education'].length) parseLinkedInEdu(raw['education'],data);
  if(raw['skills']&&raw['skills'].length){
    const sk=data.sections.find(x=>x.id==='skills');
    if(sk){
      const items=raw['skills'].filter(l=>l.length>1&&l.length<45&&!l.match(/^\d+/)&&!_liIsNoise(l)).slice(0,25);
      if(items.length) sk.content=items.join(', ');
    }
  }
  if(raw['certifications']&&raw['certifications'].length) parseLinkedInCerts(raw['certifications'],data);
  if(raw['achievements']&&raw['achievements'].length){
    const s=data.sections.find(x=>x.id==='achievements');
    if(s){const items=raw['achievements'].filter(l=>l.length>5&&!_liIsNoise(l)).slice(0,8);if(items.length)s.items=items;}
  }
  if(raw['languages']&&raw['languages'].length){
    const s=data.sections.find(x=>x.id==='languages');
    if(s){
      const lvlWords=['Native','Fluent','Professional','Intermediate','Elementary','Limited','Full professional','Native or bilingual'];
      const items=[];
      for(let i=0;i<raw['languages'].length;i++){
        const l=raw['languages'][i];
        if(l.length<35&&!lvlWords.some(w=>l.includes(w))&&!_liIsNoise(l)){
          const nextL=raw['languages'][i+1]||'';
          const level=lvlWords.find(w=>nextL.includes(w))||'Professional Working';
          items.push({lang:l,level});
          if(lvlWords.some(w=>nextL.includes(w)))i++;
        }
      }
      if(items.length) s.items=items;
    }
  }
  if(raw['projects']&&raw['projects'].length){
    const s=data.sections.find(x=>x.id==='projects');
    if(s){const items=parseCVProj(raw['projects'].join('\n'));if(items.length)s.items=items;}
  }

  // Return null only if we couldn't extract even a name
  return pi.name?data:null;
}

function parseLinkedInExp(lines,data){
  const items=[]; let i=0;
  while(i<lines.length){
    if(!lines[i]||lines[i].length>100){i++;continue;}
    const item={title:lines[i],company:'',location:'',start:'',end:'',current:false,desc:''};
    i++;
    if(lines[i]) item.company=lines[i].replace(/\s*·.*$/,'').trim(); i++;
    if(lines[i]&&(lines[i].match(/\d{4}/)||/present/i.test(lines[i]))){
      const d=parseDates(lines[i]); item.start=d.start; item.end=d.end; item.current=d.current; i++;
    }
    if(lines[i]&&lines[i].includes(',')&&lines[i].length<50){ item.location=lines[i]; i++; }
    const desc=[];
    while(i<lines.length&&lines[i]&&(lines[i].length>60||lines[i].startsWith('•')||lines[i].startsWith('-'))){
      desc.push(lines[i].startsWith('-')?'• '+lines[i].slice(1):lines[i]); i++;
    }
    item.desc=desc.join('\n');
    if(item.title) items.push(item);
  }
  const s=data.sections.find(x=>x.id==='experience');
  if(s&&items.length) s.items=items;
}

function parseLinkedInEdu(lines,data){
  const items=[]; let i=0;
  while(i<lines.length){
    if(!lines[i]||lines[i].length>120){i++;continue;}
    const item={degree:'',field:'',institution:lines[i],start:'',end:'',grade:''};
    i++;
    if(lines[i]&&!lines[i].match(/^\d{4}/)){
      const dl=lines[i];
      if(dl.includes('·')){const p=dl.split('·');item.degree=p[0].trim();item.field=p[1]?p[1].trim():'';}
      else if(dl.includes(' - ')){const p=dl.split(' - ');item.degree=p[0].trim();item.field=p[1]?p[1].trim():'';}
      else item.field=dl;
      i++;
    }
    if(lines[i]&&lines[i].match(/\d{4}/)){ const d=parseDates(lines[i]);item.start=d.start;item.end=d.end;i++; }
    if(item.institution) items.push(item);
  }
  const s=data.sections.find(x=>x.id==='education');
  if(s&&items.length) s.items=items;
}

function parseLinkedInCerts(lines,data){
  const items=[]; let i=0;
  while(i<lines.length){
    if(!lines[i]||lines[i].length>120||lines[i].match(/^\d{4}/)){i++;continue;}
    const item={name:lines[i],issuer:'',date:''};
    i++;
    if(lines[i]&&lines[i].length<80&&!lines[i].match(/^\d{4}/)){ item.issuer=lines[i]; i++; }
    if(lines[i]&&lines[i].match(/\d{4}/)){ item.date=lines[i].replace(/Issued\s*/i,'').trim(); i++; }
    if(item.name.length>3) items.push(item);
  }
  const s=data.sections.find(x=>x.id==='certifications');
  if(s&&items.length) s.items=items;
}

function parseDates(str){
  const r={start:'',end:'',current:false};
  if(!str) return r;
  r.current=/present|current|now/i.test(str);
  const m=str.match(/(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)?\s*\d{4}/gi)||[];
  if(m.length>=2){r.start=m[0].trim();r.end=r.current?'':m[1].trim();}
  else if(m.length===1) r.start=m[0].trim();
  return r;
}

// ─── OLD CV TEXT PARSER ──────────────────────────────────────────────────────
function parseCV(text){
  if(!text||text.length<50) return null;
  const lines = text.split('\n').map(l=>l.trim()).filter(l=>l.length>0);
  const data = { personalInfo:{}, sections: blankSections() };
  const pi = data.personalInfo;

  // Contact extraction — scan first 20 lines broadly
  for(let i=0;i<Math.min(20,lines.length);i++){
    const l=lines[i];
    // Name: first line with 2–4 words, no digits/symbols, title case
    if(!pi.name&&i<5&&l.length>2&&l.length<60&&!/[@\d]/.test(l)&&!l.includes('http')&&l.split(' ').filter(Boolean).length>=2)
      pi.name=l;
    // Email
    const em=l.match(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i);
    if(em&&!pi.email) pi.email=em[0];
    // Phone — various formats
    const ph=l.match(/(\+?\d[\d\s\-().]{7,18})/);
    if(ph&&ph[0].replace(/\D/g,'').length>=7&&!pi.phone) pi.phone=ph[0].trim();
    // LinkedIn
    const liM=l.match(/linkedin\.com\/(in\/[\w-]+|pub\/[\w-]+)/i);
    if(liM&&!pi.linkedin) pi.linkedin='linkedin.com/'+liM[1];
    // GitHub
    const ghM=l.match(/github\.com\/([\w-]+)/i);
    if(ghM&&!pi.github) pi.github='github.com/'+ghM[1];
    // Website
    const webM=l.match(/(?:https?:\/\/)?(?:www\.)?([\w-]+\.(com|io|dev|me|co)(?:\/[\w-]*)?)/i);
    if(webM&&!l.includes('linkedin')&&!l.includes('github')&&!pi.website) pi.website=webM[0].replace(/^https?:\/\//,'');
    // Location
    if(!pi.address&&l.includes(',')&&l.length<60&&i>0&&!/[@\d]/.test(l))
      pi.address=l;
  }

  // Detect title (line after name that looks like a job title)
  if(pi.name){
    const ni=lines.findIndex(l=>l===pi.name);
    if(ni>=0){
      for(let j=ni+1;j<Math.min(ni+4,lines.length);j++){
        const nx=lines[j];
        if(nx&&nx.length>2&&nx.length<90&&!nx.includes('@')&&!nx.match(/^\+?\d/)&&!nx.includes(',')&&nx.replace(/\D/g,'').length/nx.length<0.3){
          pi.title=nx; break;
        }
      }
    }
  }

  // Section header patterns — generous matching including ALLCAPS headers
  const SEC_PATTERNS={
    summary:/^(professional\s+)?summary$|^objective$|^profile$|^about(\s+me)?$|^career\s+summary$|^executive\s+summary$/i,
    experience:/^(work\s+|professional\s+)?experience$|^employment(\s+history)?$|^work\s+history$|^career\s+history$|^internship/i,
    education:/^education(al\s+(background|qualifications?))?$|^academic\s+(background|history)$|^qualifications?$|^degree/i,
    skills:/^(technical\s+|core\s+|key\s+|professional\s+)?skills?$|^competenc(y|ies)$|^expertise$|^technologies$|^tools?\s+&\s+tech/i,
    projects:/^(key\s+|selected\s+|notable\s+)?projects?$|^project\s+experience$|^portfolio$/i,
    certifications:/^certifications?$|^licenses?(\s*[&\/]\s*certifications?)?$|^credentials?$|^courses?\s+&\s+cert/i,
    achievements:/^achievements?$|^awards?(\s+&\s+honors?)?$|^accomplishments?$|^honors?(\s+[&\/]\s+awards?)?$|^recognition/i,
    languages:/^languages?(\s+spoken)?$/i,
    softskills:/^soft\s+skills?$|^interpersonal\s+skills?$|^personal\s+skills?$/i
  };

  const found=[];
  lines.forEach((l,i)=>{
    const clean=l.replace(/[:\-_*|]+$/,'').trim();
    for(const [id,pat] of Object.entries(SEC_PATTERNS)){
      if(pat.test(clean)||pat.test(clean.toLowerCase())){
        found.push({id,idx:i}); break;
      }
    }
  });

  found.forEach((sf,si)=>{
    const start=sf.idx+1;
    const end=si+1<found.length?found[si+1].idx:lines.length;
    const content=lines.slice(start,end).join('\n').trim();
    if(content) fillSecFromText(sf.id,content,data);
  });

  // If no sections found but text is long, try to fill summary from full text
  if(!found.length&&text.length>200){
    const sum=data.sections.find(s=>s.id==='summary');
    if(sum&&!sum.content){
      const sentences=text.replace(/\n+/g,' ').split(/[.!?]+/).filter(s=>s.trim().length>20);
      sum.content=sentences.slice(0,3).join('. ').trim()+(sentences.length>3?'..':'');
    }
  }

  return data;
}

function fillSecFromText(id,content,data){
  const sec=data.sections.find(s=>s.id===id);
  if(!sec||!content) return;
  if(id==='summary'){ sec.content=content.replace(/\n+/g,' ').trim(); }
  else if(id==='skills'||id==='softskills'){
    sec.content=content.split(/[,\n•\-|]/).map(s=>s.trim()).filter(s=>s.length>1&&s.length<40).join(', ');
  }
  else if(id==='experience'){
    const items=parseCVExp(content);
    if(items.length) sec.items=items;
  }
  else if(id==='education'){
    const items=parseCVEdu(content);
    if(items.length) sec.items=items;
  }
  else if(id==='certifications'){
    const items=parseCVCerts(content);
    if(items.length) sec.items=items;
  }
  else if(id==='achievements'){
    sec.items=content.split('\n').map(l=>l.replace(/^[•\-*]\s*/,'').trim()).filter(l=>l.length>5).slice(0,8);
  }
  else if(id==='languages'){
    sec.items=content.split('\n').map(l=>{
      const p=l.split(/[-:–]/); return {lang:p[0].trim(),level:p[1]?p[1].trim():'Professional Working'};
    }).filter(i=>i.lang.length>1&&i.lang.length<30).slice(0,6);
  }
  else if(id==='projects'){
    const items=parseCVProj(content);
    if(items.length) sec.items=items;
  }
}

function parseCVExp(text){
  const lines=text.split('\n').map(l=>l.trim()).filter(Boolean);
  const items=[];
  const dateRe=/(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)?\s*\d{4}\s*[-–—to]+\s*(?:Present|Current|Now|\d{4})/i;
  const dateOnlyRe=/\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{4}/i;
  let cur=null,desc=[];

  const saveCur=()=>{
    if(cur&&cur.title){cur.desc=desc.join('\n').trim();items.push(cur);desc=[];}
  };

  for(let i=0;i<lines.length;i++){
    const l=lines[i];
    if(dateRe.test(l)){
      if(cur){const d=parseDates(l);cur.start=d.start;cur.end=d.end;cur.current=d.current;}
      continue;
    }
    if(/^[•\-*→]/.test(l)||l.length>90){
      if(cur) desc.push(l.startsWith('-')||l.startsWith('*')||l.startsWith('→')?'• '+l.slice(1).trim():l);
      continue;
    }
    if(l.length>=3&&l.length<=85&&!l.includes('@')){
      // Check if next line is a date or a company (heuristic)
      const nextL=lines[i+1]||'';
      const nextIsDate=dateRe.test(nextL)||dateOnlyRe.test(nextL);
      const nextIsBullet=/^[•\-*→]/.test(nextL);
      // Treat as new job title if current has title already or items exist
      if(cur&&cur.title&&!cur.company&&!nextIsDate&&!nextIsBullet&&nextL.length<80&&nextL.length>1){
        // This line might be the company of cur
        cur.company=l; continue;
      }
      saveCur();
      cur={title:l,company:'',location:'',start:'',end:'',current:false,desc:''};
      // Peek at next line for company
      if(nextL&&!dateRe.test(nextL)&&!nextIsBullet&&nextL.length>1&&nextL.length<80&&!nextL.match(/^\d{4}/)){
        cur.company=nextL; i++;
      }
    }
  }
  saveCur();
  return items.slice(0,6);
}

function parseCVEdu(text){
  const lines=text.split('\n').map(l=>l.trim()).filter(Boolean);
  const items=[];
  for(let i=0;i<lines.length;){
    if(lines[i]&&lines[i].length>2&&lines[i].length<100){
      const it={degree:'',field:'',institution:lines[i],start:'',end:'',grade:''};
      i++;
      if(lines[i]&&!lines[i].match(/^\d{4}/)){
        const dl=lines[i];
        if(dl.includes('·')){const p=dl.split('·');it.degree=p[0].trim();it.field=p[1]?p[1].trim():'';}
        else it.degree=dl;
        i++;
      }
      if(lines[i]&&lines[i].match(/\d{4}/)){ const d=parseDates(lines[i]);it.start=d.start;it.end=d.end;i++; }
      if(it.institution) items.push(it);
    }else i++;
  }
  return items.slice(0,4);
}

function parseCVCerts(text){
  const lines=text.split('\n').map(l=>l.replace(/^[•\-*]\s*/,'').trim()).filter(l=>l.length>3);
  const items=[];
  for(let i=0;i<lines.length;){
    const l=lines[i];
    if(l.length<100&&!l.match(/^\d{4}/)){
      const it={name:l,issuer:'',date:''};
      i++;
      if(lines[i]&&lines[i].match(/\d{4}/)){ it.date=lines[i]; i++; }
      else if(lines[i]&&lines[i].length<60){ it.issuer=lines[i]; i++; }
      items.push(it);
    }else i++;
  }
  return items.slice(0,8);
}

function parseCVProj(text){
  const lines=text.split('\n').map(l=>l.trim()).filter(Boolean);
  const items=[];
  let cur=null,desc=[];
  for(const l of lines){
    if(/^[•\-*]/.test(l)){if(cur)desc.push(l.startsWith('-')?'• '+l.slice(1):l);}
    else if(l.length<60){
      if(cur){cur.desc=desc.join('\n');items.push(cur);desc=[];}
      cur={name:l,desc:'',tech:'',dates:'',link:''};
    }else if(cur){desc.push(l);}
  }
  if(cur){cur.desc=desc.join('\n');if(cur.name)items.push(cur);}
  return items.slice(0,5);
}

// ─── JOB DESCRIPTION MATCHER ─────────────────────────────────────────────────
function matchJob(resumeData, jdText){
  if(!jdText||jdText.length<20) return null;
  const resumeText = getResumeText(resumeData).toLowerCase();
  const keywords = extractKeywords(jdText);
  if(!keywords.length) return {score:50,found:[],missing:[],suggestions:['Enter a more detailed job description']};
  const found=[], missing=[];
  keywords.forEach(kw=>{ (resumeText.includes(kw.toLowerCase())?found:missing).push(kw); });
  const score = Math.min(100,Math.round((found.length/keywords.length)*100));
  const secs = resumeData.sections||[];
  const pi = resumeData.personalInfo||{};
  const suggestions=[];
  if(missing.length) suggestions.push(`Add missing keywords: ${missing.slice(0,5).join(', ')}`);
  if(!pi.linkedin) suggestions.push('Add your LinkedIn URL (+5 ATS points)');
  const sum=secs.find(s=>s.id==='summary');
  if(!sum||(sum.content||'').length<80) suggestions.push('Write a 100+ word professional summary');
  const exp=secs.find(s=>s.id==='experience');
  if(exp&&exp.items){
    const hasNums=exp.items.some(e=>/\d+%|\$[\d,]+|\d+\s*users|\d+\s*team/i.test(e.desc||''));
    if(!hasNums) suggestions.push('Add metrics to experience bullets (%, $, users, team size)');
  }
  return {score,found,missing:missing.slice(0,12),suggestions};
}

function extractKeywords(text){
  if(!text) return [];
  const kws=new Set();
  const re=/\b(JavaScript|TypeScript|Python|Java|Go|Rust|C#|PHP|Ruby|Swift|Kotlin|React|Vue|Angular|Next\.js|Node\.js|Express|Django|Flask|Spring|SQL|PostgreSQL|MySQL|MongoDB|Redis|Elasticsearch|AWS|Azure|GCP|Docker|Kubernetes|Terraform|CI\/CD|Git|REST|GraphQL|Microservices|Agile|Scrum|Jira|Figma|TensorFlow|PyTorch|Machine Learning|Deep Learning|NLP|Power\s?BI|Tableau|Excel|Salesforce|HubSpot|Selenium|Cypress|Linux|Bash|HTML|CSS|Tailwind|Bootstrap|Firebase|Leadership|Management|Communication|Stakeholder|Product\s?Management|Project\s?Management|DevOps|Analytics)\b/gi;
  let m;
  while((m=re.exec(text))!==null) kws.add(m[0]);
  return [...kws].slice(0,20);
}

function getResumeText(data){
  if(!data) return '';
  let t=Object.values(data.personalInfo||{}).join(' ');
  (data.sections||[]).forEach(s=>{
    t+=' '+(s.title||'')+' '+(s.content||'');
    (s.items||[]).forEach(it=>{ t+=' '+Object.values(it).join(' '); });
  });
  return t;
}

// ─── INTERVIEW QUESTIONS GENERATOR ──────────────────────────────────────────
function generateInterviewQs(resumeData, jdText){
  const pi=resumeData.personalInfo||{};
  const secs=resumeData.sections||[];
  const title=pi.title||'Professional';
  const key=normalizeJob(title);
  const expSec=secs.find(s=>s.id==='experience');
  const topRole=expSec&&expSec.items&&expSec.items[0]?expSec.items[0].title:title;
  const topCo=expSec&&expSec.items&&expSec.items[0]?expSec.items[0].company:'';
  const skillsSec=secs.find(s=>s.id==='skills');
  const sk=(skillsSec?(skillsSec.content||'').split(',').map(s=>s.trim()).filter(Boolean):[]);
  const jdKw=jdText?extractKeywords(jdText).slice(0,3):[];

  const roleQs={
    'software engineer':['Walk me through the architecture of the most complex system you have built.','How do you approach debugging a performance issue in production?','What is your process for ensuring code quality during code review?','Explain your experience with CI/CD and how you have improved deployment pipelines.'],
    'product manager':['How do you prioritize features when engineering resources are limited?','Walk me through a product decision you made using data.','How do you handle technical disagreements with the engineering team?','Tell me about a product launch that did not go as planned and what you learned.'],
    'data scientist':['Walk me through a complete ML project from data collection to deployment.','How do you handle class imbalance in classification problems?','How do you communicate complex model results to non-technical stakeholders?','What metrics would you use to evaluate a recommendation system?'],
    'frontend developer':['How do you approach cross-browser compatibility issues?','Explain your strategy for optimizing frontend performance.','How do you ensure your components are accessible?','Describe a challenging UI/UX problem you solved and your approach.'],
    'devops engineer':['Describe your experience designing a CI/CD pipeline from scratch.','How do you approach incident management and on-call response?','How have you reduced cloud costs at a previous employer?','Explain your approach to infrastructure security.'],
  };

  const generic=['Tell me about your most impactful achievement in the last 2 years.','Describe a time you had to deliver under an extremely tight deadline.','Tell me about a time you had to learn something new very quickly.','How do you prioritize when you have multiple competing deadlines?','Describe a situation where you disagreed with your manager. How did you handle it?','Where do you see yourself professionally in 3-5 years?','Why are you interested in this specific role and company?',`Walk me through a key challenge in your role as ${topRole}${topCo?' at '+topCo:''} and how you solved it.`];

  const specific=roleQs[key]||roleQs['software engineer'];
  const techQs=sk.slice(0,2).map((s,i)=>i===0?`How have you used ${s} professionally? Give a specific example.`:`What is the most advanced thing you have done with ${s}?`);
  const jdQs=jdKw.length?[`We heavily use ${jdKw[0]} — walk me through your experience with it.`]:[];

  const all=[...generic.slice(0,3),...specific.slice(0,4),...generic.slice(3,5),...techQs,...jdQs,...generic.slice(5)];
  return all.slice(0,12).map((q,i)=>`${i+1}. ${q}`).join('\n\n');
}

// ─── AI GENERATE FULL RESUME FROM SCRATCH ────────────────────────────────────
function generateFull(jobTitle, yearsExp){
  const key=normalizeJob(jobTitle||'software engineer');
  const job=JOBS[key]||JOBS['software engineer'];
  const meta=JOB_META[key]||{ss:'Communication, Teamwork, Problem Solving, Adaptability, Time Management',ef:'Business Administration'};
  const years=Math.max(1,parseInt(yearsExp)||3);
  const yr=new Date().getFullYear();
  const data={personalInfo:{name:'',title:toTitleCase(key),phone:'',email:'',address:'',linkedin:'',github:'',website:''},sections:blankSections()};

  // Summary
  const sum=data.sections.find(s=>s.id==='summary');
  if(sum) sum.content=job.summary.replace('{years}',years);

  // Technical Skills
  const sk=data.sections.find(s=>s.id==='skills');
  if(sk) sk.content=job.skills;

  // Work Experience — shuffle bullets, use first 4 for current job, next 3 for previous
  const shuffled=job.bullets.slice().sort(()=>Math.random()-.5);
  const expBullets1=shuffled.slice(0,4);
  const expBullets2=shuffled.slice(4,7);
  const achBullets=shuffled.slice(7,9); // achievements get DIFFERENT bullets, no overlap
  const exp=data.sections.find(s=>s.id==='experience');
  if(exp){
    const companies=['Tech Innovations Inc.','Digital Solutions Ltd.','NextGen Systems','Cloud Ventures','DataCorp','WebForge Ltd.','Nexus Tech','Bright Minds Co.','Apex Digital'];
    const locs=['New York, NY','San Francisco, CA','Austin, TX','Seattle, WA','Chicago, IL','Remote','London, UK'];
    const curStartYr=yr-Math.min(years,3);
    exp.items=[
      {title:toTitleCase(key),company:_r(companies),location:_r(locs),
        start:`Jan ${curStartYr}`,end:'Present',current:true,
        desc:expBullets1.map(b=>'• '+fill(b)).join('\n')},
      {title:(years>=5?'Mid-Level ':'Junior ')+toTitleCase(key),company:_r(companies),location:_r(locs),
        start:`Jan ${curStartYr-2}`,end:`Dec ${curStartYr-1}`,current:false,
        desc:(expBullets2.length?expBullets2:shuffled.slice(0,3)).map(b=>'• '+fill(b)).join('\n')}
    ];
  }

  // Education — use 'institution' field (matches cv-engine.js renderer)
  const edu=data.sections.find(s=>s.id==='education');
  if(edu){
    const gradYr=yr-years-1;
    const unis=["State University","National University of Technology","University of Applied Sciences","Metropolitan University","Tech & Business Institute"];
    edu.items=[{degree:"Bachelor's Degree",field:meta.ef,institution:_r(unis),location:'',start:String(gradYr-3),end:String(gradYr),grade:'',visible:true}];
  }

  // Soft Skills
  const ssec=data.sections.find(s=>s.id==='softskills');
  if(ssec) ssec.content=meta.ss;

  // Languages
  const lang=data.sections.find(s=>s.id==='languages');
  if(lang) lang.items=[{lang:'English',level:'Professional Proficiency'}];

  // Achievements — bullets NOT used in experience (picked from end of shuffled pool)
  const ach=data.sections.find(s=>s.id==='achievements');
  if(ach){
    const pool=achBullets.length?achBullets:shuffled.slice(8,10);
    ach.items=pool.map(b=>fill(b));
  }

  // Projects — hide when no real data (user should fill manually)
  const proj=data.sections.find(s=>s.id==='projects');
  if(proj) proj.visible=false;

  // Certifications — hide when no real data
  const cert=data.sections.find(s=>s.id==='certifications');
  if(cert) cert.visible=false;

  return data;
}

// ─── BLANK DATA HELPERS ──────────────────────────────────────────────────────
function blankSections(){
  return [
    {id:'summary',title:'Professional Summary',icon:'📋',type:'text',visible:true,order:0,content:''},
    {id:'experience',title:'Work Experience',icon:'💼',type:'experience',visible:true,order:1,items:[]},
    {id:'education',title:'Education',icon:'🎓',type:'education',visible:true,order:2,items:[]},
    {id:'skills',title:'Technical Skills',icon:'⚙️',type:'skills',visible:true,order:3,content:''},
    {id:'projects',title:'Projects',icon:'🚀',type:'projects',visible:true,order:4,items:[]},
    {id:'certifications',title:'Certifications',icon:'🏅',type:'certifications',visible:true,order:5,items:[]},
    {id:'achievements',title:'Achievements',icon:'🏆',type:'achievements',visible:true,order:6,items:[]},
    {id:'softskills',title:'Soft Skills',icon:'🤝',type:'skills',visible:true,order:7,content:''},
    {id:'languages',title:'Languages',icon:'🌐',type:'languages',visible:true,order:8,items:[]}
  ];
}

function getBlankData(){
  return {personalInfo:{name:'',title:'',phone:'',email:'',address:'',linkedin:'',github:'',website:''},sections:blankSections()};
}

return {generateBullets,generateSummary,generateCoverLetter,parseLinkedIn,parseLinkedInJsonLd,parseCV,matchJob,generateInterviewQs,generateFull,extractKeywords,getBlankData,blankSections};
})();
