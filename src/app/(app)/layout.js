import React from "react";

export default function Layout({ children }) {
  return (
    <main className="max-w-2xl m-auto">
      <div>{children}</div>
    </main>
  );
}
