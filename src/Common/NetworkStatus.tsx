"use client";

import React, { useEffect, useState } from "react";

function NetworkStatus() {
  const [isOffline, setIsOffline] = useState(false);
  const [isSlow, setIsSlow] = useState(false);

  useEffect(() => {
    // 1. Logic to check and update state
    const updateStatus = () => {
      setIsOffline(!navigator.onLine);

      const conn = (navigator as any).connection;
      if (conn) {
        setIsSlow(conn.effectiveType === "2g" || conn.effectiveType === "slow-2g");
      }
    };

    // 2. Initial check
    updateStatus();

    // 3. Listeners for Online/Offline
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    // 4. Listener for connection quality changes (e.g., dropping from 4G to 2G)
    const conn = (navigator as any).connection;
    if (conn) {
      conn.addEventListener("change", updateStatus);
    }

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
      if (conn) conn.removeEventListener("change", updateStatus);
    };
  }, []);

  if (!isOffline && !isSlow) return null;

  return (
    // Centering Logic: "left-1/2 -translate-x-1/2" centers a fixed element
    <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-md px-4">
      {isOffline ? (
        <div className="bg-red-600 text-white px-6 py-4 rounded-xl shadow-2xl text-center animate-pulse border-2 border-white/20">
          <p className="font-bold text-lg">🚫 Connection Lost</p>
          <p className="text-sm opacity-90">Please check your internet settings.</p>
        </div>
      ) : isSlow ? (
        <div className="bg-amber-500 text-white px-6 py-4 rounded-xl shadow-2xl text-center border-2 border-white/20">
          <p className="font-bold text-lg">⚠️ Slow Network</p>
          <p className="text-sm opacity-90">API requests may take longer than usual.</p>
        </div>
      ) : null}
    </div>
  );
}

export default NetworkStatus;