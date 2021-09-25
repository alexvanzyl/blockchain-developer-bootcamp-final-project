import Layout from "@components/Layout";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout pageName={pageProps.pageName}>
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp;
