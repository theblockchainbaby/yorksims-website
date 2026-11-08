// Buy buttons open Stripe Checkout; forms save to the leads table.
function noteFor(el) {
  const scope = el.closest(".buy, form, .compact-buy, .reader") || document;
  return scope.querySelector(".preview-note");
}

document.addEventListener("click", async (e) => {
  const btn = e.target.closest("[data-buy]");
  if (!btn) return;
  e.preventDefault();
  const note = noteFor(btn);
  const label = btn.textContent;
  btn.disabled = true;
  btn.textContent = "Opening checkout…";
  try {
    const r = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId: btn.dataset.buy, format: btn.dataset.format }),
    });
    const data = await r.json();
    if (!r.ok || !data.url) throw new Error(data.error || "no url");
    window.location.href = data.url;
  } catch {
    btn.disabled = false;
    btn.textContent = label;
    if (note) note.textContent = "Checkout didn't open. Try again, or email york@yorksims.com.";
  }
});

document.addEventListener("submit", async (e) => {
  const form = e.target.closest("form[data-lead]");
  if (!form) return;
  e.preventDefault();
  const note = form.querySelector(".preview-note");
  const hp = form.querySelector(".hp");
  if (hp && hp.value) return;
  const email = form.querySelector('input[type="email"]').value.trim();
  const metadata = {};
  form.querySelectorAll("input[id], select[id], textarea[id]").forEach((f) => {
    if (f.type === "email") return;
    const lab = form.querySelector(`label[for="${f.id}"]`);
    metadata[lab ? lab.textContent.trim() : f.id] = f.value;
  });
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  try {
    const r = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: form.dataset.lead, metadata }),
    });
    if (!r.ok) throw new Error();
    if (note) {
      note.textContent = form.dataset.done + " ";
      if (form.dataset.file) {
        const a = document.createElement("a");
        a.href = form.dataset.file; a.download = ""; a.textContent = "Download the introduction";
        note.appendChild(a);
      }
    }
    form.querySelectorAll("input, select, textarea, button").forEach((f) => { if (f !== btn) f.disabled = true; });
  } catch {
    btn.disabled = false;
    if (note) note.textContent = "That didn't go through. Try again, or email york@yorksims.com.";
  }
});

const bar = document.querySelector(".progress");
const chapter = document.querySelector(".chapter");
if (bar && chapter) {
  let ticking = false;
  const update = () => {
    const r = chapter.getBoundingClientRect();
    const total = r.height - window.innerHeight;
    const p = Math.min(1, Math.max(0, -r.top / (total > 0 ? total : 1)));
    bar.style.transform = `scaleX(${p})`;
    ticking = false;
  };
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}
