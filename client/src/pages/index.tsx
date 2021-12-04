import { CampaignList } from "@components/campaign";
import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";

export async function getStaticProps() {
  // const campaigns = [
  //   {
  //     id: 0,
  //     name: "Hyperloop",
  //     description:
  //       "High-speed mass transportation system for both passenger and freight transport.",
  //     owner: "0x82f9a4e4440169e2f56b9e2e423a19b0c2c7c28c",
  //     fundingGoal: 100,
  //     totalFundingReceived: 40,
  //     timestamp: Date.now(),
  //     imageUrl:
  //       "https://globscoop.com/wp-content/uploads/2020/05/19654_tn_int-hyperloop-concept-priestmangoode.jpg",
  //     backers: 250,
  //   },
  //   {
  //     id: 1,
  //     name: "SkyJet",
  //     description: "A single-seat pursuit craft",
  //     owner: "0xa9853938806873aecc94539c8b6df30417eda128",
  //     fundingGoal: 100,
  //     totalFundingReceived: 200,
  //     timestamp: Date.now(),
  //     imageUrl:
  //       "http://autoconception.com/wp-content/uploads/2016/11/Lexus-EuropaCorp-Spacecraft-Design-SkyJet-Sci-Fi-Valerian.jpg",
  //     backers: 1000,
  //   },
  //   {
  //     id: 2,
  //     name: "Hoverbike",
  //     description: "Now motorbikes can fly!",
  //     owner: "0xa9853938806873aecc94539c8b6df30417eda128",
  //     fundingGoal: 275,
  //     totalFundingReceived: 27,
  //     timestamp: Date.now(),
  //     imageUrl:
  //       "https://images.hgmsites.net/hug/dubai-police-test-hoversurf-hover-bike_100678896_h.jpg",
  //     backers: 5000,
  //   },
  // ];

  return {
    props: { pageName: "Campaigns" }, // will be passed to the page component as props
  };
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = () => {
  return (
    <>
      <Head>
        <title>Siid | Campaigns</title>
        <meta name="description" content="Campaigns done better." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CampaignList />
    </>
  );
};

export default Home;
