import React from "react";
import { Input } from "../ui/input";
import Image from "next/image";

type Props = {
  title: string;
  image: string;
  changeHandler: (params: any) => void;
};

const ImageHolder = (props: Props) => {
  const { image, changeHandler, title } = props;

  return (
    <div className="flex flex-col">
      <h3>{title}</h3>
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => changeHandler(e.target.files?.[0])}
        required
      />
      <div className="preview flex justify-center align-center m-2">
        {image ? (
          <Image
            src={image}
            alt="Converted Image"
            width={200}
            height={200}
            unoptimized
          />
        ) : null}
      </div>
    </div>
  );
};

export default ImageHolder;
