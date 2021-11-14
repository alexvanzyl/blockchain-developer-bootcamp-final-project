import { ethers } from "ethers";
import { Campaign } from "./campaign";

type Props = {
  campaign: Campaign;
};

const CampaignStats = ({ campaign }: Props): JSX.Element => {
  const getCampaignProgress = (campaign: Campaign): string => {
    const percentage = campaign.totalFundingReceived / campaign.fundingGoal;
    if (percentage >= 1) return "100%";
    return `${Math.round(percentage * 100)}%`;
  };

  const stats = [
    { name: "Backers", stat: campaign.backers },
    { name: "Funding reached", stat: getCampaignProgress(campaign) },
    {
      name: "Total funding received",
      stat: `${ethers.constants.EtherSymbol} ${campaign.totalFundingReceived}`,
    },
  ];

  return (
    <div className="mb-5">
      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
          >
            <dt className="text-sm font-medium text-gray-500 truncate">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default CampaignStats;
