// Handle error
export const handleError = (error: any) => {
  console.error(error);
  throw new Error(error.message);
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

// Utility function to convert date format
export const convertDateFormat = (dateString: string) => {
  // Create a new Date object from the given string
  let date = new Date(dateString);

  // Get the day of the month (1-31)
  let day = date.getDate();

  // Get the month (0-11) and add 1 to get the correct number (1-12)
  let month = date.getMonth() + 1;

  // Get the full year (four digits)
  let year = date.getFullYear();

  // Add ordinal suffix to the day (st, nd, rd, or th)
  let ordinal = "";
  if (day % 10 == 1 && day != 11) {
    ordinal = "st";
  } else if (day % 10 == 2 && day != 12) {
    ordinal = "nd";
  } else if (day % 10 == 3 && day != 13) {
    ordinal = "rd";
  } else {
    ordinal = "th";
  }

  // Create an array of month names
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the name of the month from the array
  let monthName = monthNames[month - 1];

  // Concatenate the day, month name, and year with spaces
  let formattedDate = day + ordinal + " " + monthName + ", " + year;

  // Return the formatted date
  return formattedDate;
};

export const formatDateToCustom = (dateString: string) => {
  const inputDate = new Date(dateString);
  const year = inputDate.getUTCFullYear();
  const month = (inputDate.getUTCMonth() + 1).toString().padStart(2, "0"); // Adjust month to 1-based index
  const day = inputDate.getUTCDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};
