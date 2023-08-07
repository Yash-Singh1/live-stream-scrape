import { NextRequest, NextResponse } from "next/server";

const accessibilityLive = `accessibility:{accessibilityData:{label:LIVE}}`;

export async function GET(
  request: NextRequest,
  { params: { streamer } }: { params: { streamer: string } }
) {
  try {
    let html = await fetch(`https://www.youtube.com/@${streamer}`).then(
      (response) => response.text()
    );
    if (html) {
      html = html.replaceAll(/\s|"|'/g, "");
      const isLive = html.includes(accessibilityLive);
      if (isLive) {
        return NextResponse.redirect(request.nextUrl.origin + "/youtube.png");
      } else {
        return NextResponse.redirect(request.nextUrl.origin + "/white.svg");
      }
    }
  } catch {}
  return NextResponse.redirect(request.nextUrl.origin + "/white.svg");
}
