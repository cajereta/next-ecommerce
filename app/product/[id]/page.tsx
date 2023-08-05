import { SearchParamsTypes } from "@/types/SearchParams";
import Image from "next/image";
import formatPrice from "@/utils/PriceFormat";
import AddCart from "./AddCart";
import { getProducts } from "@/app/page";

const Product = async ({ params }: SearchParamsTypes) => {
  const products = await getProducts();
  const product = products.find((p) => p.id == params.id);
  console.log(product);

  return (
    <div className=" flex flex-col 2xl:flex-row items-center justify-between gap-24 text-gray-700">
      <Image
        src={product?.image as string}
        alt={product?.name as string}
        width={600}
        height={600}
      />
      <div className="font-medium text-gray-700">
        <h1 className="text-2xl py-2">{product?.name as string}</h1>
        <p>{product?.description as string}</p>

        <div className="flex gap-2">
          <p className="font-bold text-teal-700">
            {product?.unit_amount && formatPrice(product?.unit_amount)}
          </p>
        </div>
        <AddCart {...product} />
      </div>
    </div>
  );
};

export default Product;
