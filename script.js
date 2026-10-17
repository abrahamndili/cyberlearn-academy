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

let activeLevel = "All";
const grid = document.querySelector("#courseGrid");
const bundlePrice = 25;

function renderCourses() {
  const q = document.querySelector("#search").value.toLowerCase();
  const list = courses.filter(c => (activeLevel === "All" || c.level === activeLevel) && (c.title + " " + c.desc).toLowerCase().includes(q));

  grid.innerHTML = list.map(c => `
    <article class="course-card">
      <div class="course-head">
        <div class="course-icon">${c.icon}</div>
        <span class="course-level">${c.level}</span>
      </div>
      <h3>${c.title}</h3>
      <p>${c.desc}</p>
      <div class="card-meta">
        <span>${c.time}</span>
        <button class="course-pay" type="button" data-title="${c.title}">Pay to access</button>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".course-pay").forEach(button => {
    button.addEventListener("click", () => {
      openPaymentModal(button.dataset.title);
    });
  });
}

document.querySelector("#search").addEventListener("input", renderCourses);
document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    activeLevel = button.dataset.level;
    renderCourses();
  });
});

function openPaymentModal(title = 'All lessons and certificate') {
  const modal = document.getElementById('paymentModal');
  modal.classList.remove('hidden');
  const formTitle = modal.querySelector('h3');
  formTitle.textContent = title === 'All lessons and certificate' ? 'Pay for all lessons and certificate' : `Pay to access: ${title}`;
}

function closePaymentModal() {
  document.getElementById('paymentModal').classList.add('hidden');
  document.getElementById('paymentStatus').textContent = '';
}

function setStatus(message, isError = false) {
  const status = document.getElementById('paymentStatus');
  status.textContent = message;
  status.style.color = isError ? '#ff8a80' : '#65f0c1';
}

document.querySelectorAll('.pay-button').forEach(button => {
  button.addEventListener('click', () => openPaymentModal('All lessons and certificate'));
});

document.querySelector('.close-modal').addEventListener('click', closePaymentModal);
document.getElementById('paymentModal').addEventListener('click', (event) => {
  if (event.target.id === 'paymentModal') closePaymentModal();
});

document.getElementById('paymentForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('studentName').value.trim() || 'Student';
  const email = document.getElementById('studentEmail').value.trim() || 'student@example.com';
  const provider = document.querySelector('input[name="provider"]:checked')?.value || 'flutterwave';

  setStatus('Creating payment session...');

  try {
    const response = await fetch('/api/create-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider,
        amount: bundlePrice,
        plan: 'all-lessons',
        name,
        email
      })
    });

    const result = await response.json();

    if (!result?.checkoutUrl) {
      throw new Error(result?.error || 'Payment initialization failed');
    }

    setStatus(result.message || 'Redirecting to payment...');
    if (result.mode === 'demo') {
      window.location.href = result.checkoutUrl;
    } else {
      window.location.href = result.checkoutUrl;
    }
  } catch (error) {
    setStatus(error.message || 'Unable to start payment.', true);
  }
});

const quiz=[
  {q:"What does the CIA triad stand for?",a:["Confidentiality, Integrity, Availability","Control, Inspection, Access","Cybersecurity, Internet, Applications"],correct:0,why:"The CIA triad is a core model in information security."},
  {q:"Which command commonly shows the current directory in Linux?",a:["whereami","pwd","showdir"],correct:1,why:"pwd prints the current working directory."},
  {q:"What should you do before testing a system?",a:["Get explicit authorization","Hide your identity","Disable its logs"],correct:0,why:"Only test systems you own or have clear permission to assess."},
  {q:"What is phishing?",a:["A way to compress files","A social-engineering attempt to trick people","A network cable type"],correct:1,why:"Phishing uses deceptive messages or sites to steal information."},
  {q:"What is the safest way to store passwords?",a:["Plain text in a file","Reuse one easy password","Use a password manager and unique passwords"],correct:2,why:"A password manager helps create and securely store unique passwords."}
];

let qi = 0, score = 0, chosen = false;

function showQuestion() {
  chosen = false;
  const feedback = document.querySelector('#feedback');
  const next = document.querySelector('#next');
  const answerBox = document.querySelector('#answers');

  feedback.textContent = '';
  next.disabled = true;
  next.textContent = qi === quiz.length - 1 ? 'Finish' : 'Next';

  const current = quiz[qi];
  document.querySelector('#quizCount').textContent = `QUESTION ${qi + 1} OF ${quiz.length}`;
  document.querySelector('#question').textContent = current.q;
  answerBox.innerHTML = current.a.map((option, idx) => `
    <button class="answer-btn" type="button" data-index="${idx}">${option}</button>
  `).join('');

  answerBox.querySelectorAll('.answer-btn').forEach(button => {
    button.addEventListener('click', () => {
      if (chosen) return;
      chosen = true;
      const selected = Number(button.dataset.index);
      const correct = current.correct;
      next.disabled = false;

      document.querySelectorAll('.answer-btn').forEach(item => {
        item.disabled = true;
        if (Number(item.dataset.index) === correct) item.classList.add('correct');
        if (Number(item.dataset.index) === selected && selected !== correct) item.classList.add('wrong');
      });

      if (selected === correct) {
        score++;
        feedback.textContent = `Correct — ${current.why}`;
      } else {
        feedback.textContent = `Incorrect — ${current.why}`;
      }
    });
  });
}

document.querySelector('#next').addEventListener('click', () => {
  if (!chosen) return;
  if (qi < quiz.length - 1) {
    qi++; showQuestion();
  } else {
    document.querySelector('#quizCount').textContent = 'QUIZ COMPLETE';
    document.querySelector('#question').textContent = `You scored ${score} / ${quiz.length}.`;
    document.querySelector('#answers').innerHTML = '';
    document.querySelector('#feedback').textContent = 'Great effort — keep practicing and move on to the full academy bundle for the certificate.';
    document.querySelector('#next').disabled = true;
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();
renderCourses();
showQuestion();
