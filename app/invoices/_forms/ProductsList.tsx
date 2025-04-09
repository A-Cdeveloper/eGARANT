import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/types";

const ProductsList = ({ products }: { products: Product[] }) => {
  return (
    <div className="border-y-2 border-primary/10 bg-white my-3 text-[15px]">
      <div className="hidden sm:grid sm:grid-cols-[250px_140px_150px_1fr] py-1 bg-primary/20 px-4 font-semibold">
        <div>Artikal</div>
        <div>Cena</div>
        <div>Garancija</div>
        <div></div>
        <div></div>
      </div>
      {products.map((item) => {
        return (
          <div
            key={item.productId}
            className="grid grid-cols-[230px_120px_150px_1fr] p-4 items-center text-[14px] 
          border-b border-primary/10 space-y-[8px] sm:space-y-0 gap-5 bg-amber-400"
          >
            <div>
              <Textarea
                defaultValue={""}
                placeholder="Naziv artikla"
                ref={productNameRef}
              />
            </div>
            <div className="flex gap-1 items-center">
              <Input type="number" defaultValue={""} ref={productPriceRef} />{" "}
              RSD
            </div>
            <div>
              <div className="flex gap-1 items-center">
                <Input
                  type="number"
                  defaultValue={""}
                  className="w-[60px] p-2"
                  ref={productPeriodRef}
                />{" "}
                mes
              </div>
            </div>
            <div className="text-end">
              <Button variant="secondary" onClick={addProductHandler}>
                Snimi
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsList;
