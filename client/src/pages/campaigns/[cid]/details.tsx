import CampaignDetails from "@components/campaign/CampaignDetails";
import CampaignFundForm from "@components/campaign/CampaignFundForm";
import CampaignStats from "@components/campaign/CampaignStats";
import Button from "@components/ui/Button";
import { useCampaign } from "@components/web3/hooks";
import type { InferGetStaticPropsType, NextPage } from "next";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  return {
    paths: [{ params: { cid: "" } }],
    fallback: true,
  };
}

export async function getStaticProps() {
  return {
    props: { pageName: "Campaign" },
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
        {campaign.hasInitialResponse ? (
          campaign.data ? (
            <div>
              <CampaignStats campaign={campaign.data} />
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <CampaignDetails campaign={campaign.data} />
                </div>
                <div>
                  <CampaignFundForm address={campaign.data.address} />
                </div>
                <div>
                  <Button type="button">Create Expenditure</Button>
                </div>
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
