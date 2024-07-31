import { IProduct } from "@/libs/database/models/product.model";
import { useState, Dispatch, SetStateAction } from "react";
import Image from "next/image";

type GalleryProp = {
  data: IProduct;
  currentImage: string;
  setCurrentImage: Dispatch<SetStateAction<string>>;
};

const ProductGallery = ({
  data,
  currentImage,
  setCurrentImage,
}: GalleryProp) => {
  const [zoom, setZoom] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const element = e.target as Element;
    const { left, top, width, height } = element.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <span className="flex gap-2 items-start overflow-hidden m:flex-col">
      <span className="custom-scrollbar h-[90%] flex flex-col gap-8 hover:overflow-y-scroll m:overflow-x-scroll m:order-2 m:flex-row">
        {data.gallery?.map((img, index) => (
          <Image
            key={`${img}-${index}`}
            className="cursor-pointer"
            width={100}
            height={100}
            src={img.image}
            alt="image"
            onClick={() => setCurrentImage(img.image)}
          />
        ))}
      </span>
      <span className="overflow-hidden m:order-1">
        <Image
          src={currentImage}
          className={`transition-transform duration-700 ${
            zoom ? "scale-[2] cursor-crosshair" : "scale-[1]"
          }`}
          style={{
            transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
          }}
          width={450}
          height={450}
          quality={100}
          alt="product-img"
          onMouseEnter={() => setZoom(true)}
          onMouseMove={(e) => handleMouseMove(e)}
          onMouseLeave={() => setZoom(false)}
        />
      </span>
    </span>
  );
};

export default ProductGallery;
