import { cn } from "@/utils";
import Header from "../navigation/header/Header";

export default async function PageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <Header />
      <main
        className={cn(
          "bg-background flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-6 p-6 md:p-10",
          className
        )}
      >
        {children}
      </main>
      {/* footer here later */}
    </>
  );
}
