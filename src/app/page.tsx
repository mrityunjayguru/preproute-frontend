"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // API call function
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1"); 
      setData(response.data);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Call API when component loads
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-5">
      <Button variant="ghost" size="lg" onClick={fetchData}>
        {loading ? "Loading..." : "Fetch Data"}
      </Button>

      {data && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
          <h2 className="font-bold text-lg">API Response:</h2>
          <pre className="text-sm text-gray-700">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default Home;
