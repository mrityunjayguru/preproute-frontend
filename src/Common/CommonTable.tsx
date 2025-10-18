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
    <div className="bg-[#F7F7F5] max-h-[400px] p-6 rounded-lg overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.header}>{col.header}</TableHead>
            ))}
            {onEdit && <TableHead className="text-center">Actions</TableHead>}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data && data.length > 0 ? (
            data.map((row, index) => (
              <TableRow key={index}>
                {columns.map((col) => {
                  const value =
                    typeof col.accessor === "function"
                      ? col.accessor(row)
                      : getValue(row, col.accessor);

                  return (
                    <TableCell key={col.header}>
                      {value !== undefined && value !== null
                        ? value.toString()
                        : "-"}
                    </TableCell>
                  );
                })}

                {/* EDIT BUTTON */}
                {onEdit && (
                  <TableCell className="text-center">
                    <Button
                      variant="orange"
                      size="sm"
                      onClick={() => onEdit(row)}
                    >
                      <FaRegEdit className="h-4 w-4" />
                    </Button>
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
