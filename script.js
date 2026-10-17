const courses=[
{title:"Cybersecurity Fundamentals",level:"Beginner",icon:"🛡️",desc:"CIA triad, threats, vulnerabilities, risk and security controls.",time:"2–3 hours"},
{title:"Linux & Networking",level:"Beginner",icon:"⌘",desc:"Terminal basics, IP addresses, DNS, ports and network protocols.",time:"3–4 hours"},
{title:"Python for Security",level:"Beginner",icon:"🐍",desc:"Learn variables, files, scripts and small defensive tools.",time:"3–5 hours"},
{title:"Web & Application Security",level:"Intermediate",icon:"⌁",desc:"Understand authentication, input validation, XSS and SQL injection prevention.",time:"4–5 hours"},
{title:"Digital Forensics",level:"Intermediate",icon:"🔎",desc:"Evidence handling, file metadata, timelines and investigation notes.",time:"3–4 hours"},
{title:"Incident Response",level:"Intermediate",icon:"🚨",desc:"Prepare, detect, contain, eradicate, recover and document incidents.",time:"2–3 hours"},
{title:"Cloud Security",level:"Intermediate",icon:"☁️",desc:"Identity, access control, secure storage and cloud configuration basics.",time:"3 hours"},
{title:"Threat Intelligence",level:"Intermediate",icon:"◎",desc:"Indicators of compromise, threat context and reliable reporting.",time:"2–3 hours"},
{title:"Security Operations (SOC)",level:"Intermediate",icon:"▦",desc:"Logs, alert triage, SIEM concepts and escalation workflows.",time:"4 hours"},
{title:"Technical Writing",level:"Beginner",icon:"✎",desc:"Write clear lab reports, findings, recommendations and incident summaries.",time:"1–2 hours"}
];
let activeLevel="All";
const grid=document.querySelector("#courseGrid");
function renderCourses(){const q=document.querySelector("#search").value.toLowerCase();const list=courses.filter(c=>(activeLevel==="All"||c.level===activeLevel)&&(c.title+" "+c.desc).toLowerCase().includes(q));grid.innerHTML=list.map(c=>`<article class="course-card"><div class="course-top"><span class="course-icon">${c.icon}</span><span class="level">${c.level}</span></div><h3>${c.title}</h3><p>${c.desc}</p><div class="course-bottom"><span>Preview module ↗</span><span>${c.time}</span></div></article>`).join("")||"<p>No courses match your search.</p>";}
document.querySelector("#search").addEventListener("input",renderCourses);
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");activeLevel=b.dataset.level;renderCourses()}));
const quiz=[
{q:"What does the CIA triad stand for?",a:["Confidentiality, Integrity, Availability","Control, Inspection, Access","Cybersecurity, Internet, Applications"],correct:0,why:"The CIA triad is a core security model: confidentiality, integrity and availability."},
{q:"Which command commonly shows the current directory in Linux?",a:["whereami","pwd","showdir"],correct:1,why:"pwd prints the current working directory."},
{q:"What should you do before testing a system?",a:["Get explicit authorization","Hide your identity","Disable its logs"],correct:0,why:"Only test systems you own or have clear permission to assess."},
{q:"What is phishing?",a:["A way to compress files","A social-engineering attempt to trick people","A network cable type"],correct:1,why:"Phishing uses deceptive messages or sites to steal information or prompt unsafe actions."},
{q:"What is the safest way to store passwords?",a:["Plain text in a file","Reuse one easy password","Use a password manager and unique passwords"],correct:2,why:"A password manager helps create and store strong, unique passwords."}
];
let qi=0,score=0,chosen=false;
function showQuestion(){chosen=false;document.querySelector("#feedback").textContent="";document.querySelector("#next").disabled=true;document.querySelector("#next").textContent=qi===quiz.length-1?"See result →":"Next question →";document.querySelector("#quizCount").textContent=`QUESTION ${qi+1} OF ${quiz.length}`;document.querySelector("#question").textContent=quiz[qi].q;document.querySelector("#answers").innerHTML=quiz[qi].a.map((a,i)=>`<button class="answer" data-i="${i}">${String.fromCharCode(65+i)}. ${a}</button>`).join("");document.querySelectorAll(".answer").forEach(b=>b.addEventListener("click",()=>{if(chosen)return;chosen=true;const i=Number(b.dataset.i);if(i===quiz[qi].correct){score++;b.classList.add("correct");document.querySelector("#feedback").textContent="Correct! "+quiz[qi].why}else{b.classList.add("wrong");document.querySelector("#feedback").textContent="Not quite. "+quiz[qi].why;document.querySelectorAll(".answer")[quiz[qi].correct].classList.add("correct")}document.querySelector("#next").disabled=false;}));}
document.querySelector("#next").addEventListener("click",()=>{if(!chosen)return;if(qi<quiz.length-1){qi++;showQuestion()}else{document.querySelector("#quizCount").textContent="QUIZ COMPLETE";document.querySelector("#question").textContent=`You scored ${score} out of ${quiz.length}.`;document.querySelector("#answers").innerHTML="";document.querySelector("#feedback").textContent=score>=4?"Great work — keep learning and practicing safely.":"Good start. Review the course cards and try again.";const b=document.querySelector("#next");b.textContent="Try again ↻";b.disabled=false;b.onclick=()=>{qi=0;score=0;b.onclick=null;showQuestion()}}});
document.querySelector("#year").textContent=new Date().getFullYear();renderCourses();showQuestion();
