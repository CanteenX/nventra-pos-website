/**
 * Runs before paint: applies a saved light/dark choice so there is no flash.
 * With no saved choice the site is dark (black/charcoal base).
 */
const SCRIPT = `try{var t=localStorage.getItem("nventra-theme");document.documentElement.dataset.theme=(t==="light"||t==="dark")?t:"dark"}catch(e){}`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
