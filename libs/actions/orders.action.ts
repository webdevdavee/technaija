"use server";

import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import Orders from "../database/models/order.model";

export const createOrder = async (order: CreateOrderParam) => {
  try {
    await connectToDatabase();
    const newOrder = await Orders.create(order);
    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
};

// Get Orders
export const getUserOrders = async ({
  limit,
  page,
  userId,
  status,
}: GetUserOrdersParams) => {
  try {
    await connectToDatabase();

    let ordersQuery;

    // Aggregation pipeline to get all counts in one go
    const [counts] = await Orders.aggregate([
      {
        $match: {
          userId: userId, // filter by userId
        },
      },
      {
        $group: {
          _id: "$userId", // group by userId
          total: { $sum: 1 },
          success: {
            $sum: { $cond: [{ $eq: ["$status", "success"] }, 1, 0] },
          },
          pending: {
            $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
          },
          failed: {
            $sum: { $cond: [{ $eq: ["$status", "failed"] }, 1, 0] },
          },
        },
      },
    ]);

    let totalCount;
    let successCount;
    let pendingCount;
    let failedCount;

    if (counts) {
      const { total, success, pending, failed } = counts;
      totalCount = total;
      successCount = success;
      pendingCount = pending;
      failedCount = failed;
    }

    // Get the total number of the current order query (this is necessary because the query could change if status is defined)
    const totalPages = Math.ceil(
      status === "success" && counts
        ? successCount / limit
        : status === "pending"
        ? pendingCount / limit
        : status === "failed"
        ? failedCount / limit
        : totalCount / limit
    );

    const pageNumbers: number[] = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    // Construct the query based on status and page
    let query = { ...(status && { status }), userId };

    ordersQuery = Orders.find(query).limit(limit).sort({ date: -1 });

    // Apply pagination if page is provided
    if (page) {
      ordersQuery = ordersQuery.skip((page - 1) * limit);
    }

    const orders = await ordersQuery;

    return {
      orders: JSON.parse(JSON.stringify(orders)),
      pageNumbers: pageNumbers,
      ordersCount: totalCount,
      ordersSuccessCount: successCount,
      ordersPendingCount: pendingCount,
      ordersFailedCount: failedCount,
    };
  } catch (error) {
    handleError(error);
  }
};

// export const getUserOrders = async ({
//   limit,
//   page,
//   userId,
// }: GetUserOrdersParams) => {
//   try {
//     await connectToDatabase();

//     let ordersQuery;

//     ordersQuery = Orders.find({ userId }).limit(limit).sort({ date: -1 });

//     const ordersCount = await Orders.find({}).countDocuments();

//     // Apply pagination if page is provided
//     if (page) {
//       ordersQuery = ordersQuery.skip((page - 1) * limit);
//     }

//     // Get the total number of the current orders query
//     const totalPages = Math.ceil(ordersCount / limit);

//     const pageNumbers: number[] = [];

//     for (let i = 1; i <= totalPages; i++) {
//       pageNumbers.push(i);
//     }

//     const orders = await ordersQuery;

//     return {
//       orders: JSON.parse(JSON.stringify(orders)),
//       pageNumbers,
//     };
//   } catch (error) {
//     handleError(error);
//   }
// };
