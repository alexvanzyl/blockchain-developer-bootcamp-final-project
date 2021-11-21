import { CampaignExpenditureRequestsTable } from "@components/campaign/expenditures";
import Button from "@components/ui/Button";
import type { InferGetStaticPropsType, NextPage } from "next";

export async function getStaticPaths() {
  return {
    paths: [{ params: { cid: "1" } }],
    fallback: true,
  };
}

export async function getStaticProps() {
  return {
    props: { pageName: "Campaign Expenditures" },
  };
}

const ViewCampaignExpenditures: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = (): JSX.Element => {
  return (
    <>
      <div className="flex justify-center sm:justify-end">
        <Button type="button" variant="green">
          New Expenditure Request
        </Button>
      </div>
      <CampaignExpenditureRequestsTable />
    </>
  );
};

export default ViewCampaignExpenditures;
