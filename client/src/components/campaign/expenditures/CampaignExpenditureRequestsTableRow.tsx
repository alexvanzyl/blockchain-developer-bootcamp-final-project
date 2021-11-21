import { ExpenditureRequest } from "@components/campaign/models";
import Button from "@components/ui/Button";

type Props = {
  index: number;
  expenditure: ExpenditureRequest;
  totalExpenditures: number;
};

const CampaignExpenditureRequestsTableRow = ({
  index,
  expenditure,
  totalExpenditures,
}: Props): JSX.Element => {
  return (
    <tr className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {index}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {expenditure.description}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {expenditure.value}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {expenditure.recipient}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {expenditure.approvalCount} / {totalExpenditures}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Button type="button" variant="yellow" size="xs">
          Approve
        </Button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Button type="button" variant="green" size="xs">
          Finalize
        </Button>
      </td>
    </tr>
  );
};

export default CampaignExpenditureRequestsTableRow;
