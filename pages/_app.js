// A top-level React component that wraps all the pages
// Can load global CSS, & keep global states
// https://nextjs.org/docs/advanced-features/custom-app
import "../styles/global.css";
import { Provider } from "react-redux";
import store from "../redux/store";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
