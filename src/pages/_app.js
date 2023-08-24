import "@/styles/globals.css";
import Dashboard from "./dashboard/dashboard";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
