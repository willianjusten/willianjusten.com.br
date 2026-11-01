/** A non-2xx answer from one of our API routes; `status` lets callers tell 429 apart. */
export class HttpError extends Error {
  constructor(readonly status: number) {
    super(`Request failed with status ${status}`);
  }
}

export async function fetchJson<Body>(url: string, init?: RequestInit): Promise<Body> {
  const response = await fetch(url, init);
  if (!response.ok) throw new HttpError(response.status);
  return response.json();
}

export function postJson<Body>(url: string, payload: unknown, init?: RequestInit): Promise<Body> {
  return fetchJson<Body>(url, {
    ...init,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === "AbortError";
}
