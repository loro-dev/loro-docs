import { SVGAttributes } from "react";

export default function TwitterIcon(props: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
    >
      <path
        d="M16.7237 2.0625H19.756L13.1313 9.63417L20.9248 19.9375H14.8225L10.043 13.6886L4.5742 19.9375H1.54004L8.62587 11.8387L1.14954 2.0625H7.40671L11.727 7.77425L16.7237 2.0625ZM15.6595 18.1225H17.3397L6.4937 3.78217H4.69062L15.6595 18.1225Z"
        fill="white"
      />
    </svg>
  );
}
