import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "@/i18n/routing";
import { isRetiredHost, retiredHostDestination } from "@/lib/retirement/retired-hosts";

const handleLocaleRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  if (isRetiredHost(request.headers.get("host") ?? request.nextUrl.hostname)) {
    return NextResponse.redirect(
      retiredHostDestination(request.headers.get("accept-language")),
      301,
    );
  }

  return handleLocaleRouting(request);
}

export const config = {
  matcher: [
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
    // The retired hosts redirect on every path, including files and API routes.
    { source: "/:path*", has: [{ type: "host", value: "photos.willianjusten.com.br" }] },
    { source: "/:path*", has: [{ type: "host", value: "my-trips.willianjusten.com.br" }] },
  ],
};
