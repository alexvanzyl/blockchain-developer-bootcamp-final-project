import { CampaignCard } from ".";
import { Campaign } from "./campaign";

type Props = {
  campaigns: Campaign[];
};

const CampaignList = ({ campaigns }: Props): JSX.Element => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
};

export default CampaignList;
