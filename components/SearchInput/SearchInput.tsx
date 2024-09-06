"use client";

import { Search } from "lucide-react";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

const SearchInput = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const username = searchParams.get("userName");
  const [value, setvalue] = useState(name || username || "");

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    
    const query = {
      // name: value,
      userName: value,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  }, [value, router]);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setvalue(e.target.value);
  };
  return (
    <div className="relative sm:block hidden">
      <Search className="absolute left-2 w-6 h-6 top-[8px]  text-gray-400" />
      <Input
        value={value}
        onChange={onChange}
        placeholder="Search by username"
        className="pl-10 bg-primary/10"
      />
    </div>
  );
};

export default SearchInput;
