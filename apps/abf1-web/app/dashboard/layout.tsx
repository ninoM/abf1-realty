import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-2">
      <nav className="flex items-end justify-end">
        <UserButton afterSignOutUrl="/" />
      </nav>
      <main>{children}</main>
    </div>
  );
}
