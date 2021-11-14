import { useWeb3 } from "@components/providers";
import Button from "@components/ui/Button";
import { ethers } from "ethers";
import { create } from "ipfs-http-client";
import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import router from "next/router";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { classNames } from "../../utils";

const client = create({
  url: "https://ipfs.infura.io:5001/api/v0",
});

export async function getStaticProps() {
  return {
    props: { pageName: "" }, // will be passed to the page component as props
  };
}

type FormData = {
  title: string;
  description: string;
  fundingGoal: number;
  minimumContribution: string;
};

const CreateCampaign: NextPage<InferGetStaticPropsType<typeof getStaticProps>> =
  () => {
    const { web3, contractFactory } = useWeb3();
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<FormData>();
    const [fileUrl, setFileUrl] = useState("");

    async function onChange(e: ChangeEvent<HTMLInputElement>) {
      const file = e.target.files ? e.target.files[0] : null;
      if (file) {
        try {
          const added = await client.add(file, {
            progress: (prog) => console.log(`received: ${prog}`),
          });
          const url = `https://infura-ipfs.io/ipfs/${added.path}`;
          setFileUrl(url);
        } catch (error) {
          console.log("Error uploading file: ", error);
        }
      }
    }

    const onSubmit: SubmitHandler<FormData> = async (data) => {
      if (web3 && contractFactory && fileUrl) {
        const { title, description, fundingGoal, minimumContribution } = data;
        const factory = contractFactory.connect(web3.getSigner());
        const txn = await factory.createCampaign(
          title,
          description,
          ethers.utils.parseUnits(fundingGoal.toString(), "ether"),
          ethers.utils.parseUnits(minimumContribution.toString(), "ether"),
          fileUrl
        );
        await txn.wait();
        reset();
        let campaigns = await factory.getCampaigns();
        router.push(`/campaigns/${campaigns.slice(-1)[0]}/details`);
      }
    };

    return (
      <>
        <Head>
          <title>Siid | New campaign</title>
          <meta name="description" content="Create a new campaign." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="max-w-lg mx-auto bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <form>
              <div className="space-y-6">
                <div>
                  <h1 className="text-lg leading-6 font-medium text-gray-900">
                    New campaign
                  </h1>
                  <p className="mt-1 text-sm text-gray-500">
                    Get the funding you need for your next big idea!
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <div className="mt-1">
                    <input
                      id="title"
                      type="text"
                      className={classNames(
                        errors.title
                          ? "focus:ring-red-500 focus:border-red-500 border-red-300"
                          : "focus:ring-green-500 focus:border-green-500 border-gray-300",
                        "block w-full shadow-sm  sm:text-sm rounded-md"
                      )}
                      {...register("title", { required: true })}
                    />
                  </div>
                  {errors.title && (
                    <p className="mt-2 text-sm text-red-600" id="title-error">
                      Campaign needs a title to be noticed.
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="campaign-image"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Campaign Image
                  </label>
                  <div className="mt-1 mb-1">
                    <input
                      id="campaign-image"
                      type="file"
                      className=""
                      onChange={onChange}
                    />
                  </div>
                  {fileUrl && (
                    <Image
                      layout="responsive"
                      className="rounded"
                      width="100%"
                      height="80%"
                      src={fileUrl}
                      alt="Image"
                    />
                  )}
                </div>

                <div>
                  <label
                    htmlFor="description"
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
                      Give your campaign a description the will entice backers.
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="funding-goal"
                    className="block text-sm font-medium text-gray-700"
                  >
                    What is your funding goal?
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {ethers.constants.EtherSymbol}
                    </div>
                    <input
                      type="number"
                      id="funding-goal"
                      className={classNames(
                        errors.description
                          ? "focus:ring-red-500 focus:border-red-500 border-red-300"
                          : "focus:ring-green-500 focus:border-green-500 border-gray-300",
                        "pl-7 block w-full shadow-sm  sm:text-sm rounded-md"
                      )}
                      {...register("fundingGoal", { required: true, min: 1 })}
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
                  {errors.fundingGoal && (
                    <p
                      className="mt-2 text-sm text-red-600"
                      id="funding-goal-error"
                    >
                      Please specify the amount of funding you looking for.
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="minimum-contribution"
                    className="block text-sm font-medium text-gray-700"
                  >
                    What is the minimum a backer can contribute?
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {ethers.constants.EtherSymbol}
                    </div>
                    <input
                      type="text"
                      id="minimum-contribution"
                      className={classNames(
                        errors.description
                          ? "focus:ring-red-500 focus:border-red-500 border-red-300"
                          : "focus:ring-green-500 focus:border-green-500 border-gray-300",
                        "pl-7 block w-full shadow-sm  sm:text-sm rounded-md"
                      )}
                      {...register("minimumContribution", {
                        required: true,
                        min: 1,
                      })}
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
                  {errors.minimumContribution && (
                    <p
                      className="mt-2 text-sm text-red-600"
                      id="minimum-contribution-error"
                    >
                      Please specify the minimum amount a backer can contribute.
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
          <div className="flex justify-end px-4 py-4 sm:px-6">
            <Button type="submit" onClick={handleSubmit(onSubmit)}>
              <span>Create</span>
            </Button>
          </div>
        </div>
      </>
    );
  };

export default CreateCampaign;
