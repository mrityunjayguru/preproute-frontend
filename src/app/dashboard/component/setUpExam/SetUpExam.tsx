"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Section {
  name: string;
  createdOn: string;
}

const SetUpExam = () => {
  const [sectionName, setSectionName] = useState("");
  const [sections, setSections] = useState<Section[]>([
    { name: "MCQ", createdOn: "30 Sep 2025 00:55 AM" },
    { name: "LR", createdOn: "29 Sep 2025 08:35 PM" },
    { name: "VR", createdOn: "29 Sep 2025 08:30 PM" },
  ]);

  const handleAddSection = () => {
    if (sectionName.trim()) {
      const newSection: Section = {
        name: sectionName.trim(),
        createdOn: new Date().toLocaleString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };
      setSections([...sections, newSection]);
      setSectionName(""); // Clear the input
    }
  };

  return (
    <div className="flex-1">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Create Sections</h2>
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Enter Section Name"
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={handleAddSection}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Submit
          </Button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <Input type="text" placeholder="Search Section" className="mb-4" />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Section Name</TableHead>
              <TableHead>Created On</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sections.map((section, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{section.name}</TableCell>
                <TableCell>{section.createdOn}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
    </div>
  );
};

export default SetUpExam;
