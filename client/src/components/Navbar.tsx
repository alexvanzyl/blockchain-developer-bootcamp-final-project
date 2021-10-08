/* eslint-disable @next/next/no-img-element */
import Button from "@components/Button";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Logo from "./Logo";
import NavbarMobile from "./NavbarMobile";
import { useWeb3 } from "./providers";
import { useAccount } from "./web3/hooks/useAccount";

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = (): JSX.Element => {
  const { connect, isLoading, isWeb3Loaded } = useWeb3();
  const { account } = useAccount();

  return (
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
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  <Logo />
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  {/* Current: "border-green-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  <a
                    href="#"
                    className="border-green-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Campaigns
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {isLoading ? (
                    <Button
                      type="button"
                      className="cursor-not-allowed opacity-50 relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      disabled
                    >
                      Loading...
                    </Button>
                  ) : isWeb3Loaded ? (
                    <Button type="button" onClick={connect}>
                      <span>Connect Wallet</span>
                    </Button>
                  ) : (
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
                  )}
                </div>
              </div>
            </div>
          </div>
          <NavbarMobile />
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
