"use client";

import dynamic from "next/dynamic";

const DemoSection = dynamic(
  () => import("@components/landing/Demonstration").then(mod => mod.default || mod),
  { 
    ssr: false,
    loading: () => <div>Loading demo...</div>
  }
);

export default DemoSection;
