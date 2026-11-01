import Script from "next/script";

const UMAMI_SCRIPT_URL = "https://cloud.umami.is/script.js";
// Public Umami Cloud website ID, it ships in the page HTML anyway.
const UMAMI_WEBSITE_ID = "302a4108-165e-400f-980c-0646d309241b";

// Cookieless Umami Cloud tracker. Only Vercel builds (production and preview) set VERCEL_ENV, so local dev stays untracked.
export function Analytics({ deployEnv = process.env.VERCEL_ENV }) {
  if (!deployEnv) return null;

  return (
    <Script src={UMAMI_SCRIPT_URL} data-website-id={UMAMI_WEBSITE_ID} strategy="afterInteractive" />
  );
}
