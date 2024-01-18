import { IProduct } from "@/libs/database/models/product.model";
import { useState } from "react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

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
    <span className="flex gap-2 items-start overflow-hidden">
      <span className="gallery-scroll h-[90%] flex flex-col gap-8 overflow-y-scroll">
        {data.gallery &&
          data.gallery.map((img, index) => (
            <Image
              key={index}
              className="cursor-pointer"
              width={100}
              height={100}
              src={img.image}
              alt="image"
              onClick={() => setCurrentImage(img.image)}
            />
          ))}
      </span>
      <span className="overflow-hidden">
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
