import "@/styles/globals.css";
import { Provider } from "react-redux";
import ReduxData from "@/components/ReduxData";
import store from "../../store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <NextNProgress color="#f14" />
      <ReduxData />
      <ToastContainer />
      <Component {...pageProps} />
    </Provider>
  );
}
