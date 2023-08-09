import { SearchParamsTypes } from "@/types/SearchParams";
import Image from "next/image";
import formatPrice from "@/utils/PriceFormat";
import AddCart from "./AddCart";
import { getProducts } from "@/app/page";

const Product = async ({ params }: SearchParamsTypes) => {
  const products = await getProducts();
  const product = products.find((p) => p.id == params.id);

  return (
    <div className=" flex flex-col xl:flex-row 2xl:flex-row items-center justify-between sm:gap-8 gap-16 px-2">
      <Image
        src={product?.image as string}
        alt={product?.name as string}
        width={450}
        height={300}
        className="rounded-md w-auto"
      />
      <div className="font-medium">
        <h1 className="text-2xl py-2">
          {product?.name as string}
        </h1>
        <p>{product?.description as string}</p>

        <div className="collapse collapse-arrow bg-base-200 my-2">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium collapse">
            What are Lightroom presets?
          </div>
          <div className="collapse-content">
            <p>
              A Lightroom preset is a filter with predetermined settings and it
              can get you close to the desired effect quickly. It helps in
              post-processing or photo editing, saves time & energy, and most
              importantly it allows us to achieve certain looks that are hard to
              achieve.

              Remember, a Lightroom preset isn’t a magic wand. Sometimes, it
              might nail it right out of the gate, and sometimes it might not.
              What it does though is very quickly get you close to the desired
              effect, and then you can tweak it to your vision.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200 my-2">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            How to Install Lightroom Presets on Desktop
          </div>
          <div className="collapse-content">
            <p>
              Open Lightroom Classic and go to the Develop module. Make sure to
              import a photo into Lightroom Module.
            </p>
            <p>
              On the left panel, click on the (+) icon in the Presets Panel.
            </p>
            <p>
              Select Import from the dropdown menu.
            </p>
            <p>
              Find the ZIP file of presets or .xmp file and import the presets.
            </p>
            <p>
              You’re done, you should see all of your presets in the Presets
              Panel.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <p className="font-bold">
            {product?.unit_amount && formatPrice(product?.unit_amount)}
          </p>
        </div>
        <AddCart {...product} />
      </div>
    </div>
  );
};

export default Product;
