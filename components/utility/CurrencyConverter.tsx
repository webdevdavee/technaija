// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import CurrencyDropdown from "./CurrencyDropdown";

// const CurrencyConverter = () => {
//   const [openCurrencyDropdown, setOpenCurrencyDropdown] = useState(false);
//   const [amount, setAmount] = useState(0);
//   const [fromCurrency, setFromCurrency] = useState("NGN");
//   const [toCurrency, setToCurrency] = useState("USD");
//   const [convertedAmount, setConvertedAmount] = useState(0);

//   const [currency, setCurrency] = useState<Country>(() => {
//     return localStorage.getItem("current-currency")
//       ? JSON.parse(localStorage.getItem("current-currency")!)
//       : {
//           id: 1,
//           text: "NGN",
//           flag: "https://flagsapi.com/NG/flat/64.png",
//         };
//   });

//   const handleCurrencyDropdown = () => {
//     setOpenCurrencyDropdown((prev) => !prev);
//   };

//   return (
//     <section>
//       <div
//         className="flex items-center justify-end bg-[#272829] py-1 px-2 cursor-pointer"
//         onClick={handleCurrencyDropdown}
//       >
//         <div className="flex items-center gap-2">
//           <Image
//             src={currency?.flag}
//             width={20}
//             height={20}
//             alt={currency?.text}
//           />
//           <p className="text-white capitalize text-sm">{currency?.text}</p>
//         </div>
//       </div>
//       <div className="w-full relative">
//         <CurrencyDropdown
//           openCurrencyDropdown={openCurrencyDropdown}
//           setOpenCurrencyDropdown={setOpenCurrencyDropdown}
//           currency={currency}
//           setCurrency={setCurrency}
//         />
//       </div>
//     </section>
//   );
// };

// export default CurrencyConverter;
