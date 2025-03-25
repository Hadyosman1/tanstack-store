import SearchInput from "./SearchInput";

interface SearchProductsPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchProductsPage({
  searchParams,
}: SearchProductsPageProps) {
  // TODO: Remove this page or make it to display search results
  const { q } = await searchParams;

  return (
    <main className="container mx-auto px-4 py-6 lg:max-w-[1280px]">
      <h1 className="text-2xl font-bold">Search products page</h1>
      <div className="mx-auto">
        <SearchInput q={q ?? ""} />
        {/* <Products /> */}
      </div>
    </main>
  );
}
