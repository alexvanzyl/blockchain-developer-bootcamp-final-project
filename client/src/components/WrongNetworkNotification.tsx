import Notification from "@components/Notification";
import { useNetwork } from "./web3/hooks";

const WrongNetworkNotification = (): JSX.Element => {
  const { network } = useNetwork();

  return (
    <>
      {network.hasInitialResponse && !network.isSupported && (
        <Notification
          title="Connected to wrong network."
          body={`Please connect to ${network.target}`}
          variant="error"
        />
      )}
    </>
  );
};

export default WrongNetworkNotification;
