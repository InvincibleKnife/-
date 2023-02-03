import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Template from "@/template/Template";
import { Provider } from "react-redux";
import { redux } from "@/redux";
export default function App({ Component, pageProps }: AppProps) {
  let con = () => {
    if ((Component as any).title == "png") {
      return <Component {...pageProps} />;
    } else {
      return (
        <Template>
          <Component {...pageProps} />
        </Template>
      );
    }
  };
  return <Provider store={redux}> {con()}</Provider>;
}
