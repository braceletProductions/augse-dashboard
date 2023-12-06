import { NextResponse } from "next/server";
import { verifier } from "../utils/user/tester";

export default async function middleware(req) {
  const { pathname } = req.nextUrl;

  // ADMIN MIDDLEWARE
  // if (pathname.startsWith("/admin")) {
  //   const auth = req.cookies.get("auth")?.value;
  //   if (!auth) {
  //     return NextResponse.redirect(
  //       `${process.env.NEXT_PUBLIC_DOMAIN_NAME}`,
  //       req.url
  //     );
  //   }
  //   const res = await verifier(auth);
  //   if (res !== "admin") {
  //     return NextResponse.redirect(
  //       `${process.env.NEXT_PUBLIC_DOMAIN_NAME}`,
  //       req.url
  //     );
  //   }
  //   return NextResponse.next();
  // }

  // // PROCUREMENT MIDDLEWARE
  // if (pathname.startsWith("/procurement")) {
  //   const auth = req.cookies.get("auth")?.value;
  //   if (!auth) {
  //     return NextResponse.redirect(
  //       `${process.env.NEXT_PUBLIC_DOMAIN_NAME}`,
  //       req.url
  //     );
  //   }
  //   const res = await verifier(auth);
  //   if (res !== "procurement") {
  //     return NextResponse.redirect(
  //       `${process.env.NEXT_PUBLIC_DOMAIN_NAME}`,
  //       req.url
  //     );
  //   }
  //   return NextResponse.next();
  // }
  // // PROCUREMENT MIDDLEWARE
  // if (pathname.startsWith("/procurement")) {
  //   const auth = req.cookies.get("auth")?.value;
  //   if (!auth) {
  //     return NextResponse.redirect(
  //       `${process.env.NEXT_PUBLIC_DOMAIN_NAME}`,
  //       req.url
  //     );
  //   }
  //   const res = await verifier(auth);
  //   if (res !== "procurement") {
  //     return NextResponse.redirect(
  //       `${process.env.NEXT_PUBLIC_DOMAIN_NAME}`,
  //       req.url
  //     );
  //   }
  //   return NextResponse.next();
  // }

  // // Sales MIDDLEWARE
  // if (pathname.startsWith("/sales")) {
  //   const auth = req.cookies.get("auth")?.value;
  //   if (!auth) {
  //     return NextResponse.redirect(
  //       `${process.env.NEXT_PUBLIC_DOMAIN_NAME}`,
  //       req.url
  //     );
  //   }
  //   const res = await verifier(auth);
  //   if (res !== "sales") {
  //     return NextResponse.redirect(
  //       `${process.env.NEXT_PUBLIC_DOMAIN_NAME}`,
  //       req.url
  //     );
  //   }
  //   return NextResponse.next();
  // }

  // // accountant MIDDLEWARE
  // if (pathname.startsWith("/accountant")) {
  //   const auth = req.cookies.get("auth")?.value;
  //   if (!auth) {
  //     return NextResponse.redirect(
  //       `${process.env.NEXT_PUBLIC_DOMAIN_NAME}`,
  //       req.url
  //     );
  //   }
  //   const res = await verifier(auth);
  //   if (res !== "accountant") {
  //     return NextResponse.redirect(
  //       `${process.env.NEXT_PUBLIC_DOMAIN_NAME}`,
  //       req.url
  //     );
  //   }
  //   return NextResponse.next();
  // } else {
  //   return NextResponse.next();
  // }
}
