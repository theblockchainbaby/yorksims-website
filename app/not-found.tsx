import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found | York Sims, Jr.",
  robots: { index: false, follow: false },
};

// The public site is static HTML in /public and shares its stylesheet here so
// a wrong URL lands on a page that looks like the rest of the site.
export default function NotFound() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;700;800;900&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="/style.css" />
      <style>{`html, body { background: #f3efe6 !important; color: #1d1a17 !important; }`}</style>
      <div style={{ minHeight: "100vh", background: "#f3efe6", color: "#1d1a17" }}>
        <header className="masthead compact wrap">
          <a className="nameplate" href="/">
            York Sims<span className="jr">Jr.</span>
          </a>
          <nav className="mast-nav" aria-label="Main">
            <a href="/books">Books</a>
            <a href="/read">Read the intro</a>
            <a href="/about">About</a>
            <a href="/teams">Teams</a>
          </nav>
        </header>
        <main id="main">
          <div className="reader">
            <div className="title-block">
              <h1>That page isn&apos;t here</h1>
              <p className="note">The link may be old, or the address has a typo.</p>
            </div>
            <div className="prose">
              <p>
                <a className="btn primary" href="/">
                  Go to the home page
                </a>
              </p>
              <p>
                Or jump to <a href="/books">the books</a>, <a href="/read">the free introduction</a> or{" "}
                <a href="/about">about York</a>.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
