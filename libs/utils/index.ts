// Handle error
export const handleError = (error: unknown) => {
  console.error(error);
  throw new Error(typeof error === "string" ? error : JSON.stringify(error));
};

// Format date
export const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  // Function to get the ordinal suffix for a given day
  function getOrdinalSuffix(day: number) {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
};

// Format price
export const formatNumber = (
  number: number | undefined,
  prefix: string | undefined = ""
) => {
  // Check if the number is defined
  if (number === undefined) {
    // Return an empty string or a message
    return "";
  }

  // Convert the number to a string with a fixed number of decimals (2 by default)
  let numberString = number.toFixed(2);

  // Split the string into integer and fraction parts
  let [integer, fraction] = numberString.split(".");

  // Add commas to the integer part every three digits from the right
  integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Return the formatted string with the prefix
  return prefix + integer + "." + fraction;
};

// Create URL
import { ReadonlyURLSearchParams } from "next/navigation";
export const createURL = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramString = params.toString();
  const queryString = `${paramString.length ? "?" : ""}${paramString}`;
  return `${pathname}${queryString}`;
};

export const discountPrice = (originalPrice: number, discount?: number) => {
  // Calculate the discounted price
  const discountedPrice = discount
    ? originalPrice - (originalPrice * discount) / 100
    : originalPrice;

  // Format the discounted price and return it
  return {
    formatedPrice: formatNumber(discountedPrice, "₦"),
    discountedPrice: discountedPrice,
  };
};

// Convert currency
// export const convertCurrency = async ({
//   salesPrice,
//   price,
//   previousCurrency,
//   currentCurrency,
// }: CurrencyConverter) => {
//   const salesPriceUrl = `https://currency-converter-pro1.p.rapidapi.com/convert?from=${previousCurrency}&to=${currentCurrency}&amount=${
//     salesPrice ? salesPrice : price
//   }`;

//   const priceUrl = `https://currency-converter-pro1.p.rapidapi.com/convert?from=${previousCurrency}&to=${currentCurrency}&amount=${price}`;

//   const options = {
//     method: "GET",
//     headers: {
//       "X-RapidAPI-Key": "1414ad306emsh9e1d4b9ec0f61abp1ce22ajsndbe5f3d479af",
//       "X-RapidAPI-Host": "currency-converter-pro1.p.rapidapi.com",
//     },
//   };

//   try {
//     const salesPriceResponse = await fetch(salesPriceUrl, options);
//     const priceResponse = await fetch(priceUrl, options);

//     const salesPriceData = await salesPriceResponse.json();
//     const priceData = await priceResponse.json();

//     const convertedSalePrice: number = salesPriceData.result;
//     const convertedPrice: number = priceData.result;

//     return {
//       convertedSalePrice,
//       convertedPrice,
//     };
//   } catch (error) {
//     console.error(error);
//   }
// };
