<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="CyberLearn Academy — practical cybersecurity learning, safe labs and revision quizzes.">
<title>CyberLearn Academy</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<header class="topbar">
  <a class="brand" href="#"><span class="shield">⬡</span> CyberLearn <b>Academy</b></a>
  <nav><a href="#courses">Courses</a><a href="#labs">Safe labs</a><a href="#quiz">Quiz</a><a href="#roadmap">Roadmap</a></nav>
</header>
<main>
<section class="hero">
  <div class="eyebrow">LEARN • PRACTICE • DEFEND</div>
  <h1>Build your skills.<br><span>Defend the digital world.</span></h1>
  <p>Practical cybersecurity learning for beginners and future security professionals. Learn the fundamentals, practice safely, and track your progress.</p>
  <div class="hero-actions"><a class="btn primary" href="#courses">Explore courses ↘</a><a class="btn secondary" href="#roadmap">View learning roadmap</a></div>
  <div class="hero-note"><span class="dot"></span> Beginner-friendly • Ethical learning • Mobile-ready</div>
</section>
<section class="stats">
  <div><strong>10</strong><span>Learning modules</span></div><div><strong>4</strong><span>Skill levels</span></div><div><strong>100%</strong><span>Learn ethically</span></div>
</section>
<section id="courses" class="section">
  <div class="section-head"><div><div class="eyebrow">YOUR LEARNING PATH</div><h2>Explore the courses</h2></div><input id="search" type="search" placeholder="Search courses…" aria-label="Search courses"></div>
  <div class="filters"><button class="filter active" data-level="All">All levels</button><button class="filter" data-level="Beginner">Beginner</button><button class="filter" data-level="Intermediate">Intermediate</button></div>
  <p class="course-note">Each course includes a lesson purchase flow and a certificate after successful payment.</p>
  <div id="courseGrid" class="course-grid"></div>
</section>
<section id="labs" class="section split">
  <div><div class="eyebrow">PRACTICE SAFELY</div><h2>Hands-on learning, the right way.</h2><p>Use isolated practice environments and systems you own or have explicit permission to test. Never scan or attack systems without authorization.</p></div>
  <div class="lab-card"><div class="lab-icon">⌘</div><h3>Safe lab ideas</h3><ul><li>Practice Linux commands in a local terminal</li><li>Analyze sample logs and identify suspicious activity</li><li>Set up a virtual environment with controlled network access</li></ul></div>
</section>
<section id="quiz" class="section quiz-section">
  <div class="eyebrow">CHECK YOUR KNOWLEDGE</div><h2>Quick revision quiz</h2>
  <div class="quiz-card"><div id="quizCount" class="quiz-count">QUESTION 1 OF 5</div><h3 id="question">Loading quiz…</h3><div id="answers" class="answers"></div><p id="feedback" aria-live="polite"></p><button id="next" class="btn primary" disabled>Next</button></div>
</section>
<section id="roadmap" class="section">
  <div class="eyebrow">START HERE</div><h2>Your learning roadmap</h2>
  <div class="roadmap"><div><span>01</span><h3>Build foundations</h3><p>Computer basics, networking, Linux and security principles.</p></div><div><span>02</span><h3>Practice core skills</h3><p>Python, command line work, security analysis, and safe lab workflows.</p></div><div><span>03</span><h3>Earn recognition</h3><p>Complete lessons, pass the quiz, and receive a certificate after payment.</p></div></div>
</section>
<section class="cta"><div><div class="eyebrow">YOUR NEXT STEP</div><h2>Consistency builds confidence.</h2><p>Study one topic, practice in a safe lab, and write down what you learn.</p></div><a class="btn primary" href="#courses">Start a lesson</a></section>
</main>
<footer><a class="brand" href="#">⬡ CyberLearn <b>Academy</b></a><p>Learn cybersecurity ethically. Practice only where you have permission.</p><small>© <span id="year"></span> CyberLearn Academy</small></footer>
<script src="script.js"></script>
</body>
</html>
