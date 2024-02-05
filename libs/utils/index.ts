export const handleError = (error: unknown) => {
  console.error(error);
  throw new Error(typeof error === "string" ? error : JSON.stringify(error));
};

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

export const formatNumber = (number: number | undefined, prefix = "") => {
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

import { ReadonlyURLSearchParams } from "next/navigation";
export const createURL = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramString = params.toString();
  const queryString = `${paramString.length ? "?" : ""}${paramString}`;
  return `${pathname}${queryString}`;
};
