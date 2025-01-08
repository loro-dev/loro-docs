import type { Meta, StoryObj } from "@storybook/react";
// import { within, userEvent } from "@storybook/testing-library";

import Timeline from "../components/TimelineView";

const meta = {
  title: "LandingPage/Timeline",
  component: Timeline,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "dark" },
  },
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

// export const Default: Story = {
//   args: {
//     history: {
//       tracks: [
//         {
//           peerId: 0,
//           changes: [
//             { lamport: 0, length: 1, timestamp: new Date() },
//             { lamport: 3, length: 2, timestamp: new Date() },
//             { lamport: 7, length: 2, timestamp: new Date() },
//             { lamport: 10, length: 5, timestamp: new Date() },
//             { lamport: 17, length: 3, timestamp: new Date() },
//             { lamport: 21, length: 1, timestamp: new Date() },
//             { lamport: 24, length: 2, timestamp: new Date() },
//             { lamport: 29, length: 1, timestamp: new Date() },
//             { lamport: 33, length: 2, timestamp: new Date() },
//           ],
//         },
//         {
//           peerId: 1,
//           changes: [
//             { lamport: 0, length: 2, timestamp: new Date() },
//             { lamport: 2, length: 1, timestamp: new Date() },
//             { lamport: 6, length: 1, timestamp: new Date() },
//             { lamport: 9, length: 2, timestamp: new Date() },
//             { lamport: 12, length: 2, timestamp: new Date() },
//             { lamport: 20, length: 1, timestamp: new Date() },
//             { lamport: 24, length: 5, timestamp: new Date() },
//             { lamport: 33, length: 3, timestamp: new Date() },
//             { lamport: 37, length: 6, timestamp: new Date() },
//           ],
//         },
//       ],
//       totalLength: 42,
//       currentVersion: 5,
//     },
//   },
// };
