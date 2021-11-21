import { CampaignFundForm } from "@components/campaign";
import {
  CampaignDetails,
  CampaignDetailsSidebar,
  CampaignDetailsStats,
} from "@components/campaign/details";
import { useAccount, useCampaign } from "@components/web3/hooks";
import type {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  return {
    paths: [{ params: { cid: "1" } }],
    fallback: true,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  return {
    props: { pageName: "Campaign", pageNameSub: params?.cid },
  };
}

const ViewCampaign: NextPage<InferGetStaticPropsType<typeof getStaticProps>> =
  (): JSX.Element => {
    const router = useRouter();
    const { cid } = router.query;
    const address = typeof cid == "string" ? cid : undefined;
    const { campaign } = useCampaign(address);

    return (
      <>
        <Head>
          <title>Siid | Campaign Details</title>
          <meta name="description" content="Campaign details" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {campaign.hasInitialResponse ? (
          campaign.data ? (
            <div>
              <CampaignDetailsStats campaign={campaign.data} />
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <CampaignDetails campaign={campaign.data} />
                </div>
                <div>
                  <CampaignFundForm address={campaign.data.address} />
                  <CampaignDetailsSidebar />
                </div>
                <div></div>
              </div>
            </div>
          ) : (
            campaign.error && <h1>{campaign.error.reason}</h1>
          )
        ) : (
          <h1>Loading...</h1>
        )}
      </>
    );
  };

export default ViewCampaign;
