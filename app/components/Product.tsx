import { ProductType } from "@/types/ProductType";
import Image from "next/image";
import formatPrice from "@/utils/PriceFormat";
import Link from "next/link";

const Product = (
  { name, image, unit_amount, id, description, metadata }: ProductType,
) => {
  const { features } = metadata;

  return (
    <Link
      href={{
        pathname: `/product/${id}`,
        query: { name, image, unit_amount, id, description, features },
      }}
    >
      <div className="text-gray-700">
        <Image
          src={image}
          alt={name}
          width={400}
          height={400}
          className="w-full h-96 rounded-lg"
        />
        <div className="font-medium py-2 ">
          <h1>{name}</h1>
          <h2 className="text-sm text-teal-700">
            {unit_amount && formatPrice(unit_amount)}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default Product;