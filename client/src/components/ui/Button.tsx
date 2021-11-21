import { classNames } from "src/utils";

type Props = {
  children: React.ReactNode;
  type: "button" | "submit";
  className?: string | undefined;
  variant?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
  onClick?: () => void;
};

const Button = ({
  children,
  className,
  variant = "green",
  size = "md",
  ...rest
}: Props): JSX.Element => {
  const variants: Record<string, string> = {
    green: "text-white bg-green-600 hover:bg-green-700 focus:ring-green-500",
    yellow:
      "text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500",
  };

  const sizes: Record<string, string> = {
    xs: "px-3 py-1.5 text-xs",
    sm: "px-3.5 py-2 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2 text-base",
    xl: "px-6 py-3 text-base",
  };

  return (
    <button
      {...rest}
      className={classNames(
        `${className}`,
        variants[variant],
        sizes[size],
        rest.disabled ? "opacity-60 cursor-not-allowed" : "",
        "relative inline-flex items-center border border-transparent font-medium rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
      )}
    >
      <span>{children}</span>
    </button>
  );
};

export default Button;
