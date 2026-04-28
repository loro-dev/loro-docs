import dynamic from "next/dynamic";

export default dynamic(
  () => import("@components/landing/Demonstration"),
  { ssr: false }
);
