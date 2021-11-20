import { ChartSquareBarIcon } from "@heroicons/react/outline";
import { classNames } from "src/utils";

const navigation = [
  {
    name: "Expenditures",
    href: "expenditures",
    icon: ChartSquareBarIcon,
    current: false,
    count: "5",
  },
];

const CampaignDetailsSidebar = (): JSX.Element => {
  return (
    <nav className="space-y-1 mt-5" aria-label="Sidebar">
      {navigation.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className={classNames(
            item.current
              ? "bg-gray-100 text-gray-900"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
            "group flex items-center px-3 py-2 text-sm font-medium rounded-md"
          )}
          aria-current={item.current ? "page" : undefined}
        >
          <item.icon
            className={classNames(
              item.current
                ? "text-gray-500"
                : "text-gray-400 group-hover:text-gray-500",
              "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
            )}
            aria-hidden="true"
          />
          <span className="truncate">{item.name}</span>
          {item.count ? (
            <span
              className={classNames(
                item.current
                  ? "bg-white"
                  : "bg-gray-100 group-hover:bg-gray-200",
                "ml-auto inline-block py-0.5 px-3 text-xs rounded-full"
              )}
            >
              {item.count}
            </span>
          ) : null}
        </a>
      ))}
    </nav>
  );
};

export default CampaignDetailsSidebar;
