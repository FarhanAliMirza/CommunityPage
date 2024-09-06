import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

import React from "react";

const ContextMenuRightClickProvider = ({ children }: { children: any }) => {
  const { userId } = auth();

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <Link href="/">Home</Link>
        </ContextMenuItem>
        <ContextMenuItem>
          <Link href={`/profile/${userId}`}>Profile</Link>
        </ContextMenuItem>
        <ContextMenuItem>
          <Link href={`/community`}>Community</Link>
        </ContextMenuItem>
        <ContextMenuItem>
          <Link href={`/projects`}>Projects</Link>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ContextMenuRightClickProvider;
