import { useWeb3 } from "@components/providers";
import Button from "@components/ui/Button";
import CampaignContract from "@contracts/Campaign.json";
import { ethers } from "ethers";
import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { classNames } from "src/utils";

export async function getStaticPaths() {
  return {
    paths: [{ params: { cid: "1" } }],
    fallback: true,
  };
}

export async function getStaticProps() {
  return {
    props: { pageName: "" },
  };
}

type FormData = {
  description: string;
  amount: number;
  recipient: string;
};

const CreateCampaignExpenditure: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = (): JSX.Element => {
  const router = useRouter();
  const { web3 } = useWeb3();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (web3) {
      const campaignContract = new ethers.Contract(
        router.query.cid as string,
        CampaignContract.abi,
        web3.getSigner()
      );

      try {
        setIsLoading(true);
        const txn = await campaignContract.createExpenditureRequest(
          data.description,
          ethers.utils.parseUnits(data.amount.toString(), "ether"),
          data.recipient
        );
        await txn.wait();
        reset();
        setIsLoading(false);

        router.push(`/campaigns/${router.query.cid}/expenditures`);
      } catch (e) {
        setIsLoading(false);
        console.log(e);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Siid | New campaign expenditure request</title>
        <meta
          name="description"
          content="Create a new campaign expenditure request."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-lg mx-auto bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <form>
            <div className="space-y-6">
              <div>
                <h1 className="text-lg leading-6 font-medium text-gray-900">
                  New expenditure request
                </h1>

                <p className="mt-1 text-sm text-gray-500 truncate">
                  {router.query.cid}
                </p>
              </div>

              <div>
                <label
                  htmlFor="value"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    rows={3}
                    className={classNames(
                      errors.description
                        ? "focus:ring-red-500 focus:border-red-500 border-red-300"
                        : "focus:ring-green-500 focus:border-green-500 border-gray-300",
                      "block w-full shadow-sm  sm:text-sm rounded-md"
                    )}
                    {...register("description", { required: true })}
                  />
                </div>
                {errors.description && (
                  <p
                    className="mt-2 text-sm text-red-600"
                    id="description-error"
                  >
                    Description is required.
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="value"
                  className="block text-sm font-medium text-gray-700"
                >
                  Amount
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {ethers.constants.EtherSymbol}
                  </div>
                  <input
                    type="number"
                    id="value"
                    className={classNames(
                      errors.description
                        ? "focus:ring-red-500 focus:border-red-500 border-red-300"
                        : "focus:ring-green-500 focus:border-green-500 border-gray-300",
                      "pl-7 block w-full shadow-sm  sm:text-sm rounded-md"
                    )}
                    {...register("amount", { required: true, min: 1 })}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span
                      className="text-gray-500 sm:text-sm"
                      id="price-currency"
                    >
                      Ether
                    </span>
                  </div>
                </div>
                {errors.amount && (
                  <p className="mt-2 text-sm text-red-600" id="value-error">
                    Please specify the amount.
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="recipient"
                  className="block text-sm font-medium text-gray-700"
                >
                  Recipient
                </label>
                <div className="mt-1">
                  <input
                    id="title"
                    type="text"
                    className={classNames(
                      errors.recipient
                        ? "focus:ring-red-500 focus:border-red-500 border-red-300"
                        : "focus:ring-green-500 focus:border-green-500 border-gray-300",
                      "block w-full shadow-sm  sm:text-sm rounded-md"
                    )}
                    {...register("recipient", { required: true })}
                  />
                </div>
                {errors.recipient && (
                  <p className="mt-2 text-sm text-red-600" id="recipient-error">
                    Recipient is required.
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
        <div className="flex justify-end px-4 py-4 sm:px-6">
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Create"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateCampaignExpenditure;
