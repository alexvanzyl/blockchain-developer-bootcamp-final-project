import { ExpenditureRequest } from "@components/campaign/models";
import { useWeb3 } from "@components/providers";
import Button from "@components/ui/Button";
import CampaignContract from "@contracts/Campaign.json";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useState } from "react";
import { classNames } from "src/utils";

type Props = {
  index: number;
  expenditure: ExpenditureRequest;
  totalBackers: number;
};

const CampaignExpenditureRequestsTableRow = ({
  index,
  expenditure,
  totalBackers,
}: Props): JSX.Element => {
  const router = useRouter();
  const { web3 } = useWeb3();
  const [isLoading, setIsLoading] = useState(false);

  const onApprove = async (): Promise<void> => {
    if (web3) {
      const campaignContract = new ethers.Contract(
        router.query.cid as string,
        CampaignContract.abi,
        web3.getSigner()
      );

      setIsLoading(true);
      const txn = await campaignContract.approveExpenditureRequest(index + 1);
      await txn.wait();
      setIsLoading(false);

      router.push(`/campaigns/${router.query.cid}/expenditures`);
    }
  };

  const onFinialize = async (): Promise<void> => {
    if (web3) {
      const campaignContract = new ethers.Contract(
        router.query.cid as string,
        CampaignContract.abi,
        web3.getSigner()
      );

      setIsLoading(true);
      const txn = await campaignContract.finalizeExpenditureRequest(index + 1);
      await txn.wait();
      setIsLoading(false);

      router.push(`/campaigns/${router.query.cid}/expenditures`);
    }
  };

  const readyToFinalize = expenditure.approvalCount > totalBackers / 2;

  return (
    <tr
      className={classNames(
        readyToFinalize && !expenditure.complete
          ? "bg-green-50"
          : index % 2 === 0
          ? "bg-white"
          : "bg-gray-50"
      )}
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {index + 1}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {expenditure.description}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {expenditure.amount}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {expenditure.recipient}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {expenditure.approvalCount} / {totalBackers}
      </td>
      {expenditure.complete ? (
        <td
          colSpan={2}
          className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-green-500"
        >
          Approved
        </td>
      ) : (
        <>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <Button
              type="button"
              variant="yellow"
              size="xs"
              onClick={onApprove}
              disabled={expenditure.complete || isLoading}
            >
              {isLoading ? "Loading..." : "Approve"}
            </Button>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <Button
              type="button"
              variant="green"
              size="xs"
              onClick={onFinialize}
              disabled={expenditure.complete || isLoading}
            >
              {isLoading ? "Loading..." : "Finalize"}
            </Button>
          </td>
        </>
      )}
    </tr>
  );
};

export default CampaignExpenditureRequestsTableRow;
