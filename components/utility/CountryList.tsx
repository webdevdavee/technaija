"use client";

import { useEffect, useState } from "react";
import { countryList } from "@/constants";
import { TBillingSchema } from "@/libs/zod";
import { UseFormSetValue } from "react-hook-form";

type CountryListProp = {
  setValue: UseFormSetValue<TBillingSchema>;
  error?: any;
};

type Country = {
  id: number;
  name: string;
};

const CountryList = ({ setValue, error }: CountryListProp) => {
  const [country, setCountry] = useState("Nigeria");
  const [showCountryList, setShowCountryList] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setValue("country", country);
  }, []);

  const filteredCountrySearch = countryList.filter((country) =>
    country.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectCountry = (country: Country) => {
    setCountry(country.name);
    setValue("country", country.name);
    setShowCountryList(false);
  };

  return (
    <section className="w-full">
      <p className="text-base font-light">
        Country / Region <span className="text-red-400">*</span>
        {error}
      </p>
      <button
        type="button"
        className="w-full p-3 border-[1px] border-gray-400 text-left"
        onClick={() => setShowCountryList((prev) => !prev)}
      >
        {country}
      </button>
      {showCountryList && (
        <div className="w-full relative border-[1px] border-gray-400 pr-6">
          <input
            type="text"
            className="w-full m-3 p-2 transition border-[1px] border-gray-400 text-sm focus:border-[#272829] focus:transition focus:outline-none"
            onChange={(e) => setQuery(e.target.value)}
          />
          <ul className="w-full bg-white absolute flex flex-col max-h-40 overflow-x-hidden overflow-y-auto custom-scrollbar border-[1px] border-gray-400">
            {filteredCountrySearch.map((country) => (
              <li
                key={country.id}
                className="py-2 px-3 text-sm cursor-pointer hover:bg-gray-200 transition"
                onClick={() => handleSelectCountry(country)}
              >
                {country.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default CountryList;
