import { Button } from "./ui/button";
import { InstagramLogoIcon, LinkedInLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

export function Navbar() {
  return(
    <nav className="flex items-center">
      <Button
        size="icon"
        variant="ghost"
        className="size-8"
      >
        <a href="">
          <InstagramLogoIcon className="size-4"/>
        </a>
      </Button>

      <Button
        size="icon"
        variant="ghost"
        className="size-8"
      >
        <a href="">
          <LinkedInLogoIcon className="size-4"/>
        </a>
      </Button>

      <Button
        size="icon"
        variant="ghost"
        className="size-8"
      >
        <a href="">
          <GitHubLogoIcon className="size-4"/>
        </a>
      </Button>
    </nav>
  );
}