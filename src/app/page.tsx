import Categories from "@/components/categories/Categories";
import Banner from "@/components/home/Banner";
import FiltersBar from "@/components/home/FiltersBar";
import Products from "@/components/home/Products";

export default function HomePage() {
  return (
    <div className="space-y-8 py-8">
      <main className="container mx-auto space-y-8">
        <Banner />
        <Categories />
        <div className="flex gap-4 max-md:flex-col">
          <FiltersBar />
          <Products />
        </div>
      </main>
    </div>
  );
}
