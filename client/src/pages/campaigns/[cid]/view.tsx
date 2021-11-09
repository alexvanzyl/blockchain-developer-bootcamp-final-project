import type { InferGetStaticPropsType, NextPage } from "next";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  return {
    paths: [
      { params: { cid: "1" } }, // See the "paths" section below
    ],
    fallback: true,
  };
}

export async function getStaticProps() {
  return {
    props: { pageName: "Campaign" }, // will be passed to the page component as props
  };
}

const ViewCampaign: NextPage<InferGetStaticPropsType<typeof getStaticProps>> =
  () => {
    const router = useRouter();
    const { cid } = router.query;

    return <h1>{cid}</h1>;
  };

export default ViewCampaign;
