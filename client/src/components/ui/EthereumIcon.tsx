const EthereumIcon = (props: React.ComponentProps<"svg">): JSX.Element => {
  return (
    <svg
      viewBox="-116 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <path d="m140.28125 333.582031-140.28125-66.734375 140.28125 245.152344 140.285156-245.152344zm0 0" />
      <path d="m265.289062 217.117188-125.007812-217.117188-125.148438 217.367188 125.148438-59.367188zm0 0" />
      <path d="m25.980469 245.535156 114.300781 54.140625 114.492188-54.230469-114.492188-54.136718zm0 0" />
    </svg>
  );
};

export default EthereumIcon;
