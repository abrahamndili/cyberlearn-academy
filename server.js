:root {
  --bg: #081015;
  --panel: #101b23;
  --panel-strong: #162730;
  --text: #edf7fb;
  --muted: #a9bac4;
  --mint: #62f0c1;
  --cyan: #67d8eb;
  --line: rgba(255,255,255,0.08);
  --shadow: 0 20px 45px rgba(0,0,0,0.24);
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: 'DM Sans', Arial, sans-serif;
  line-height: 1.6;
}

a { color: inherit; text-decoration: none; }
img { max-width: 100%; }
button, input {
  font: inherit;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 18px 8vw;
  background: rgba(8,16,21,0.72);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--line);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.shield {
  color: var(--mint);
  font-size: 1.2rem;
}

nav {
  display: flex;
  gap: 22px;
  color: var(--muted);
  flex-wrap: wrap;
}

nav a:hover { color: var(--text); }

main {
  width: min(1200px, calc(100% - 32px));
  margin: 0 auto;
}

.hero {
  padding: 74px 0 30px;
  display: grid;
  gap: 24px;
}

.eyebrow {
  color: var(--mint);
  font-size: 0.82rem;
  letter-spacing: 0.18em;
  font-weight: 700;
}

h1 {
  margin: 0;
  font-size: clamp(2.7rem, 6vw, 5rem);
  line-height: 1.04;
  letter-spacing: -0.06em;
}

h1 span { color: var(--cyan); }

.hero p {
  max-width: 700px;
  color: var(--muted);
  font-size: 1.05rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid transparent;
  padding: 0.9rem 1.2rem;
  font-weight: 700;
  transition: 0.2s ease;
  cursor: pointer;
}

.btn.primary,
.buy-lesson,
.answer {
  background: linear-gradient(135deg, var(--mint), var(--cyan));
  color: #05221c;
  border-color: transparent;
}

.btn.secondary {
  background: rgba(255,255,255,0.02);
  border-color: var(--line);
  color: var(--text);
}

.hero-note {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--muted);
}

.dot {
  width: 10px;
  height: 10px;
  background: var(--mint);
  border-radius: 50%;
  box-shadow: 0 0 18px rgba(98,240,193,0.9);
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(160px, 1fr));
  gap: 18px;
  margin: 22px 0 36px;
}

.stats > div {
  background: linear-gradient(180deg, rgba(17,28,35,0.9), rgba(10,18,22,0.9));
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 22px 18px;
  box-shadow: var(--shadow);
}

.stats strong {
  display: block;
  font-size: clamp(1.7rem, 3vw, 2.5rem);
  margin-bottom: 3px;
}

.stats span {
  color: var(--muted);
}

.section {
  padding: 42px 0;
}

.section-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: end;
  margin-bottom: 24px;
}

h2 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.8rem);
  letter-spacing: -0.05em;
}

#search {
  width: min(260px, 100%);
  padding: 12px 14px;
  background: rgba(255,255,255,0.02);
  border: 1px solid var(--line);
  border-radius: 12px;
  color: var(--text);
}

.filters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 20px 0 16px;
}

.filter {
  background: rgba(255,255,255,0.02);
  border: 1px solid var(--line);
  color: var(--muted);
  border-radius: 999px;
  padding: 9px 14px;
  cursor: pointer;
}

.filter.active {
  background: rgba(98,240,193,0.12);
  border-color: rgba(98,240,193,0.42);
  color: var(--text);
}

.course-note {
  color: var(--muted);
  margin: 10px 0 22px;
}

.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
}

.course-card {
  background: linear-gradient(180deg, var(--panel), var(--panel-strong));
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 20px;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.course-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.course-icon {
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: rgba(103,216,235,0.08);
  border: 1px solid rgba(103,216,235,0.25);
  font-size: 1.6rem;
}

.course-level {
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(255,255,255,0.04);
  color: var(--muted);
  font-size: 0.8rem;
}

.course-card h3 {
  margin: 0;
  font-size: 1.1rem;
  letter-spacing: -0.04em;
}

.course-card p {
  margin: 0;
  color: var(--muted);
}

.course-meta {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  color: var(--muted);
}

.buy-lesson {
  border: none;
  border-radius: 12px;
  padding: 0.9rem 1rem;
  font-weight: 700;
  cursor: pointer;
}

.split {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
  align-items: center;
}

.lab-card {
  background: linear-gradient(180deg, rgba(17,28,35,0.9), rgba(15,23,28,0.9));
  border: 1px solid var(--line);
  padding: 22px 18px;
  border-radius: 18px;
  box-shadow: var(--shadow);
}

.lab-icon {
  font-size: 2rem;
  color: var(--mint);
}

.lab-card ul {
  margin: 12px 0 0;
  padding-left: 18px;
  color: var(--muted);
}

.quiz-card {
  background: linear-gradient(180deg, rgba(17,28,35,0.9), rgba(12,20,25,0.9));
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 24px;
  box-shadow: var(--shadow);
}

.quiz-count {
  color: var(--mint);
  font-weight: 700;
  letter-spacing: 0.08em;
  margin-bottom: 12px;
}

#question {
  margin: 0 0 18px;
}

.answers {
  display: grid;
  gap: 12px;
}

.answer {
  text-align: left;
  border: 1px solid rgba(0,0,0,0.12);
  border-radius: 12px;
  padding: 0.9rem 1rem;
  font-weight: 600;
  cursor: pointer;
}

.answer.correct {
  background: #083f2c;
  color: #dffef6;
  border-color: rgba(98,240,193,0.5);
}

.answer.wrong {
  background: #3d1717;
  color: #ffe8e8;
  border-color: rgba(255,120,120,0.5);
}

.answer:disabled {
  opacity: 0.95;
  cursor: not-allowed;
}

#feedback {
  min-height: 24px;
  color: var(--muted);
  margin: 16px 0 0;
}

.roadmap {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 24px;
}

.roadmap > div {
  background: linear-gradient(180deg, rgba(17,28,35,0.9), rgba(18,25,30,0.9));
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 22px 18px;
}

.roadmap span {
  color: var(--mint);
  font-size: 2rem;
  display: inline-block;
  font-weight: 700;
}

.roadmap h3 {
  margin: 14px 0 10px;
}

.roadmap p {
  margin: 0;
  color: var(--muted);
}

.cta {
  margin: 18px 0 52px;
  display: flex;
  justify-content: space-between;
  gap: 22px;
  align-items: center;
  background: linear-gradient(180deg, rgba(16,25,31,0.9), rgba(11,18,24,0.9));
  border: 1px solid var(--line);
  border-radius: 22px;
  padding: 28px;
}

footer {
  width: min(1200px, calc(100% - 32px));
  margin: 0 auto 30px;
  padding-top: 10px;
  border-top: 1px solid var(--line);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  color: var(--muted);
  flex-wrap: wrap;
}

@media (max-width: 860px) {
  .split, .roadmap, .stats, .cta {
    grid-template-columns: 1fr;
    display: grid;
  }

  .section-head {
    flex-direction: column;
    align-items: flex-start;
  }

  .topbar {
    padding: 18px 20px;
  }

  nav {
    gap: 12px;
    font-size: 0.9rem;
  }
}

@media (max-width: 520px) {
  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero {
    padding-top: 46px;
  }
}

