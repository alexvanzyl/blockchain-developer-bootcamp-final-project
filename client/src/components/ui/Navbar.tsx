import Logo from "@components/icons/Logo";
import Button from "@components/ui/Button";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useWeb3 } from "../providers";
import { useAccount, useNetwork } from "../web3/hooks";
import NavbarMobile from "./NavbarMobile";

const Navbar = (): JSX.Element => {
  const { connect, isLoading, requireInstall } = useWeb3();
  const router = useRouter();
  const { account } = useAccount();
  const { network } = useNetwork();

  return (
    <>
      <Disclosure as="nav" className="bg-white shadow">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="-ml-2 mr-2 flex items-center md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex-shrink-0 flex items-center">
                    <Logo />
                  </div>
                  <div className="hidden md:ml-6 md:flex md:space-x-8">
                    {/* Current: "border-green-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                    <Link href="/">
                      <a className="border-green-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                        Campaigns
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {isLoading ? (
                      <Button
                        type="button"
                        className="cursor-not-allowed opacity-50"
                        disabled
                      >
                        Loading...
                      </Button>
                    ) : account.data ? (
                      <Button
                        type="button"
                        variant="green"
                        onClick={() => router.push("/campaigns/create")}
                      >
                        <span>New campaign</span>
                      </Button>
                    ) : requireInstall ? (
                      <Button
                        type="button"
                        onClick={() =>
                          window.open(
                            "https://metamask.io/download.html",
                            "_blank"
                          )
                        }
                      >
                        <span>Install Metamask</span>
                      </Button>
                    ) : (
                      <Button type="button" onClick={connect}>
                        <span>Connect Wallet</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <NavbarMobile />
          </>
        )}
      </Disclosure>
      {account.data && (
        <div className="flex flex-col sm:flex-row sm:justify-end max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="text-sm truncate py-2 px-4 sm:px-6 lg:px-8 rounded-none md:rounded-bl md:w-auto w-full bg-green-500 text-white">
            {account.data}
          </div>
          <div className="text-sm py-2 px-4 sm:px-6 lg:px-8 rounded-none md:rounded-br md:w-auto w-full bg-yellow-500 text-white">
            {network.data}
            {network.hasInitialResponse && !network.isSupported && (
              <span className="ml-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Unsupported
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
