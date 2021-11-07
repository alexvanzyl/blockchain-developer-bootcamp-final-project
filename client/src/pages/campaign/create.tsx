import Button from "@components/ui/Button";
import { ethers } from "ethers";
import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { classNames } from "../../utils";

export async function getStaticProps() {
  return {
    props: { pageName: "" }, // will be passed to the page component as props
  };
}
const CreateCampaign: NextPage<InferGetStaticPropsType<typeof getStaticProps>> =
  () => {
    const error = true;
    const onSubmit = () => alert("SUBMIT");

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
                    htmlFor="project-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="project-name"
                      id="project-name"
                      className={classNames(
                        error
                          ? "focus:ring-red-500 focus:border-red-500 border-red-300"
                          : "focus:ring-green-500 focus:border-green-500 border-gray-300",
                        "block w-full shadow-sm  sm:text-sm rounded-md"
                      )}
                      defaultValue=""
                    />
                  </div>
                  <p className="mt-2 text-sm text-red-600" id="email-error">
                    Campaign needs a title to be noticed.
                  </p>
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
                      name="description"
                      rows={3}
                      className="block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border border-gray-300 rounded-md"
                      defaultValue={""}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="project-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    What is your funding goal?
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {ethers.constants.EtherSymbol}
                    </div>
                    <input
                      type="text"
                      name="project-name"
                      id="project-name"
                      className="pl-7 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border-gray-300 rounded-md"
                      defaultValue=""
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
                </div>
                <div>
                  <label
                    htmlFor="project-name"
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
                      name="project-name"
                      id="project-name"
                      className="pl-7 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border-gray-300 rounded-md"
                      defaultValue=""
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
                </div>
              </div>
            </form>
          </div>
          <div className="flex justify-end bg-gray-50 px-4 py-4 sm:px-6">
            <Button type="submit" onClick={onSubmit}>
              <span>Create</span>
            </Button>
          </div>
        </div>
      </>
    );
  };

export default CreateCampaign;
