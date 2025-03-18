import { NextResponse } from "next/server";

export async function GET(req) {
    const response = NextResponse.redirect(new URL("/login", req.url));

    // Expire the authentication token
    response.cookies.set("token", "", { maxAge: 0, path: "/" });

    return response;
}
