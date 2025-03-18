
import { NextResponse } from "next/server";

const protectedRoutes = {
    student: ["/student"],  // 👈 Students can access only this
    teacher: ["/teacher"], // 👈 Teachers can access these
    admin: ["/dashboard"], // 👈 Admin can access everything
};

async function verifyJWT(token, secret) {
    try {
        const [header, payload, signature] = token.split(".");
        const encoder = new TextEncoder();
        const key = await crypto.subtle.importKey(
            "raw",
            encoder.encode(secret),
            { name: "HMAC", hash: "SHA-256" },
            false,
            ["verify"]
        );

        const valid = await crypto.subtle.verify(
            "HMAC",
            key,
            Uint8Array.from(atob(signature.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0)),
            new TextEncoder().encode(header + "." + payload)
        );

        if (!valid) throw new Error("Invalid token");

        return JSON.parse(atob(payload)); // Decoded payload
    } catch (error) {
        console.error("JWT Verification Failed:", error.message);
        return null;
    }
}

export async function middleware(req) {
    console.log("🔍 Middleware running on:", req.nextUrl.pathname);

    const tokenCookie = req.cookies.get("token");
    const token = tokenCookie ? tokenCookie.value : null;

    if (!token) {
        console.log("❌ No token found, redirecting to login");
        return NextResponse.redirect(new URL("/login", req.url));
    }

    const decoded = await verifyJWT(token, process.env.JWT_SECRET);

    if (!decoded) {
        console.log("❌ Invalid token, redirecting to login");
        return NextResponse.redirect(new URL("/login", req.url));
    }

    console.log("✅ Token Verified:", decoded);

    const userRole = decoded.role;
    const allowedRoutes = protectedRoutes[userRole] || [];

    // 🚀 **Restrict unauthorized access**
    if (!allowedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
        console.log(`❌ Unauthorized access: ${userRole} cannot access ${req.nextUrl.pathname}`);
        return NextResponse.redirect(new URL("/login", req.url));  // Redirect unauthorized users
    }

    return NextResponse.next();
}



















import { NextResponse } from 'next/server';

export function middleware(req) {
    const res = NextResponse.next();

    // Allow CORS for API routes
    if (req.nextUrl.pathname.startsWith('/api/')) {
        res.headers.set('Access-Control-Allow-Origin', '*'); // Adjust this for security in production
        res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        // Handle preflight requests
        if (req.method === 'OPTIONS') {
            return new Response(null, {
                status: 204,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                },
            });
        }
    }

    return res;
}



// ✅ Middleware applies to all protected subpaths
export const config = {
    matcher: ["/dashboard/:path*", "/teacher/:path*", "/student/:path*", '/api/:path*'],
};
















