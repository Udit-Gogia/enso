"use client";

import { createColumnHelper } from "@tanstack/react-table";

import { type DataTableFeatures } from "./data-table-features";
import { ServiceOfferingRef } from "@/features/MyProfile/constants/types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  category: string;
  service: number;
};

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<
  DataTableFeatures,
  ServiceOfferingRef
>();

export const columns = columnHelper.columns([
  columnHelper.accessor("categoryCode", {
    header: "Catgory",
  }),
  columnHelper.accessor("categoryName", {
    header: "Email",
  }),
]);
