type Props = {
  children: React.ReactNode;
  type: "button" | "submit";
  className?: string | undefined;
  disabled?: boolean;
  onClick?: () => void;
};

const Button = ({
  children,
  className = "text-white bg-green-600 hover:bg-green-700 focus:ring-green-500",
  ...rest
}: Props): JSX.Element => {
  return (
    <button
      {...rest}
      className={`${className} relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2`}
    >
      <span>{children}</span>
    </button>
  );
};

export default Button;
