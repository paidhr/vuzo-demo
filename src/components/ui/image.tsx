import React from "react";
import defaultImg from "@/assets/images/avatar.svg";

type Props = {
  src: string;
  alt: string;
  className: string;
  defaultImage?: string;
};

const ImageComponent: React.FC<Props> = ({
  src,
  alt,
  className,
  defaultImage,
}) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = defaultImage ? defaultImage : defaultImg;
  };

  return (
    <img src={src} alt={alt} onError={handleImageError} className={className} />
  );
};

export default ImageComponent;
