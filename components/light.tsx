export function Light({ size = 300 }: { size?: number }) {
  return (
    <div
      className="blur-light absolute -z-10 left-0 right-0 m-auto"
      style={{ top: 120, width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 361 366"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M245.712 62.7851L114.974 302.197C52.431 264.754 30.1208 184.253 65.369 119.706C100.617 55.1581 180.402 30.4094 245.712 62.7851Z"
          fill="#85DFED"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M115 302.411L245.738 63C308.281 100.442 330.591 180.943 295.343 245.491C260.095 310.038 180.31 334.787 115 302.411Z"
          fill="#6B218E"
        />
      </svg>
    </div>
  );
}
