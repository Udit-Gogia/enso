import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/Select";
import useActiveCategories from "../hooks/useActiveCategories";
import useVendorSearch from "../hooks/useVendorSearch";
import { MagneticDots } from "@/components/common/MagneticDots";
import { CITIES } from "@/constants/cities";
import VendorSearchCard from "../components/VendorSearchCard";
import { Button } from "@/components/ui/button";

export default function VendorSearchPage() {
  const [keyword, setKeyword] = useState("");
  const [categoryCode, setCategoryCode] = useState("");
  const [location, setLocation] = useState("");

  const { categories } = useActiveCategories();
  const { results, loading, hasSearched, search } = useVendorSearch();
  const categoryCodeByName = new Map(categories.map((c) => [c.name, c.code]));
  function handleSearch() {
    search({
      name: keyword,
      category: categoryCodeByName.get(categoryCode) ?? undefined,
      location,
    });
  }

  // return (
  //   <section className="bg-white p-4 rounded-xl h-full w-full shadow-md overflow-y-auto">
  //     <h1 className="text-lg font-semibold text-ink mb-4">Find Vendors</h1>

  //     {loading && <p className="text-ink-muted">Searching...</p>}

  //     {!loading && hasSearched && results.length === 0 && (
  //       <p className="text-ink-muted">
  //         No vendors matched. Try widening your filters.
  //       </p>
  //     )}

  //     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //       {results.map((vendor) => (
  //         <div
  //           key={vendor.vendorId}
  //           className="border border-border rounded-xl p-4 flex flex-col gap-2"
  //         >
  //           <div className="flex items-center justify-between">
  //             <h3 className="font-semibold text-ink">{vendor.businessName}</h3>
  //             {vendor.isVerified && (
  //               <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
  //                 Verified
  //               </span>
  //             )}
  //           </div>
  //           {vendor.location && (
  //             <p className="text-sm text-ink-muted">{vendor.location}</p>
  //           )}
  //           {vendor.bio && (
  //             <p className="text-sm text-ink-secondary">{vendor.bio}</p>
  //           )}
  //           <div className="flex flex-wrap gap-1 mt-1">
  //             {vendor.categories.map((code) => (
  //               <span
  //                 key={code}
  //                 className="text-xs px-2 py-0.5 rounded-full bg-surface-page text-ink-secondary"
  //               >
  //                 {categoryNameByCode.get(code) ?? code}
  //               </span>
  //             ))}
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </section>
  // );

  return (
    <section className="bg-surface p-4 rounded-xl  w-full relative h-full">
      <MagneticDots
        palette="Google"
        intensity={1}
        className="absolute inset-0 h-full w-full"
      />

      <div className="relative z-20 h-full pointer-events-auto">
        <div className="max-w-5xl mx-auto p-8 pt-0 space-y-6 font-sans overflow-x-hidden h-full">
          <div className="relative">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-fit"
              style={{
                height: "100%",
                background:
                  "radial-gradient(ellipse 720px 300px at 50% 48%, rgba(255,255,255,.9), rgba(255,255,255,0) 68%)",
              }}
            />
            <div className="relative z-20 h-full">
              <h1 className="text-2xl font-bold text-ink-900">
                Search Vendors
              </h1>
              <p className="text-ink-muted text-sm ">Search vendors</p>
            </div>
          </div>
          <div className="relative z-30">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-fit"
              style={{
                height: "100%",
                background:
                  "radial-gradient(ellipse 720px 300px at 50% 48%, rgba(255,255,255,.9), rgba(255,255,255,0) 68%)",
              }}
            />
            <div className="relative z-20 ">
              <div className="flex flex-col md:flex-row gap-3 items-stretch mb-6">
                <Input
                  type="text"
                  placeholder="Enter keyword / business name"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="flex-1 placeholder:font-normal "
                />
                <Select
                  options={categories.map((c) => ({
                    code: c.code,
                    name: c.name,
                  }))}
                  value={categoryCode}
                  onChange={setCategoryCode}
                  placeholder="Select category"
                  persona="customer"
                  containerClassName="flex-1 py-2.5 "
                />
                <Select
                  options={CITIES}
                  value={location}
                  onChange={(city) => setLocation(city)}
                  placeholder="Select Location"
                  persona="customer"
                  containerClassName="flex-1 py-2.5"
                />

                <Button
                  onClick={handleSearch}
                  className="flex items-center gap-2 px-6 py-1 rounded-xl text-sm font-semibold
                               text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97] hover:shadow-xl "
                  style={{ backgroundColor: "#16161D" }}
                >
                  <SearchIcon size={16} />
                  Search
                </Button>
              </div>
            </div>
          </div>

          {loading && <p className="text-ink-muted">Searching...</p>}

          {!loading && hasSearched && results.length === 0 && (
            <p className="text-ink-muted">
              No vendors matched. Try widening your filters.
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            {results.map((vendor) => (
              <VendorSearchCard key={vendor.vendorId} vendor={vendor} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
