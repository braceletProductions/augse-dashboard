import { NextResponse } from "next/server";
import { verifier } from "../utils/user/tester";

export default async function middleware(req) {
  // const { pathname } = req.nextUrl;
  // const auth = req.cookies.get("auth")?.value;
  // let response;
  // if (pathname === "/" || pathname === "/error") {
  //   return NextResponse.next();
  // } else {
  //   try {
  //     response = await verifier(auth);
  //     console.log(response);
  //     // path matcher

  //     if (pathname.startsWith("/admin") && response === "admin") {
  //       return NextResponse.next();
  //     } else if (pathname.startsWith("/accountant") && response === "accountant") {
  //       return NextResponse.next();
  //     } else if (pathname.startsWith("/seller") && response === "seller") {
  //       return NextResponse.next();
  //     } else if (pathname.startsWith("/procurement") && response === "procurement") {
  //       return NextResponse.next();
  //     } else {
  //       return NextResponse.redirect(process.env.NEXT_PUBLIC_DOMAIN_NAME);
  //     }
  //   } catch (error) {
  //     return NextResponse.redirect(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/error`);
  //   }
  // }
}
