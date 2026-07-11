import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { getUserFromLocalStorage } from "@/utils/global";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function AuthBar() {
  const user = getUserFromLocalStorage();

  return (
    <>
      <Card className="py-2 px-2">
        <CardContent className="flex flex-row justify-between px-2">
          <Avatar size="lg">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>{user?.name ? user.name.slice(0, 2).toUpperCase() : "CN"}</AvatarFallback>
          </Avatar>
        </CardContent>
      </Card>
    </>
  );
}
