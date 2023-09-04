import "@/styles/globals.css";
import Dashboard from "./dashboard/dashboard";
import { Provider } from "react-redux";
import ReduxData from "@/components/ReduxData";
import store from "../../store/store";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ReduxData />
      <Component {...pageProps} />
    </Provider>
  );
}
