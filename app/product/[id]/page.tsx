import { SearchParamsTypes } from "@/types/SearchParams";
import Image from "next/image";
import formatPrice from "@/utils/PriceFormat";
import AddCart from "./AddCart";

const Product = async ({ searchParams }: SearchParamsTypes) => {
  return (
    <div className=" flex flex-col 2xl:flex-row items-center justify-between gap-24 text-gray-700">
      <Image
        src={searchParams.image}
        alt={searchParams.name}
        width={600}
        height={600}
      />
      <div className="font-medium text-gray-700">
        <h1 className="text-2xl py-2">{searchParams.name}</h1>
        <p>{searchParams.description}</p>
        <p>{searchParams.features}</p>

        <div className="flex gap-2">
          <p className="font-bold text-teal-700">
            {searchParams.unit_amount && formatPrice(searchParams.unit_amount)}
          </p>
        </div>
        <AddCart {...searchParams} />
      </div>
    </div>
  );
};

export default Product;
