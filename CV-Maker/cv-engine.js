/* AxonCV Rendering Engine — Axon Systems */

const TEMPLATES=[
  {id:1,n:"Classic Pro",cat:"classic",lay:"classic",p:"#000000",s:"#f5f5f5",a:"#000000",font:"Arial, sans-serif"},
  {id:2,n:"Navy Executive",cat:"classic",lay:"classic",p:"#1a3a5c",s:"#eaf2ff",a:"#1a3a5c",font:"Georgia, serif"},
  {id:3,n:"Forest Classic",cat:"classic",lay:"classic",p:"#1a4731",s:"#f0fdf4",a:"#1a4731",font:"Arial, sans-serif"},
  {id:4,n:"Crimson Classic",cat:"classic",lay:"classic",p:"#7b1c1c",s:"#fff5f5",a:"#7b1c1c",font:"Georgia, serif"},
  {id:5,n:"Royal Purple",cat:"classic",lay:"classic",p:"#4c1d95",s:"#f5f3ff",a:"#4c1d95",font:"Arial, sans-serif"},
  {id:6,n:"Steel Gray",cat:"classic",lay:"classic",p:"#374151",s:"#f9fafb",a:"#374151",font:"Arial, sans-serif"},
  {id:7,n:"Ocean Teal",cat:"classic",lay:"classic",p:"#0d4e4e",s:"#f0fdfa",a:"#0d4e4e",font:"Georgia, serif"},
  {id:8,n:"Walnut Brown",cat:"classic",lay:"classic",p:"#78350f",s:"#fffbeb",a:"#78350f",font:"Georgia, serif"},
  {id:9,n:"Midnight Pro",cat:"modern",lay:"sidebar-left",p:"#1a1a2e",s:"#e2e8f0",a:"#00d4ff",font:"Arial, sans-serif"},
  {id:10,n:"Azure Pro",cat:"modern",lay:"sidebar-left",p:"#1e3a5f",s:"#ebf4ff",a:"#3182ce",font:"Arial, sans-serif"},
  {id:11,n:"Emerald Pro",cat:"modern",lay:"sidebar-left",p:"#14532d",s:"#f0fdf4",a:"#16a34a",font:"Arial, sans-serif"},
  {id:12,n:"Crimson Modern",cat:"modern",lay:"sidebar-left",p:"#7f1d1d",s:"#fff1f2",a:"#dc2626",font:"Arial, sans-serif"},
  {id:13,n:"Violet Modern",cat:"modern",lay:"sidebar-left",p:"#4c1d95",s:"#f5f3ff",a:"#7c3aed",font:"Arial, sans-serif"},
  {id:14,n:"Charcoal Pro",cat:"modern",lay:"sidebar-left",p:"#111827",s:"#f9fafb",a:"#6b7280",font:"Arial, sans-serif"},
  {id:15,n:"Pacific Blue",cat:"modern",lay:"sidebar-left",p:"#0c4a6e",s:"#e0f2fe",a:"#0284c7",font:"Arial, sans-serif"},
  {id:16,n:"Clean Split",cat:"professional",lay:"sidebar-right",p:"#1e293b",s:"#f8fafc",a:"#0ea5e9",font:"Arial, sans-serif"},
  {id:17,n:"Corporate Edge",cat:"professional",lay:"sidebar-right",p:"#1e3a5f",s:"#f0f7ff",a:"#2563eb",font:"Georgia, serif"},
  {id:18,n:"Green Edge",cat:"professional",lay:"sidebar-right",p:"#14532d",s:"#f0fdf4",a:"#15803d",font:"Arial, sans-serif"},
  {id:19,n:"Plum Edge",cat:"professional",lay:"sidebar-right",p:"#581c87",s:"#faf5ff",a:"#9333ea",font:"Arial, sans-serif"},
  {id:20,n:"Slate Edge",cat:"professional",lay:"sidebar-right",p:"#374151",s:"#f9fafb",a:"#4b5563",font:"Arial, sans-serif"},
  {id:21,n:"Teal Edge",cat:"professional",lay:"sidebar-right",p:"#134e4a",s:"#f0fdfa",a:"#0d9488",font:"Arial, sans-serif"},
  {id:22,n:"Bold Navy",cat:"modern",lay:"bold-header",p:"#1e3a5f",s:"#dbeafe",a:"#93c5fd",font:"Arial, sans-serif"},
  {id:23,n:"Bold Black",cat:"modern",lay:"bold-header",p:"#111111",s:"#f3f4f6",a:"#ffffff",font:"Arial, sans-serif"},
  {id:24,n:"Bold Emerald",cat:"modern",lay:"bold-header",p:"#14532d",s:"#dcfce7",a:"#86efac",font:"Arial, sans-serif"},
  {id:25,n:"Bold Violet",cat:"modern",lay:"bold-header",p:"#4c1d95",s:"#f5f3ff",a:"#ddd6fe",font:"Arial, sans-serif"},
  {id:26,n:"Bold Crimson",cat:"modern",lay:"bold-header",p:"#991b1b",s:"#fee2e2",a:"#fecaca",font:"Arial, sans-serif"},
  {id:27,n:"Bold Teal",cat:"modern",lay:"bold-header",p:"#134e4a",s:"#ccfbf1",a:"#99f6e4",font:"Arial, sans-serif"},
  {id:28,n:"Bold Indigo",cat:"modern",lay:"bold-header",p:"#312e81",s:"#e0e7ff",a:"#c7d2fe",font:"Arial, sans-serif"},
  {id:29,n:"Timeline Blue",cat:"creative",lay:"timeline",p:"#1e3a5f",s:"#93c5fd",a:"#2563eb",font:"Arial, sans-serif"},
  {id:30,n:"Timeline Dark",cat:"creative",lay:"timeline",p:"#111827",s:"#6b7280",a:"#374151",font:"Arial, sans-serif"},
  {id:31,n:"Timeline Green",cat:"creative",lay:"timeline",p:"#14532d",s:"#86efac",a:"#16a34a",font:"Arial, sans-serif"},
  {id:32,n:"Timeline Purple",cat:"creative",lay:"timeline",p:"#4c1d95",s:"#c4b5fd",a:"#7c3aed",font:"Arial, sans-serif"},
  {id:33,n:"Timeline Rose",cat:"creative",lay:"timeline",p:"#881337",s:"#fda4af",a:"#e11d48",font:"Arial, sans-serif"},
  {id:34,n:"Pure Minimal",cat:"minimal",lay:"minimal",p:"#111111",s:"#e5e7eb",a:"#111111",font:"Arial, sans-serif"},
  {id:35,n:"Nordic Blue",cat:"minimal",lay:"minimal",p:"#1e3a5f",s:"#dbeafe",a:"#1e3a5f",font:"Arial, sans-serif"},
  {id:36,n:"Sage Minimal",cat:"minimal",lay:"minimal",p:"#1a4731",s:"#dcfce7",a:"#1a4731",font:"Arial, sans-serif"},
  {id:37,n:"Plum Minimal",cat:"minimal",lay:"minimal",p:"#4c1d95",s:"#f5f3ff",a:"#4c1d95",font:"Arial, sans-serif"},
  {id:38,n:"Swiss Red",cat:"minimal",lay:"minimal",p:"#c53030",s:"#fee2e2",a:"#c53030",font:"Arial, sans-serif"},
  {id:39,n:"Zen Gray",cat:"minimal",lay:"minimal",p:"#374151",s:"#f3f4f6",a:"#374151",font:"Arial, sans-serif"},
  {id:40,n:"Gold Executive",cat:"executive",lay:"executive",p:"#78350f",s:"#fef3c7",a:"#d97706",font:"Georgia, serif"},
  {id:41,n:"Platinum Pro",cat:"executive",lay:"executive",p:"#1f2937",s:"#f3f4f6",a:"#6b7280",font:"Georgia, serif"},
  {id:42,n:"Royal Executive",cat:"executive",lay:"executive",p:"#1e3a5f",s:"#dbeafe",a:"#1d4ed8",font:"Georgia, serif"},
  {id:43,n:"Emerald Exec",cat:"executive",lay:"executive",p:"#14532d",s:"#dcfce7",a:"#15803d",font:"Georgia, serif"},
  {id:44,n:"Crimson Exec",cat:"executive",lay:"executive",p:"#7f1d1d",s:"#fee2e2",a:"#dc2626",font:"Georgia, serif"},
  {id:45,n:"Creative Burst",cat:"creative",lay:"creative",p:"#7c3aed",s:"#ede9fe",a:"#f59e0b",font:"Arial, sans-serif"},
  {id:46,n:"Tech Modern",cat:"creative",lay:"creative",p:"#0369a1",s:"#e0f2fe",a:"#06b6d4",font:"Arial, sans-serif"},
  {id:47,n:"Bold Creative",cat:"creative",lay:"creative",p:"#111827",s:"#f3f4f6",a:"#f59e0b",font:"Arial, sans-serif"},
  {id:48,n:"Rose Creative",cat:"creative",lay:"creative",p:"#881337",s:"#fff1f2",a:"#fb7185",font:"Arial, sans-serif"},
  {id:49,n:"Digital Cyan",cat:"creative",lay:"creative",p:"#164e63",s:"#cffafe",a:"#22d3ee",font:"Arial, sans-serif"},
  {id:50,n:"Vibrant Studio",cat:"creative",lay:"creative",p:"#4c1d95",s:"#faf5ff",a:"#f59e0b",font:"Arial, sans-serif"},
];

/* Default fake data shown in template previews */
const PREVIEW_DATA = {
  personalInfo:{
    name:"Alexandra Chen",
    title:"Senior Product Manager",
    phone:"+1 (628) 555-0198",
    email:"alex.chen@email.com",
    address:"San Francisco, CA 94105",
    linkedin:"linkedin.com/in/alex-chen",
    github:"github.com/alexchen",
    website:"alexchen.io"
  },
  sections:[
    {id:"summary",title:"Professional Summary",icon:"📋",type:"text",visible:true,order:0,
     content:"Strategic Product Manager with 6+ years leading cross-functional teams at Apple and Airbnb. Expert in user research, data analytics, and agile product development. Delivered products used by 50M+ users globally with consistent track record of 30–40% metric improvements. Passionate about building products that solve real problems at scale."},
    {id:"experience",title:"Work Experience",icon:"💼",type:"experience",visible:true,order:1,items:[
      {title:"Senior Product Manager",company:"Apple Inc.",location:"Cupertino, CA",start:"Mar 2021",end:"Present",current:true,
       desc:"• Led development of 3 flagship iOS features reaching 50M+ active users\n• Increased user retention by 34% through data-driven UX redesign initiative\n• Managed cross-functional team of 12 engineers, designers, and data scientists\n• Delivered $25M revenue impact through monetization optimization strategies"},
      {title:"Product Manager",company:"Airbnb",location:"San Francisco, CA",start:"Jun 2019",end:"Feb 2021",current:false,
       desc:"• Launched host analytics dashboard increasing host satisfaction score by 42%\n• Conducted 200+ user interviews to define and refine 2-year product roadmap\n• Managed A/B testing program driving key improvements across 5 product areas\n• Delivered $8M incremental revenue impact in first year of launch"}
    ]},
    {id:"education",title:"Education",icon:"🎓",type:"education",visible:true,order:2,items:[
      {degree:"Master of Business Administration",field:"Technology & Strategy",institution:"Stanford Graduate School of Business",location:"Stanford, CA",start:"2017",end:"2019",grade:"GPA: 3.9/4.0 — Beta Gamma Sigma Honor Society"},
      {degree:"B.S. Computer Science",field:"Human-Computer Interaction",institution:"University of California, Berkeley",location:"Berkeley, CA",start:"2013",end:"2017",grade:"Magna Cum Laude — GPA: 3.85/4.0"}
    ]},
    {id:"skills",title:"Technical Skills",icon:"⚙️",type:"skills",visible:true,order:3,
     content:"Product Strategy, User Research, SQL, Python, Figma, Tableau, Amplitude, Agile/Scrum, A/B Testing, Roadmapping, Data Analysis, Stakeholder Management, Go-to-Market Strategy, OKRs"},
    {id:"projects",title:"Projects",icon:"🚀",type:"projects",visible:true,order:4,items:[
      {name:"AI-Powered Search Optimization",desc:"• Improved search relevance by 28% using ML ranking models\n• Reduced zero-result searches from 12% to 4% across platform\n• Increased search-to-booking conversion by 19%",tech:"Python, TensorFlow, Elasticsearch",link:"github.com/alexchen/ai-search",dates:"2023"},
      {name:"Mobile App Redesign",desc:"• Led complete redesign of core mobile experience\n• Increased DAU by 15% post-launch\n• Reduced onboarding drop-off by 40%",tech:"Figma, React Native, Firebase",link:"alexchen.io/case-study",dates:"2022"}
    ]},
    {id:"certifications",title:"Certifications",icon:"🏅",type:"certifications",visible:true,order:5,items:[
      {name:"Google Analytics Certified",issuer:"Google",date:"2023"},
      {name:"Certified Scrum Product Owner (CSPO)",issuer:"Scrum Alliance",date:"2022"},
      {name:"AWS Cloud Practitioner",issuer:"Amazon Web Services",date:"2023"}
    ]},
    {id:"achievements",title:"Achievements",icon:"🏆",type:"achievements",visible:true,order:6,items:[
      "Forbes 30 Under 30 — Technology Category (2023)",
      "Apple Internal Innovation Award — Best New Feature Launch (2022)",
      "Speaker — ProductCon 2022: 'Building Products for 50M Users'",
      "Top 1% Product Manager — Glassdoor Recognition (2021)"
    ]},
    {id:"softskills",title:"Soft Skills",icon:"🤝",type:"skills",visible:true,order:7,
     content:"Strategic Thinking, Leadership, Communication, Problem Solving, Stakeholder Management, Mentoring, Team Collaboration"},
    {id:"languages",title:"Languages",icon:"🌐",type:"languages",visible:true,order:8,items:[
      {lang:"English",level:"Native"},
      {lang:"Mandarin Chinese",level:"Professional"},
      {lang:"French",level:"Elementary"}
    ]}
  ]
};

/* Default style */
const DEFAULT_STYLE = { font:"Arial, sans-serif", fontSize:10, lineH:1.4, pad:0.4 };

/* Helpers */
function H(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function BL(s){
  if(!s) return '';
  return String(s).split('\n').map(l=>l.trim()).filter(Boolean).map(l=>
    l.startsWith('•')?`<div style="margin:2px 0 2px 14px;text-indent:-14px">${H(l)}</div>`:`<div style="margin:2px 0">${H(l)}</div>`
  ).join('');
}
function getSecs(data){
  return [...(data.sections||[])].filter(s=>s.visible!==false).sort((a,b)=>(a.order||0)-(b.order||0));
}
function getPI(data){ return data.personalInfo||{}; }

/* Main render dispatcher */
function renderCV(data, tpl, style){
  const s = style||DEFAULT_STYLE;
  const t = tpl||TEMPLATES[0];
  switch(t.lay){
    case'classic': return renderClassic(data,t,s);
    case'sidebar-left': return renderSidebarLeft(data,t,s);
    case'sidebar-right': return renderSidebarRight(data,t,s);
    case'bold-header': return renderBoldHeader(data,t,s);
    case'timeline': return renderTimeline(data,t,s);
    case'minimal': return renderMinimal(data,t,s);
    case'executive': return renderExecutive(data,t,s);
    case'creative': return renderCreative(data,t,s);
    default: return renderClassic(data,t,s);
  }
}

/* =================== LAYOUT 1: CLASSIC =================== */
function renderClassic(data,t,s){
  const pi=getPI(data), p=t.p, ff=t.font||s.font, fs=s.fontSize, lh=s.lineH, pad=s.pad;
  const secs=getSecs(data);
  let o=`<div style="font-family:${ff};font-size:${fs}pt;line-height:${lh};color:#1a1a1a;width:100%;padding:${pad}in;box-sizing:border-box;background:#fff;">
    <div style="text-align:center;border-bottom:2.5px solid ${p};padding-bottom:10px;margin-bottom:13px;">
      <div style="font-size:${fs+9}pt;font-weight:700;color:${p};letter-spacing:-.3px;margin-bottom:3px">${H(pi.name||'Your Name')}</div>
      <div style="font-size:${fs+.5}pt;color:#444;margin-bottom:4px">${H(pi.title||'Professional Title')}</div>
      <div style="font-size:${fs-1}pt;color:#666">${[pi.phone,pi.email,pi.address].filter(Boolean).map(H).join(' <span style="color:'+p+'">|</span> ')}</div>
      ${(pi.linkedin||pi.github)?`<div style="font-size:${fs-1}pt;color:#666;margin-top:2px">${[pi.linkedin,pi.github].filter(Boolean).map(H).join(' <span style="color:'+p+'">|</span> ')}</div>`:''}
    </div>`;
  secs.forEach(sec=>{o+=renderSec(sec,t,s,'classic');});
  return o+'</div>';
}

/* =================== LAYOUT 2: SIDEBAR LEFT =================== */
function renderSidebarLeft(data,t,s){
  const pi=getPI(data), p=t.p, ff=t.font||s.font, fs=s.fontSize, lh=s.lineH;
  const sbIds=['skills','softskills','languages','certifications','achievements'];
  const allSecs=getSecs(data);
  const mainSecs=allSecs.filter(x=>!sbIds.includes(x.id));
  const sideSecs=allSecs.filter(x=>sbIds.includes(x.id));
  let o=`<div style="font-family:${ff};font-size:${fs}pt;line-height:${lh};display:flex;width:100%;min-height:1123px;box-sizing:border-box;background:#fff;">
    <div style="width:33%;background:${p};color:#fff;padding:.35in .22in;box-sizing:border-box;flex-shrink:0;">
      <div style="font-size:${fs+7}pt;font-weight:800;color:#fff;margin-bottom:4px;word-break:break-word">${H(pi.name||'')}</div>
      <div style="font-size:${fs}pt;color:rgba(255,255,255,.8);margin-bottom:12px;font-weight:500;border-bottom:1px solid rgba(255,255,255,.25);padding-bottom:10px">${H(pi.title||'')}</div>
      <div style="font-size:${fs-1.5}pt;margin-bottom:12px">
        ${pi.phone?`<div style="margin-bottom:4px;color:rgba(255,255,255,.85)">📞 ${H(pi.phone)}</div>`:''}
        ${pi.email?`<div style="margin-bottom:4px;color:rgba(255,255,255,.85)">✉ ${H(pi.email)}</div>`:''}
        ${pi.address?`<div style="margin-bottom:4px;color:rgba(255,255,255,.85)">📍 ${H(pi.address)}</div>`:''}
        ${pi.linkedin?`<div style="margin-bottom:4px;color:rgba(255,255,255,.75)">🔗 ${H(pi.linkedin)}</div>`:''}
        ${pi.github?`<div style="margin-bottom:4px;color:rgba(255,255,255,.75)">💻 ${H(pi.github)}</div>`:''}
      </div>
      ${sideSecs.map(sec=>renderSidebarSec(sec,t,s)).join('')}
    </div>
    <div style="flex:1;padding:.35in .28in;box-sizing:border-box;min-width:0;">`;
  mainSecs.forEach(sec=>{o+=renderSec(sec,t,s,'classic');});
  return o+'</div></div>';
}

/* =================== LAYOUT 3: SIDEBAR RIGHT =================== */
function renderSidebarRight(data,t,s){
  const pi=getPI(data), p=t.p, ff=t.font||s.font, fs=s.fontSize, lh=s.lineH;
  const sbIds=['skills','softskills','languages','certifications'];
  const allSecs=getSecs(data);
  const mainSecs=allSecs.filter(x=>!sbIds.includes(x.id));
  const sideSecs=allSecs.filter(x=>sbIds.includes(x.id));
  let o=`<div style="font-family:${ff};font-size:${fs}pt;line-height:${lh};display:flex;width:100%;min-height:1123px;box-sizing:border-box;background:#fff;">
    <div style="flex:1;padding:.35in .28in;box-sizing:border-box;min-width:0;">
      <div style="border-bottom:2.5px solid ${p};padding-bottom:9px;margin-bottom:12px;">
        <div style="font-size:${fs+9}pt;font-weight:800;color:${p}">${H(pi.name||'')}</div>
        <div style="font-size:${fs+.5}pt;color:#555;margin-top:2px">${H(pi.title||'')}</div>
        <div style="font-size:${fs-1}pt;color:#777;margin-top:3px">${[pi.phone,pi.email,pi.address].filter(Boolean).map(H).join('  ·  ')}</div>
      </div>`;
  mainSecs.forEach(sec=>{o+=renderSec(sec,t,s,'classic');});
  o+=`</div>
    <div style="width:30%;background:${t.s||'#f8fafc'};border-left:2px solid ${p};padding:.35in .2in;box-sizing:border-box;flex-shrink:0;">
      ${sideSecs.map(sec=>renderSidebarSec(sec,t,s,'light')).join('')}
    </div>
  </div>`;
  return o;
}

/* =================== LAYOUT 4: BOLD HEADER =================== */
function renderBoldHeader(data,t,s){
  const pi=getPI(data), p=t.p, ff=t.font||s.font, fs=s.fontSize, lh=s.lineH, pad=s.pad;
  const secs=getSecs(data);
  let o=`<div style="font-family:${ff};font-size:${fs}pt;line-height:${lh};color:#1a1a1a;width:100%;box-sizing:border-box;background:#fff;">
    <div style="background:${p};padding:.32in ${pad}in .26in;">
      <div style="font-size:${fs+11}pt;font-weight:800;color:#fff;letter-spacing:-.5px;margin-bottom:4px">${H(pi.name||'')}</div>
      <div style="font-size:${fs+1}pt;color:rgba(255,255,255,.85);margin-bottom:6px">${H(pi.title||'')}</div>
      <div style="font-size:${fs-1}pt;color:rgba(255,255,255,.7)">${[pi.phone,pi.email,pi.address].filter(Boolean).map(H).join('  ·  ')}</div>
      ${(pi.linkedin||pi.github)?`<div style="font-size:${fs-1}pt;color:rgba(255,255,255,.65);margin-top:2px">${[pi.linkedin,pi.github].filter(Boolean).map(H).join('  ·  ')}</div>`:''}
    </div>
    <div style="padding:${pad}in;padding-top:14px">`;
  secs.forEach(sec=>{o+=renderSec(sec,t,s,'classic');});
  return o+'</div></div>';
}

/* =================== LAYOUT 5: TIMELINE =================== */
function renderTimeline(data,t,s){
  const pi=getPI(data), p=t.p, ff=t.font||s.font, fs=s.fontSize, lh=s.lineH, pad=s.pad;
  const secs=getSecs(data);
  let o=`<div style="font-family:${ff};font-size:${fs}pt;line-height:${lh};color:#1a1a1a;width:100%;padding:${pad}in;box-sizing:border-box;background:#fff;">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;border-bottom:3px solid ${p};padding-bottom:10px;margin-bottom:14px;">
      <div>
        <div style="font-size:${fs+11}pt;font-weight:800;color:${p};letter-spacing:-.5px">${H(pi.name||'')}</div>
        <div style="font-size:${fs+.5}pt;color:#555;margin-top:2px">${H(pi.title||'')}</div>
      </div>
      <div style="font-size:${fs-1.5}pt;color:#777;text-align:right;line-height:1.6">
        ${[pi.phone,pi.email].filter(Boolean).map(H).join('<br>')}
        ${pi.linkedin?H(pi.linkedin):''}${pi.github?'<br>'+H(pi.github):''}
      </div>
    </div>`;
  secs.forEach(sec=>{o+=renderSec(sec,t,s,'timeline');});
  return o+'</div>';
}

/* =================== LAYOUT 6: MINIMAL =================== */
function renderMinimal(data,t,s){
  const pi=getPI(data), p=t.p, ff=t.font||s.font, fs=s.fontSize, lh=s.lineH, pad=s.pad;
  const secs=getSecs(data);
  let o=`<div style="font-family:${ff};font-size:${fs}pt;line-height:${lh};color:#2a2a2a;width:100%;padding:${pad+.05}in;box-sizing:border-box;background:#fff;">
    <div style="margin-bottom:22px;">
      <div style="font-size:${fs+13}pt;font-weight:200;letter-spacing:4px;text-transform:uppercase;color:#111;margin-bottom:3px">${H(pi.name||'')}</div>
      <div style="width:56px;height:2px;background:${p};margin:6px 0 8px"></div>
      <div style="font-size:${fs}pt;color:#888;margin-bottom:5px">${H(pi.title||'')}</div>
      <div style="font-size:${fs-1}pt;color:#aaa">${[pi.phone,pi.email,pi.address].filter(Boolean).map(H).join('  ·  ')}</div>
      ${(pi.linkedin||pi.github)?`<div style="font-size:${fs-1}pt;color:#bbb;margin-top:2px">${[pi.linkedin,pi.github].filter(Boolean).map(H).join('  ·  ')}</div>`:''}
    </div>`;
  secs.forEach(sec=>{o+=renderSec(sec,t,s,'minimal');});
  return o+'</div>';
}

/* =================== LAYOUT 7: EXECUTIVE =================== */
function renderExecutive(data,t,s){
  const pi=getPI(data), p=t.p, ff=t.font||s.font, fs=s.fontSize, lh=s.lineH, pad=s.pad;
  const secs=getSecs(data);
  let o=`<div style="font-family:${ff};font-size:${fs}pt;line-height:${lh};color:#1a1a1a;width:100%;border:3px solid ${p};box-sizing:border-box;background:#fff;">
    <div style="background:${p};padding:.28in ${pad}in .24in;color:#fff">
      <div style="font-size:${fs+11}pt;font-weight:800;letter-spacing:-.5px;margin-bottom:4px">${H(pi.name||'')}</div>
      <div style="font-size:${fs+.5}pt;opacity:.9">${H(pi.title||'')}</div>
    </div>
    <div style="background:${t.s||'#f9f9f9'};padding:6px ${pad}in;border-bottom:2px solid ${p};">
      <div style="font-size:${fs-1}pt;color:#555">${[pi.phone,pi.email,pi.address,pi.linkedin,pi.github].filter(Boolean).map(H).join('  ·  ')}</div>
    </div>
    <div style="padding:${pad}in;padding-top:13px">`;
  secs.forEach(sec=>{o+=renderSec(sec,t,s,'executive');});
  return o+'</div></div>';
}

/* =================== LAYOUT 8: CREATIVE =================== */
function renderCreative(data,t,s){
  const pi=getPI(data), p=t.p, a=t.a||p, ff=t.font||s.font, fs=s.fontSize, lh=s.lineH, pad=s.pad;
  const secs=getSecs(data);
  let o=`<div style="font-family:${ff};font-size:${fs}pt;line-height:${lh};color:#1a1a1a;width:100%;box-sizing:border-box;background:#fff;">
    <div style="display:flex;background:${p};padding:.3in ${pad}in .26in;align-items:center;gap:18px">
      <div style="flex:1">
        <div style="font-size:${fs+10}pt;font-weight:800;color:#fff;letter-spacing:-.5px;margin-bottom:3px">${H(pi.name||'')}</div>
        <div style="width:40px;height:3px;background:${a};margin:5px 0 6px;border-radius:2px"></div>
        <div style="font-size:${fs}pt;color:rgba(255,255,255,.82);margin-bottom:5px">${H(pi.title||'')}</div>
        <div style="font-size:${fs-1}pt;color:rgba(255,255,255,.62)">${[pi.phone,pi.email,pi.address].filter(Boolean).map(H).join('  ·  ')}</div>
        ${(pi.linkedin||pi.github)?`<div style="font-size:${fs-1}pt;color:rgba(255,255,255,.55);margin-top:2px">${[pi.linkedin,pi.github].filter(Boolean).map(H).join('  ·  ')}</div>`:''}
      </div>
    </div>
    <div style="padding:${pad}in;padding-top:14px">`;
  secs.forEach(sec=>{o+=renderSec(sec,t,s,'creative');});
  return o+'</div></div>';
}

/* =================== SECTION RENDERER =================== */
function renderSec(sec,t,s,mode){
  if(!sec||sec.visible===false) return '';
  const p=t.p, fs=s.fontSize;

  const titleStyle={
    'classic':`font-size:${fs}pt;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:${p};border-bottom:1.5px solid ${p};padding-bottom:3px;margin:12px 0 7px`,
    'timeline':`font-size:${fs}pt;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:${p};border-bottom:2.5px solid ${p};padding-bottom:3px;margin:12px 0 7px`,
    'minimal':`font-size:${fs-1}pt;font-weight:400;text-transform:uppercase;letter-spacing:3.5px;color:${p};margin:16px 0 9px`,
    'executive':`font-size:${fs}pt;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:${p};border-bottom:1.5px solid ${p};padding-bottom:3px;margin:11px 0 7px`,
    'creative':`font-size:${fs}pt;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:${p};display:flex;align-items:center;gap:8px;margin:13px 0 7px`
  };
  const ts=titleStyle[mode]||titleStyle['classic'];
  const dot=mode==='creative'?`<span style="width:6px;height:6px;background:${t.a||p};border-radius:50%;flex-shrink:0;display:inline-block"></span>`:'';

  let o=`<div style="margin-bottom:4px"><div style="${ts}">${dot}${H(sec.title)}</div>`;

  if(sec.type==='text'||sec.type==='skills'){
    o+=`<div style="font-size:${fs}pt;color:#333;line-height:${s.lineH}">${H(sec.content||'')}</div>`;
  }
  else if(sec.type==='experience'){
    (sec.items||[]).forEach(it=>{
      o+=`<div style="margin-bottom:10px">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:1px">
          <div style="flex:1"><span style="font-weight:700">${H(it.title||'')}</span>${it.company?`<span style="color:#444"> — ${H(it.company)}</span>`:''}${it.location?`<span style="color:#888;font-size:${fs-1}pt">, ${H(it.location)}</span>`:''}</div>
          <div style="font-size:${fs-1}pt;color:#888;white-space:nowrap;margin-left:10px;flex-shrink:0">${H(it.start||'')}${(it.end||it.current)?` — `:''}${it.current?'<em>Present</em>':H(it.end||'')}</div>
        </div>
        ${it.desc?`<div style="font-size:${fs-.5}pt;color:#444;margin-top:3px">${BL(it.desc)}</div>`:''}
      </div>`;
    });
  }
  else if(sec.type==='education'){
    (sec.items||[]).forEach(it=>{
      o+=`<div style="margin-bottom:9px">
        <div style="display:flex;justify-content:space-between;align-items:baseline">
          <div style="font-weight:700;flex:1">${H(it.degree||'')}${it.field?` in ${H(it.field)}`:''}</div>
          <div style="font-size:${fs-1}pt;color:#888;white-space:nowrap;margin-left:10px">${H(it.start||'')}${it.end?' – ':''} ${H(it.end||'')}</div>
        </div>
        <div style="font-size:${fs-.5}pt;color:#555">${H(it.institution||'')}${it.location?`, ${H(it.location)}`:''}</div>
        ${it.grade?`<div style="font-size:${fs-1}pt;color:#888;font-style:italic">${H(it.grade)}</div>`:''}
      </div>`;
    });
  }
  else if(sec.type==='projects'){
    (sec.items||[]).forEach(it=>{
      o+=`<div style="margin-bottom:10px">
        <div style="display:flex;justify-content:space-between;align-items:baseline">
          <div style="font-weight:700;color:${p};flex:1">${H(it.name||'')}</div>
          <div style="font-size:${fs-1}pt;color:#888">${H(it.dates||'')}</div>
        </div>
        ${it.tech?`<div style="font-size:${fs-1}pt;color:#888;font-style:italic;margin-bottom:2px">${H(it.tech)}</div>`:''}
        ${it.desc?`<div style="font-size:${fs-.5}pt;color:#444">${BL(it.desc)}</div>`:''}
        ${it.link?`<div style="font-size:${fs-1}pt;color:#0066cc;margin-top:2px">${H(it.link)}</div>`:''}
      </div>`;
    });
  }
  else if(sec.type==='certifications'){
    (sec.items||[]).forEach(it=>{
      o+=`<div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:5px">
        <div><span style="font-weight:600">${H(it.name||'')}</span>${it.issuer?`<span style="color:#777;font-size:${fs-1}pt"> · ${H(it.issuer)}</span>`:''}</div>
        <div style="font-size:${fs-1}pt;color:#888">${H(it.date||'')}</div>
      </div>`;
    });
  }
  else if(sec.type==='achievements'){
    (sec.items||[]).forEach(it=>{
      o+=`<div style="margin-bottom:3.5px">• ${H(String(it||''))}</div>`;
    });
  }
  else if(sec.type==='languages'){
    o+=`<div style="display:flex;flex-wrap:wrap;gap:14px">`;
    (sec.items||[]).forEach(it=>{
      o+=`<div><span style="font-weight:600">${H(it.lang||'')}</span><span style="color:#777"> — ${H(it.level||'')}</span></div>`;
    });
    o+=`</div>`;
  }
  else{
    o+=`<div style="font-size:${fs}pt;color:#333">${H(sec.content||'').replace(/\n/g,'<br>')}</div>`;
  }
  return o+'</div>';
}

/* Sidebar section renderer (for dark sidebar templates) */
function renderSidebarSec(sec,t,s,theme){
  if(!sec||sec.visible===false) return '';
  const p=t.p, fs=s.fontSize;
  const isLight=theme==='light';
  const titleC=isLight?p:'rgba(255,255,255,.6)';
  const borderC=isLight?p:'rgba(255,255,255,.2)';
  const textC=isLight?'#444':'rgba(255,255,255,.85)';
  const mutedC=isLight?'#777':'rgba(255,255,255,.6)';

  let o=`<div style="margin-bottom:14px">
    <div style="font-size:${fs-1.5}pt;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:${titleC};border-bottom:1px solid ${borderC};padding-bottom:4px;margin-bottom:8px">${H(sec.title)}</div>`;

  if(sec.type==='skills'){
    const tags=(sec.content||'').split(',').map(x=>x.trim()).filter(Boolean);
    o+=`<div style="display:flex;flex-wrap:wrap;gap:5px">${tags.map(tag=>`<span style="background:${isLight?p+'22':'rgba(255,255,255,.15)'};color:${isLight?p:'#fff'};padding:2px 9px;border-radius:12px;font-size:${fs-1.5}pt;font-weight:500">${H(tag)}</span>`).join('')}</div>`;
  }
  else if(sec.type==='languages'){
    (sec.items||[]).forEach(it=>{
      o+=`<div style="margin-bottom:6px"><div style="color:${isLight?'#333':'#fff'};font-weight:600;font-size:${fs-.5}pt">${H(it.lang||'')}</div><div style="color:${mutedC};font-size:${fs-1.5}pt">${H(it.level||'')}</div></div>`;
    });
  }
  else if(sec.type==='certifications'){
    (sec.items||[]).forEach(it=>{
      o+=`<div style="margin-bottom:5px;font-size:${fs-1.5}pt;color:${textC}">• ${H(it.name||'')}${it.date?` (${H(it.date)})`:''}`;
    });
  }
  else if(sec.type==='achievements'){
    (sec.items||[]).forEach(it=>{
      o+=`<div style="margin-bottom:4px;font-size:${fs-1.5}pt;color:${textC}">• ${H(String(it||''))}</div>`;
    });
  }
  else{
    o+=`<div style="font-size:${fs-1}pt;color:${textC}">${H(sec.content||'')}</div>`;
  }
  return o+'</div>';
}
