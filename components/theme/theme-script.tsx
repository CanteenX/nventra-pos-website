/**
 * Runs before paint: applies a saved light/dark choice so there is no flash.
 * With no saved choice the site is light.
 */
const SCRIPT = `try{var t=localStorage.getItem("nventra-theme");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t}}catch(e){}`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
