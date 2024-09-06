import React from "react";

const IconItem = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex items-center gap-1">{children}</div>;
};

export default IconItem;
