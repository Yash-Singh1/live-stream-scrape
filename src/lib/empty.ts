import { NextResponse } from "next/server";

export default function empty() {
  return new NextResponse(
    `<svg viewBox="0 0 0 0" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"/>`,
    {
      headers: {
        "Content-Type": "image/svg+xml",
      },
    }
  );
}
