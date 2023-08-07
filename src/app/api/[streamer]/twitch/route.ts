import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { streamer } }: { params: { streamer: string } }
) {
  try {
    await fetch(
      `https://static-cdn.jtvnw.net/previews-ttv/live_user_${streamer}-80x45.jpg`,
      {
        redirect: "error",
      }
    );
  } catch {
    return NextResponse.redirect(request.nextUrl.origin + "/white.svg");
  }
  return NextResponse.redirect(request.nextUrl.origin + "/twitch.svg");
}
