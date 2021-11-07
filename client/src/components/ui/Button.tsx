type Props = {
  children: React.ReactNode;
  type: "button" | "submit";
  className?: string | undefined;
  variant?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const Button = ({
  children,
  className,
  variant = "green",
  ...rest
}: Props): JSX.Element => {
  const variants: Record<string, string> = {
    green: "text-white bg-green-600 hover:bg-green-700 focus:ring-green-500",
    yellow:
      "text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500",
  };

  return (
    <button
      {...rest}
      className={`${className} ${variants[variant]} relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2`}
    >
      <span>{children}</span>
    </button>
  );
};

export default Button;
