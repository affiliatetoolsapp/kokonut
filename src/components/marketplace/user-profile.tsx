import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

interface MenuItem {
  label: string;
  href: string;
  shortcut?: string;
}

interface UserProfileProps {
  name?: string;
  role?: string;
  avatar?: string;
  accountType?: string;
}

export default function UserProfile({
  name = "Admin User",
  role = "Administrator",
  avatar = "/placeholder-user.jpg",
  accountType = "Personal Account",
}: UserProfileProps) {
  const menuItems: MenuItem[] = [
    {
      label: accountType,
      href: "/settings/account",
    },
    {
      label: "Notifications",
      href: "/settings/notifications",
      shortcut: "⌘N",
    },
    {
      label: "Settings",
      href: "/settings",
      shortcut: "⌘S",
    },
    {
      label: "Billing",
      href: "/settings/billing",
      shortcut: "⌘B",
    },
    {
      label: "Terms & Policies",
      href: "/legal",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>AU</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">{role}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {menuItems.map((item) => (
            <DropdownMenuItem key={item.href} asChild>
              <Link to={item.href}>
                {item.label}
                {item.shortcut && (
                  <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
                )}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to="/auth/signout" className="w-full">
            Sign out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

