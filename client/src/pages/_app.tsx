import Layout from "@components/ui/Layout";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout pageName={pageProps.pageName} pageNameSub={pageProps.pageNameSub}>
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp;
