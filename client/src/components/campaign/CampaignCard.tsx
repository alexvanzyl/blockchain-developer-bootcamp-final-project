import EthereumIcon from "@components/icons/EthereumIcon";
import { CalendarIcon, UserIcon } from "@heroicons/react/outline";
import { ethers } from "ethers";
import Image from "next/image";
import { Campaign } from "./campaign";

type Props = {
  campaign: Campaign;
};

const CampaignCard = ({ campaign }: Props): JSX.Element => {
  const getCampaignProgress = (campaign: Campaign): string => {
    const percentage = campaign.totalFundingReceived / campaign.fundingGoal;
    if (percentage >= 1) return "100%";
    return `${Math.round(percentage * 100)}%`;
  };

  return (
    <div
      key={campaign.id}
      className="bg-white overflow-hidden shadow rounded-lg hover:shadow-2xl"
    >
      <div className="flex justify-between px-4 py-5 sm:px-6">
        <h3 className="text-xl font-bold leading-tight text-gray-900">
          {campaign.title}
        </h3>
        <div className="flex items-center" title="Total backers">
          <span className="text-xl mr-1">&#127793;</span>
          <span className="text-gray-700 text-lg">{campaign.backers}</span>
        </div>
      </div>
      <Image
        layout="responsive"
        width="100%"
        height="50%"
        objectFit="cover"
        src={campaign.imageURL}
        alt={campaign.description}
      />
      <div className="bg-gray-200 h-6">
        <div
          className="bg-green-500 h-6 transition text-center text-white text-sm"
          style={{
            width: getCampaignProgress(campaign),
            transition: "width 2s",
          }}
        >
          {getCampaignProgress(campaign)}
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
                {ethers.constants.EtherSymbol} {campaign.totalFundingReceived} /{" "}
                {ethers.constants.EtherSymbol} {campaign.fundingGoal}
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
  );
};

export default CampaignCard;
