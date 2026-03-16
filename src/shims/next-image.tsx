import type { ImgHTMLAttributes } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
};

export default function NextImage({ fill, style, ...rest }: Props) {
  return (
    <img
      {...rest}
      style={
        fill
          ? {
              ...(style || {}),
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }
          : style
      }
    />
  );
}
