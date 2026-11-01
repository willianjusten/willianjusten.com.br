const BROWSER_ID_STORAGE_KEY = "wj-browser-id";

/** Undefined when storage is blocked, which leaves the shelf readable but its buttons inert. */
export function readBrowserId(): string | undefined {
  try {
    const stored = window.localStorage.getItem(BROWSER_ID_STORAGE_KEY);
    if (stored) return stored;
    const created = crypto.randomUUID();
    window.localStorage.setItem(BROWSER_ID_STORAGE_KEY, created);
    return created;
  } catch {
    return undefined;
  }
}
