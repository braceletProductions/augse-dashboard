import "@/styles/globals.css";
import { Provider } from "react-redux";
import ReduxData from "@/components/ReduxData";
import store from "../../store/store";
import NextNProgress from 'nextjs-progressbar';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <NextNProgress color="#f14" />
      <ReduxData />
      <Component {...pageProps} />
    </Provider>
  );
}
