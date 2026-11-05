(() => {
  const STORAGE_KEY = "cv-lang";
  const content = window.CV_CONTENT;

  function detectLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "ru" || saved === "en") return saved;
    const nav = (navigator.language || "en").toLowerCase();
    return nav.startsWith("ru") ? "ru" : "en";
  }

  let lang = detectLang();

  const $ = (sel) => document.querySelector(sel);

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function render() {
    const t = content[lang];
    document.documentElement.lang = lang;
    document.title = t.metaTitle;

    $("#prompt").textContent = t.prompt;
    $("#name").textContent = t.name;
    $("#headline").textContent = t.headline;
    $("#location").textContent = t.location;
    $("#footer-text").textContent = t.footer;

    document.querySelectorAll("[data-section]").forEach((el) => {
      el.textContent = t.sections[el.dataset.section];
    });

    $("#nav").innerHTML = Object.entries(t.nav)
      .map(
        ([id, label]) =>
          `<a href="#${escapeHtml(id)}">${escapeHtml(label)}</a>`
      )
      .join("");

    const c = t.contact;
    $("#hero-links").innerHTML = [
      `<li><a href="mailto:${escapeHtml(c.email)}">${escapeHtml(c.email)}</a></li>`,
      `<li><a href="${escapeHtml(c.telegramUrl)}" target="_blank" rel="noopener">${escapeHtml(c.telegram)}</a></li>`,
      `<li><a href="${escapeHtml(c.githubUrl)}" target="_blank" rel="noopener">GitHub</a></li>`,
      `<li><a href="${escapeHtml(c.linkedinUrl)}" target="_blank" rel="noopener">LinkedIn</a></li>`,
    ].join("");

    $("#experience-list").innerHTML = t.experience
      .map(
        (job) => `
      <article class="job">
        <h3 class="job-title">${escapeHtml(job.title)}</h3>
        <p class="job-company">
          <a href="${escapeHtml(job.companyUrl)}" target="_blank" rel="noopener">${escapeHtml(job.company)}</a>
          · ${escapeHtml(job.employment)}
        </p>
        <p class="job-meta">${escapeHtml(job.dates)}<br />${escapeHtml(job.place)}</p>
        <p class="job-summary">${escapeHtml(job.summary)}</p>
        <ul class="job-bullets">
          ${job.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}
        </ul>
        <ul class="job-skills">
          ${job.skills.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}
        </ul>
      </article>`
      )
      .join("");

    $("#projects-list").innerHTML = t.projects
      .map(
        (p) => `
      <article class="project">
        <div class="project-head">
          <h3 class="project-name">
            <a href="${escapeHtml(p.url)}" target="_blank" rel="noopener">${escapeHtml(p.name)}</a>
          </h3>
          <span class="project-tag">${escapeHtml(p.tag)}</span>
        </div>
        <p class="project-blurb">${escapeHtml(p.blurb)}</p>
        <ul class="project-stack">
          ${p.stack.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}
        </ul>
      </article>`
      )
      .join("");

    const edu = t.education;
    $("#education-body").innerHTML = `
      <p class="edu-school">${escapeHtml(edu.school)}</p>
      <p class="edu-degree">${escapeHtml(edu.degree)}</p>
      <p class="edu-dates">${escapeHtml(edu.dates)}</p>`;

    $("#skills-list").innerHTML = t.skills
      .map((s) => `<li>${escapeHtml(s)}</li>`)
      .join("");

    $("#contact-list").innerHTML = [
      `<li><span class="label">email</span><a href="mailto:${escapeHtml(c.email)}">${escapeHtml(c.email)}</a></li>`,
      `<li><span class="label">telegram</span><a href="${escapeHtml(c.telegramUrl)}" target="_blank" rel="noopener">${escapeHtml(c.telegram)}</a></li>`,
      `<li><span class="label">github</span><a href="${escapeHtml(c.githubUrl)}" target="_blank" rel="noopener">${escapeHtml(c.github)}</a></li>`,
      `<li><span class="label">linkedin</span><a href="${escapeHtml(c.linkedinUrl)}" target="_blank" rel="noopener">${escapeHtml(c.linkedin)}</a></li>`,
    ].join("");

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.lang === lang);
    });

    $("main").classList.remove("fade");
    void $("main").offsetWidth;
    $("main").classList.add("fade");
  }

  function setLang(next) {
    if (next !== "ru" && next !== "en") return;
    lang = next;
    localStorage.setItem(STORAGE_KEY, lang);
    render();
  }

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });

  render();
})();
