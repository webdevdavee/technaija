import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type SearchBoxProp = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
};

const SearchBox = ({ query, setQuery }: SearchBoxProp) => {
  const clearQuery = () => {
    setQuery("");
  };

  return (
    <section className="flex items-center justify-between gap-2 p-3 w-full border-[1px] border-gray-400">
      <input
        className="w-full transition text-sm font-light focus:border-[#272829] focus:transition focus:outline-none"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="search for items"
      />
      {!query ? (
        <Image
          className="cursor-pointer"
          src="/search.svg"
          width={20}
          height={20}
          alt="search"
        />
      ) : (
        <Image
          className="cursor-pointer"
          src="/close.svg"
          width={25}
          height={25}
          alt="search"
          onClick={clearQuery}
        />
      )}
    </section>
  );
};

export default SearchBox;
