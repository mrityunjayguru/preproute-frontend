"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FaRegEdit } from "react-icons/fa";
import Image from "next/image";
import EDIT from "@/assets/vectors/edit-text 1.svg"

interface Column<T> {
  header: string;
  accessor: string | ((row: T) => any); // supports both dot-notation or function accessor
}

interface CommonTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (row: T) => void;
}

// Helper function to access nested properties using dot notation
const getValue = (obj: any, path: string) => {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
};

function CommonTable<T extends Record<string, any>>({
  data,
  columns,
  onEdit,
}: CommonTableProps<T>) {
 
  return (
    <div className="rounded-[10px] overflow-x-auto">
      <Table className="bg-gradient-to-t from-[#F0F9FF] to-white  border border-[#E6F4FF] px-5 py-5">
        <TableHeader className="bg-[#FF5635] text-white font-poppins font-medium text-sm">
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={col.header}
                className="text-[white] font-poppins font-medium text-sm text-left px-10 "
              >
                {col.header}
              </TableHead>
            ))}
            {onEdit && (
              <TableHead className="text-left px-10 text-white">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody className="text-[#222222] font-poppins font-medium text-sm">
          {data && data.length > 0 ? (
            data.map((row, index) => (
              <TableRow key={index} className=" ">
                {columns.map((col, colIndex) => {
                  const value =
                    typeof col.accessor === "function"
                      ? col.accessor(row)
                      : getValue(row, col.accessor);

                  return (
                    <TableCell
                      key={col.header}
                      className={
                        colIndex === 0
                          ? "text-[#FF5635] font-poppins font-normal px-10"
                          : "text-black font-poppins font-normal px-10"
                      }
                    >
                      {value !== undefined && value !== null
                        ? value.toString()
                        : "-"}
                    </TableCell>
                  );
                })}

                {/* EDIT BUTTON */}
                {onEdit && (
                  <TableCell className="pl-10 font-poppins font-normal cursor-pointer">
                    <button  onClick={() => onEdit(row)}>
                      <Image src={EDIT} alt="Edit" className="h-4 w-4 cursor-pointer" />
                    </button>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length + (onEdit ? 1 : 0)}
                className="text-center text-gray-500"
              >
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default CommonTable;
