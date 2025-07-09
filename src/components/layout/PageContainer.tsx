import { cn } from "@/utils";
import Header from "../navigation/header/Header";

export default function PageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <Header />
      <div
        className={cn(
          "bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10",
          className
        )}
      >
        {children}
      </div>
    </>
  );
}
