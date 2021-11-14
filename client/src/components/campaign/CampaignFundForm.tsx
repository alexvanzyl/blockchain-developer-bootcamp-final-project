import Button from "@components/ui/Button";
import { ethers } from "ethers";
import { useForm } from "react-hook-form";
import { classNames } from "src/utils";
import { Campaign } from "./campaign";

type Props = {
  campaign: Campaign;
};

const CampaignFundForm = ({ campaign }: Props): JSX.Element => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ contribution: number }>();

  const onSubmit = () => alert("submit");

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="contribution"
                className="block text-sm font-medium text-gray-700 sr-only"
              >
                Fund campaign
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {ethers.constants.EtherSymbol}
                </div>
                <input
                  id="contribution"
                  type="number"
                  className={classNames(
                    errors.contribution
                      ? "focus:ring-red-500 focus:border-red-500 border-red-300"
                      : "focus:ring-green-500 focus:border-green-500 border-gray-300",
                    "pl-7 block w-full shadow-sm  sm:text-sm rounded-md"
                  )}
                  defaultValue={campaign.minimumContribution}
                  {...register("contribution", {
                    required: true,
                    min: campaign.minimumContribution,
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
              {errors.contribution && (
                <p
                  className="mt-2 text-sm text-red-600"
                  id="contribution-error"
                >
                  Contribution needs to be {ethers.constants.EtherSymbol}{" "}
                  {campaign.minimumContribution} or more.
                </p>
              )}
            </div>
            <Button type="submit" className="w-full justify-center">
              Fund campaign
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CampaignFundForm;
