import { NextResponse } from "next/server";
import { verifier } from "../utils/user/tester";

export default async function middleware(req) {
  const { pathname } = req.nextUrl;
  const auth = req.cookies.get("auth")?.value;

  if (
    pathname === "/admin" ||
    pathname === "/accountant" ||
    pathname === "/seller" ||
    (pathname === "/procurement" && !auth)
  ) {
    return NextResponse.redirect(process.env.NEXT_PUBLIC_DOMAIN_NAME);
  }

  
  try {
    if (pathname.startsWith("/admin")) {
      const adminRes = await verifier(auth);
      if (adminRes === "admin") {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(process.env.NEXT_PUBLIC_DOMAIN_NAME);
      }
    } else if (pathname.startsWith("/accountant")) {
      const accountantRes = await verifier(auth);
      if (accountantRes === "accountant") {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(process.env.NEXT_PUBLIC_DOMAIN_NAME);
      }
    } else if (pathname.startsWith("/seller")) {
      const sellerRes = await verifier(auth);
      if (sellerRes === "seller") {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(process.env.NEXT_PUBLIC_DOMAIN_NAME);
      }
    } else if (pathname.startsWith("/procurement")) {
      const procurementRes = await verifier(auth);
      if (procurementRes === "procurement") {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(process.env.NEXT_PUBLIC_DOMAIN_NAME);
      }
    } else {
      return NextResponse.redirect("https://augse.in");
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.redirect("/error");
  }
}
