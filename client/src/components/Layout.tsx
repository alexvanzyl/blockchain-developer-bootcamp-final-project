import Navbar from "@components/Navbar";
import { Web3Provider } from "./providers";

type LayoutProps = {
  pageName: string;
  children: React.ReactNode;
};

const Layout = ({ pageName, children }: LayoutProps): JSX.Element => {
  return (
    <Web3Provider>
      <Navbar />
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              {pageName}
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">{children}</div>
          </div>
        </main>
      </div>
    </Web3Provider>
  );
};

export default Layout;
