import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { UserIcon, CalendarIcon } from "@heroicons/react/outline";

export async function getStaticProps() {
  const campaigns = [
    {
      id: 0,
      name: "Hyperloop",
      description:
        "High-speed mass transportation system for both passenger and freight transport.",
      owner: "0x82f9a4e4440169e2f56b9e2e423a19b0c2c7c28c",
      fundingGoal: 100,
      totalFundingReceived: 40,
      timestamp: Date.now(),
      imageUrl:
        "https://globscoop.com/wp-content/uploads/2020/05/19654_tn_int-hyperloop-concept-priestmangoode.jpg",
      backers: 250,
    },
    {
      id: 1,
      name: "SkyJet",
      description: "A single-seat pursuit craft",
      owner: "0xa9853938806873aecc94539c8b6df30417eda128",
      fundingGoal: 100,
      totalFundingReceived: 200,
      timestamp: Date.now(),
      imageUrl:
        "http://autoconception.com/wp-content/uploads/2016/11/Lexus-EuropaCorp-Spacecraft-Design-SkyJet-Sci-Fi-Valerian.jpg",
      backers: 1000,
    },
    {
      id: 2,
      name: "Hoverbike",
      description: "Now motorbike can fly!",
      owner: "0xa9853938806873aecc94539c8b6df30417eda128",
      fundingGoal: 275,
      totalFundingReceived: 27,
      timestamp: Date.now(),
      imageUrl:
        "https://images.hgmsites.net/hug/dubai-police-test-hoversurf-hover-bike_100678896_h.jpg",
      backers: 5000,
    },
  ];

  return {
    props: { campaigns, pageName: "Campaigns" }, // will be passed to the page component as props
  };
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  campaigns,
}) => {
  const getCampaignProgress = (index: number): string => {
    const campaign = campaigns[index];
    const percentage = campaign.totalFundingReceived / campaign.fundingGoal;
    if (percentage >= 1) return "100%";
    return `${Math.round(percentage * 100)}%`;
  };

  const EthereumIcon = (props: React.ComponentProps<"svg">): JSX.Element => {
    return (
      <svg
        viewBox="-116 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        {...props}
      >
        <path d="m140.28125 333.582031-140.28125-66.734375 140.28125 245.152344 140.285156-245.152344zm0 0" />
        <path d="m265.289062 217.117188-125.007812-217.117188-125.148438 217.367188 125.148438-59.367188zm0 0" />
        <path d="m25.980469 245.535156 114.300781 54.140625 114.492188-54.230469-114.492188-54.136718zm0 0" />
      </svg>
    );
  };

  return (
    <>
      <Head>
        <title>Siid | Campaigns</title>
        <meta name="description" content="Campaigns done better." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-2xl"
          >
            <div className="flex justify-between px-4 py-5 sm:px-6">
              <h3 className="text-xl font-bold leading-tight text-gray-900">
                {campaign.name}
              </h3>
              <div className="flex items-center">
                <span className="text-xl mr-1">&#127793;</span>
                <span className="text-gray-700 text-lg">
                  {campaign.backers}
                </span>
              </div>
            </div>
            <Image
              layout="responsive"
              width="100%"
              height="50%"
              objectFit="cover"
              src={campaign.imageUrl}
              alt={campaign.description}
            />
            <div className="bg-gray-200 h-6">
              <div
                className="bg-green-500 h-6 transition text-center text-white text-sm"
                style={{
                  width: getCampaignProgress(campaign.id),
                  transition: "width 2s",
                }}
              >
                {getCampaignProgress(campaign.id)}
              </div>
            </div>

            <div className="px-4 py-5 sm:p-6 h-60 flex flex-col justify-between">
              <p className="text-md text-gray-700">{campaign.description}</p>
              <ul className="text-sm text-gray-500 space-y-2 truncate">
                <li>
                  <div className="flex items-center">
                    <UserIcon className="h-6 w-6 text-green-500 mr-2" />
                    <span className="truncate">{campaign.owner}</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <CalendarIcon className="h-6 w-6 text-green-500 mr-2" />
                    <span>
                      {new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }).format(campaign.timestamp)}
                    </span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <EthereumIcon className="h-6 w-6 text-green-500 mr-2" />
                    <span className="truncate">
                      &Xi; {campaign.totalFundingReceived} / &Xi;{" "}
                      {campaign.fundingGoal}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="px-4 py-4 sm:px-6 text-center">
              <button
                type="button"
                className="shadow-md w-full justify-center inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
