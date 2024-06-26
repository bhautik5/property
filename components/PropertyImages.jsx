import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";

const PropertyImages = ({ images }) => {
  return (
    <Gallery>
      <section className="bg-blue-50 p-4">
        <div className="container mx-auto">
          {images.length === 1 ? (
            <Item
              original={images[0]}
              thumbnail={images[0]}
              width="760"
              height="400"
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={images[0]}
                  alt=""
                  className="object-cover h-[400px] w-full mx-auto rounded-xl cursor-pointer"
                  width={0}
                  height={0}
                  sizes="100vw"
                  priority={true}
                />
              )}
            </Item>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`${
                    images.length === 3 && index === 2
                      ? `col-span-2`
                      : `col-span-1`
                  }`}
                >
                  <Item original={img} thumbnail={img} width="760" height="400">
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={img}
                        alt=""
                        className="object-cover h-[400px] w-full rounded-xl cursor-pointer"
                        width={0}
                        height={0}
                        sizes="100vw"
                        priority={true}
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
};

export default PropertyImages;
