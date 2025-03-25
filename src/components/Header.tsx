import Link from "next/link";
// import SearchInput from "@/app/search-products/SearchInput";

export default function Header() {
  // TODO: Add search input component
  return (
    <header className="py-4 shadow">
      <div className="container">
        <nav className="flex items-center justify-end gap-1">
          <Link
            className="me-auto text-xl font-semibold tracking-tight md:text-2xl"
            href={"/"}
          >
            Home
          </Link>
          {/* <SearchInput q={""} /> */}
        </nav>
      </div>
    </header>
  );
}
