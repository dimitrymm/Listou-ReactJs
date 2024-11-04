import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Separator } from "../ui/separator";

export default function Footer() {
  return (
    <footer className="bg-white fixed bottom-0 left-0 z-20 w-full p-4">
      <Separator className="bg-black" />
      <div className="mt-3 flex space-x-2 items-center justify-center">
        <h2>Feito por: Dimitry Machado Marinho</h2>
        <a href="https://www.linkedin.com/in/dimitrymm">
          <GitHubLogoIcon width={25} height={25} />
        </a>
        <a href="https://www.github.com/dimitrymm">
          <LinkedInLogoIcon width={25} height={25} />
        </a>
      </div>
    </footer>
  );
}
