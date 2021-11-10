import { useCampaigns } from "@components/web3/hooks";
import { CampaignCard } from ".";
import { Campaign } from "./campaign";

const CampaignList = (): JSX.Element => {
  const { campaigns } = useCampaigns();
  console.log(campaigns.data);

  const listCampaigns = (): JSX.Element[] | JSX.Element => {
    if (campaigns.data && campaigns.data.length > 0) {
      return campaigns.data.map((campaign: Campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ));
    }
    return <div>No content</div>;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {listCampaigns()}
    </div>
  );
};

export default CampaignList;
