// "use client";

// import Image from "next/image";
// import { countries } from "@/constants";
// import { useDispatch } from "react-redux";
// import { Dispatch, SetStateAction } from "react";
// import { setCurrentCurrency } from "@/libs/redux-state/features/currency/currencySlice";

// type CurrencyDropdownProps = {
//   openCurrencyDropdown: boolean;
//   setOpenCurrencyDropdown: Dispatch<SetStateAction<boolean>>;
//   currency: Country;
//   setCurrency: Dispatch<SetStateAction<Country>>;
// };

// const CurrencyDropdown = ({
//   openCurrencyDropdown,
//   setOpenCurrencyDropdown,
//   currency,
//   setCurrency,
// }: CurrencyDropdownProps) => {
//   const dispatch = useDispatch();

//   const handleCurrencyChange = async (country: Country) => {
//     setCurrency(country);
//     dispatch(setCurrentCurrency(country));
//     localStorage.setItem("current-currency", JSON.stringify(country));
//     localStorage.setItem("previous-currency", JSON.stringify(currency));
//     setOpenCurrencyDropdown(false);
//   };

//   return (
//     <span
//       className="w-full absolute bg-white p-2"
//       style={{ display: openCurrencyDropdown ? "block" : "none" }}
//     >
//       {countries.map((country) => (
//         <div
//           key={country.id}
//           className="flex items-center gap-2 border-1px border-[#272829] cursor-pointer mb-2"
//           onClick={() => handleCurrencyChange(country)}
//         >
//           <Image src={country.flag} width={20} height={20} alt={country.text} />
//           <p className="capitalize text-sm">{country.text}</p>
//         </div>
//       ))}
//     </span>
//   );
// };

// export default CurrencyDropdown;
