import empty from "@/lib/empty";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params: { streamer } }: { params: { streamer: string } }
) {
  streamer = streamer.toLowerCase();

  try {
    await fetch(
      `https://static-cdn.jtvnw.net/previews-ttv/live_user_${streamer}-80x45.jpg`,
      {
        redirect: "error",
      }
    );
  } catch {
    return empty();
  }
  // Thanks to FontAwesome for the Twitch logo
  return new NextResponse(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill='#A970FF'><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
  <path d="M391.17,103.47H352.54v109.7h38.63ZM285,103H246.37V212.75H285ZM120.83,0,24.31,91.42V420.58H140.14V512l96.53-91.42h77.25L487.69,256V0ZM449.07,237.75l-77.22,73.12H294.61l-67.6,64v-64H140.14V36.58H449.07Z"></path>
</svg>`,
    {
      headers: {
        "Content-Type": "image/svg+xml",
      },
    }
  );
}
