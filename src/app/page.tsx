import Banner from "@/components/home/Banner";
import FilterSidebar from "@/components/home/FilterSidebar";
import Categories from "@/components/categories/Categories";
import Products from "@/components/home/Products";

export default function HomePage() {
  return (
    <div className="space-y-8 py-8">
      <div className="container space-y-7">
        <Banner />
        <Categories />
      </div>

      <main className="mx-auto flex max-w-[1460px] gap-4 px-4 max-md:flex-col">
        <FilterSidebar className="bg-card sticky top-[calc(var(--header-height)+(var(--spacing)_*_4))] z-10 w-full shrink-0 self-start p-4 shadow md:w-72" />
        <Products />
      </main>
    </div>
  );
}
