import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";

export default function GradientText({
  children,
  className,
  text,
}: {
  children?: ReactNode;
  className?: string;
  text: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex max-w-fit flex-row items-center justify-center rounded-full text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] backdrop-blur-sm duration-300 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8fdfff3f] dark:bg-black/40 hover:bg-white/5 transition-all",
        className
      )}
    >
      <div
        className={`absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:var(--bg-size)_100%] p-[1px] ![mask-composite:subtract] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]`}
      />
      🎉 <hr className="mx-1 h-4 w-[1px] shrink-0 bg-gray-300" />
      <span
        className={cn(
          `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
        )}
      >
        {text}
      </span>
      <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
    </div>
  );
}

