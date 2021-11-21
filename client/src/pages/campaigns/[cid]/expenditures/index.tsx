import { CampaignExpenditureRequestsTable } from "@components/campaign/expenditures";
import Button from "@components/ui/Button";
import type {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  return {
    paths: [{ params: { cid: "1" } }],
    fallback: true,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  return {
    props: { pageName: "Campaign Expenditures", pageNameSub: params?.cid },
  };
}

const ViewCampaignExpenditures: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = (): JSX.Element => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Siid | Campaign Expenditures</title>
        <meta name="description" content="Campaign expenditures." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center sm:justify-end">
        <Button
          type="button"
          variant="green"
          onClick={() =>
            router.push(`/campaigns/${router.query.cid}/expenditures/create`)
          }
        >
          New Expenditure Request
        </Button>
      </div>
      <CampaignExpenditureRequestsTable />
    </>
  );
};

export default ViewCampaignExpenditures;
