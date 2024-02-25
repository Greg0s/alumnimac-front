import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
// Icons
import { HiOutlineSearch } from "react-icons/hi";
// Style
import "@/styles/search.scss";

export function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const placeholders = [
    "un job",
    "une entreprise",
    "une ville",
    "un pays",
    "un étudiant",
  ];
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPlaceholder((prevPlaceholder) => {
        const currentIndex = placeholders.indexOf(prevPlaceholder);
        const nextIndex = (currentIndex + 1) % placeholders.length;
        return placeholders[nextIndex];
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, [placeholders]);

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="search">
      <HiOutlineSearch className="search__icon" />
      <input
        className="search__input"
        type="text"
        placeholder={"Recherche " + currentPlaceholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
}
