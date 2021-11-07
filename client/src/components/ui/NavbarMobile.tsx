import { Disclosure } from "@headlessui/react";
import Link from "next/link";

const NavbarMobile = (): JSX.Element => {
  return (
    <Disclosure.Panel className="md:hidden">
      <div className="pt-2 pb-3 space-y-1">
        {/* Current: "bg-green-50 border-green-500 text-green-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
        <Link href="/">
          <a className="bg-green-50 border-green-500 text-green-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6">
            Campaigns
          </a>
        </Link>
      </div>
    </Disclosure.Panel>
  );
};

export default NavbarMobile;
