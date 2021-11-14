import { ethers } from "ethers";
import Image from "next/image";
import { Campaign } from "./campaign";

type Props = {
  campaign: Campaign;
};

const CampaignDetails = ({ campaign }: Props): JSX.Element => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {campaign.title}
          </h3>
        </div>
        <div className="mt-4 -mb-5 -mx-4 sm:-mx-6">
          <Image
            layout="responsive"
            width="100%"
            height="50%"
            objectFit="cover"
            src={campaign.imageURL}
            alt={campaign.description}
          />
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Description</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {campaign.description}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Funding goal</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {ethers.constants.EtherSymbol} {campaign.fundingGoal}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Minimum contribution
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {ethers.constants.EtherSymbol} {campaign.minimumContribution}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Created on</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }).format(campaign.timestamp)}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Created by</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 truncate">
              {campaign.owner}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Campaign contract address
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 truncate">
              {campaign.address}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default CampaignDetails;
