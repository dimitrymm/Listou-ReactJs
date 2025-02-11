import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Separator } from "../ui/separator";

export default function Footer() {
  return (
    <footer className="p-6">
      <Separator className="bg-black mb-6" />
      <div className="flex justify-center items-end space-x-2 ">
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
