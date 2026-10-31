const BROWSER_ID_STORAGE_KEY = "wj-browser-id";

/** A random id kept in this browser; it is how "one reaction per game per browser" is enforced. */
export function readBrowserId(): string {
  const stored = window.localStorage.getItem(BROWSER_ID_STORAGE_KEY);
  if (stored) {
    return stored;
  }
  const created = crypto.randomUUID();
  window.localStorage.setItem(BROWSER_ID_STORAGE_KEY, created);
  return created;
}
