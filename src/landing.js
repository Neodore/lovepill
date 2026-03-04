// ============================================================================
// Landing Page Protection & Content (src/landing.js)
// ============================================================================
// This file is loaded by landing-page/index.html and home.html.
// ALL page content is rendered via JS — the HTML shells are empty so viewing
// source reveals nothing. This is one of 3 protection layers:
//
// Layer 1: sessionStorage token ('_lp_s') — set by GridManager on puzzle win.
//          If missing, we redirect to the puzzle page with /?ns which triggers
//          the "No shortcuts" fade-in message over the dots.
//
// Layer 2: JS-rendered content — no content in HTML source to discover.
//
// Layer 3: Obfuscated redirect URL — the URL in GridManager is base64-encoded
//          so searching the JS bundle for "landing-page" finds nothing.
//
// What this stops: casual URL-typing, viewing HTML source, text-searching bundle.
// What it doesn't stop: reading minified JS + manually setting sessionStorage
// (acceptable tradeoff for a static site).
// ============================================================================

// Protection gate — if unauthorized, the HTML shells handle the "No shortcuts"
// animation and set window.__lp_blocked=true to prevent this module from
// also redirecting (which would race the animation and cause a flash).
// If somehow this module runs without the HTML gate (e.g. direct import),
// we redirect as a fallback.
if (!sessionStorage.getItem('_lp_s') && !window.__lp_blocked) {
  location.replace('/');
}

// All content below is wrapped in this gate so nothing renders without the token.
// We use if/else instead of throw because Vite's dev error overlay can catch throws.
if (!sessionStorage.getItem('_lp_s')) { /* halt */ } else {

// --- Fade-in overlay ---
// White overlay that fades out over 2s when arriving from puzzle win (?fadeIn param).
// Creates a smooth white-to-content transition matching the puzzle's fade-out.
const params = new URLSearchParams(window.location.search);
if (params.has('fadeIn')) {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#fff;z-index:1000;animation:lpFadeOut 2s ease-in-out forwards';
  document.body.appendChild(overlay);
  overlay.addEventListener('animationend', () => overlay.remove());
}

// --- Inject Google Fonts ---
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500&display=swap';
document.head.appendChild(fontLink);

// --- Inject styles ---
const style = document.createElement('style');
style.textContent = `
@keyframes lpFadeOut {
  from { opacity: 1 }
  to { opacity: 0 }
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html, body {
  scrollbar-width: none;
}

html::-webkit-scrollbar, body::-webkit-scrollbar {
  display: none;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: #FAF9F6;
  color: #4A3E3B;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

/* ---- Hero ---- */
.lp-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 6rem 2rem 4rem;
  position: relative;
}

.lp-dot-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 2.5rem;
}

.lp-dot-grid span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #FFB7C5;
  display: block;
}

.lp-hero h1 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 4rem;
  font-weight: 500;
  color: #4A3E3B;
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
}

.lp-hero .lp-subtitle {
  font-family: 'Playfair Display', Georgia, serif;
  font-style: italic;
  font-size: 1.35rem;
  color: #665853;
  font-weight: 400;
  max-width: 480px;
}

/* ---- Index nav ---- */
.lp-nav {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 0.9rem 2rem;
  position: sticky;
  top: 0;
  background: #FAF9F6;
  z-index: 100;
  border-bottom: 1px solid #e8e2da;
}

.lp-nav a {
  font-size: 0.85rem;
  font-weight: 500;
  color: #665853;
  text-decoration: none;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition: color 0.2s;
}

.lp-nav a:hover {
  color: #990012;
}

/* ---- Content ---- */
.lp-content {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 2rem 6rem;
}

.lp-section {
  padding: 3.5rem 0;
  border-bottom: 1px solid #e8e2da;
}

.lp-section:last-child {
  border-bottom: none;
}

.lp-section h2 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.75rem;
  font-weight: 500;
  color: #4A3E3B;
  margin-bottom: 1.25rem;
}

.lp-section h2::before {
  content: '\\25CF';
  color: #FFB7C5;
  font-size: 0.6rem;
  vertical-align: middle;
  margin-right: 0.6rem;
}

.lp-section p {
  font-size: 1.1rem;
  color: #665853;
  line-height: 1.85;
  margin-bottom: 1.25rem;
}

.lp-section p:last-child {
  margin-bottom: 0;
}

/* ---- GitHub card ---- */
.lp-gh-card {
  display: block;
  margin-top: 1.25rem;
  padding: 1.1rem 1.4rem;
  border: 1.5px solid #e0d5cc;
  border-radius: 8px;
  background: #fdf9f4;
  color: #990012;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: border-color 0.2s, background 0.2s;
  word-break: break-all;
}

.lp-gh-card:hover {
  border-color: #990012;
  background: #fef6f0;
}

/* ---- Footer / credits ---- */
.lp-footer {
  text-align: center;
  padding: 3rem 2rem 4rem;
  font-size: 1rem;
  color: #665853;
}

.lp-footer p { margin-bottom: 0.25rem; }

.lp-footer a {
  color: #990012;
  text-decoration: none;
  font-weight: 500;
}

.lp-footer a:hover {
  text-decoration: underline;
}

/* ---- Links ---- */
a { color: #990012; }

/* ---- Responsive ---- */
@media (max-width: 600px) {
  .lp-hero h1 { font-size: 2.6rem; }
  .lp-hero .lp-subtitle { font-size: 1.1rem; }
  .lp-nav { gap: 1rem; }
  .lp-nav a { font-size: 0.75rem; }
  .lp-content { padding: 0 1.25rem 4rem; }
  .lp-section { padding: 2.5rem 0; }
  .lp-section h2 { font-size: 1.4rem; }
}
`;
document.head.appendChild(style);

// --- Render content ---
document.body.insertAdjacentHTML('beforeend', `
  <div class="lp-hero">
    <div class="lp-dot-grid">
      <span></span><span></span><span></span>
      <span></span><span></span><span></span>
      <span></span><span></span><span></span>
    </div>
    <h1>Operation Lovepill</h1>
    <p class="lp-subtitle">Towards the systematic alignment of all beings</p>
    <span style="font-size:0.8rem;color:#a09890;margin-top:1.5rem">February 13, 2025</span>
  </div>

  <nav class="lp-nav">
    <a href="#purpose">Purpose</a>
    <a href="#how">How</a>
    <a href="#proof">Proof of Concept</a>
  </nav>

  <div class="lp-content">
    <div class="lp-section" id="purpose">
      <h2>Purpose</h2>
      <p>
        To maximize the probability of all of state caring (sentient) patterns (beings) entering the set of best possible flourishing futures, by aligning them all with an ethical theory that follows modern scientific standards, before pre-singularity exponential capabilities / unaligned ASI amplify our global moral errors towards existential risk.
      </p>
    </div>

    <div class="lp-section" id="how">
      <h2>How</h2>
      <p>Through research &amp; development of error correcting iterated universal moral formal theory, verified with empirical neutral iteratively improving tests &amp; data. The moral theory being the backend of the instantiations in cultural stacks through art &amp; tech infra that targets to align key unaligned nodes in the consciousness network systematically we will carry out.</p>
    </div>

    <div class="lp-section" id="proof">
      <h2>Proof of Concept</h2>
      <p>The following link leads to a V1 (already improved privately and soon to be released) example of how we systematically tested our developed moral theory neutrally against 14 others and then ranked by checking it against a 31 criterion benchmark. The Github Repository includes the 15 moral theory list (including ours) and the benchmark framework. To run it take the two files and drop them into any LLM of your choice (grok, sonnet, etc) &mdash; our moral theory comes up first among established &amp; classic moral theories from utilitarianism to moral naturalism. Even better news: we recently made a breakthrough and have formalized our &ldquo;subjective-frame relative objective moral theory&rdquo; by grounding it in physical ontology&hellip; ie: soon to be released papers. This will allow us to map the trajectories of different beings based on their ethical algorithms through moral spacetime for example, and thus compare the gradients of different moral theories analytically which is a big breakthrough (among other exciting implications).</p>
      <a class="lp-gh-card" href="https://github.com/SunTzoogway/lovepill/tree/main/Moral%20Benchmark" target="_blank" rel="noopener">
        github.com/SunTzoogway/lovepill &mdash; Moral Benchmark
      </a>
    </div>
  </div>

  <div class="lp-footer">
    <p>Made with positive sum qualia &hearts; by <a href="https://x.com/suntzugi" target="_blank" rel="noopener">Sun</a></p>
    <p>Thanks to <a href="https://x.com/DefenderOfBasic" target="_blank" rel="noopener">Defender</a> for helping me optimize the site and realizing my internal theory rank system &amp; results should be published.</p>
  </div>
`);

// --- Smooth scroll for nav links ---
document.querySelectorAll('.lp-nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

} // end protection gate
