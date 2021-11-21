import { CampaignExpenditureRequestsTableRow } from "@components/campaign/expenditures";
import { useCampaign, useExpenditureRequests } from "@components/web3/hooks";
import { useRouter } from "next/router";

const CampaignExpenditureRequestsTable = (): JSX.Element => {
  const router = useRouter();
  const { cid } = router.query;
  const address = typeof cid == "string" ? cid : undefined;
  const { expenditureRequests } = useExpenditureRequests(address);
  const { campaign } = useCampaign(address);

  const renderRows = (): JSX.Element | JSX.Element[] => {
    if (
      expenditureRequests.hasInitialResponse &&
      expenditureRequests.data &&
      expenditureRequests.data.length > 0
    ) {
      return expenditureRequests.data.map((expenditure, expenditureIdx) => (
        <CampaignExpenditureRequestsTableRow
          key={expenditureIdx}
          index={expenditureIdx}
          expenditure={expenditure}
          totalBackers={campaign.data ? campaign.data.backers : 0}
        />
      ));
    }
    return (
      <tr>
        <td
          colSpan={7}
          className="text-center px-6 py-4 whitespace-nowrap text-sm font-medium"
        >
          No expenditures requested.
        </td>
      </tr>
    );
  };

  return (
    <div className="flex flex-col mt-5">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Recipient
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Approval Count
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Approve</span>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Finalize</span>
                  </th>
                </tr>
              </thead>
              <tbody>{renderRows()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignExpenditureRequestsTable;
