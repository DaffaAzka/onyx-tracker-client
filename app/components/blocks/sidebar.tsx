import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Settings,
  Users,
  BarChart2,
  ChevronLeft,
  LogOut,
  Bell,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Reports", href: "/reports", icon: BarChart2 },
  { label: "Documents", href: "/documents", icon: FileText },
  { label: "Users", href: "/users", icon: Users },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Settings", href: "/settings", icon: Settings },
];

interface SidebarContentProps {
  collapsed?: boolean;
  active: string;
  onNavigate: (href: string) => void;
}

function SidebarContent({
  collapsed = false,
  active,
  onNavigate,
}: SidebarContentProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div
        className={cn(
          "flex items-center gap-3 px-4 h-14 shrink-0",
          collapsed && "justify-center px-0",
        )}>
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary shrink-0">
          <span className="text-primary-foreground font-bold text-sm">A</span>
        </div>
        {!collapsed && (
          <span className="font-semibold text-foreground text-sm">MyApp</span>
        )}
      </div>

      <Separator />

      {/* Nav Links */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        <TooltipProvider delayDuration={0}>
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = active === href;
            const item = (
              <button
                key={href}
                onClick={() => onNavigate(href)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-left",
                  isActive ?
                    "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                  collapsed && "justify-center px-2",
                )}>
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{label}</span>}
              </button>
            );

            if (collapsed) {
              return (
                <Tooltip key={href}>
                  <TooltipTrigger asChild>{item}</TooltipTrigger>
                  <TooltipContent side="right">{label}</TooltipContent>
                </Tooltip>
              );
            }

            return item;
          })}
        </TooltipProvider>
      </nav>

      <Separator />

      {/* User Profile */}
      <div
        className={cn(
          "p-4 flex items-center gap-3",
          collapsed && "justify-center p-3",
        )}>
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage src="https://github.com/shadcn.png" alt="User" />
          <AvatarFallback>AZ</AvatarFallback>
        </Avatar>

        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Azka</p>
            <p className="text-xs text-muted-foreground truncate">
              azka@mail.com
            </p>
          </div>
        )}

        {!collapsed && (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 shrink-0">
                  <LogOut className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("/dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r bg-background relative transition-all duration-300 ease-in-out shrink-0",
          collapsed ? "w-16" : "w-60",
        )}>
        <SidebarContent
          collapsed={collapsed}
          active={active}
          onNavigate={setActive}
        />

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-[3.5rem] translate-y-px flex items-center justify-center w-6 h-6 rounded-full border bg-background shadow-sm hover:bg-accent transition-colors z-10">
          <ChevronLeft
            className={cn(
              "h-3.5 w-3.5 text-muted-foreground transition-transform duration-300",
              collapsed && "rotate-180",
            )}
          />
        </button>
      </aside>

      {/* Mobile: Sheet dari kiri */}
      <div className="md:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="m-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open sidebar</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-60 p-0">
            <SidebarContent
              active={active}
              onNavigate={(href) => {
                setActive(href);
                setMobileOpen(false);
              }}
            />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
