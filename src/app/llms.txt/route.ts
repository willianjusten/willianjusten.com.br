import { buildLlmsText } from "@/lib/llms-text";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsText(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
