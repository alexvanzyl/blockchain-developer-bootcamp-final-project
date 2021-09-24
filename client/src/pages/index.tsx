import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "@components/Navbar";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Siid | Campaigns</title>
        <meta name="description" content="Campaigns done better." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
    </div>
  );
};

export default Home;
