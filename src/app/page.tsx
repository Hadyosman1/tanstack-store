import Banner from "@/components/home/Banner";
import Products from "../components/products/ProductList";
import FilterSidebar from "@/components/home/FilterSidebar";
import Categories from "@/components/categories/Categories";

export default function ProductsPagination() {
  return (
    <div className="space-y-8 py-8">
      <div className="container space-y-7">
        <Banner />
        <Categories />
      </div>

      <main className="mx-auto flex max-w-[1460px] gap-4 px-4 max-lg:flex-col">
        <FilterSidebar className="bg-secondary sticky top-10 z-10 w-full shrink-0 self-start rounded p-4 shadow lg:w-80" />
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <Products />
        </div>
      </main>
    </div>
  );
}
