import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Separator } from "../ui/separator";

export default function Footer() {
  return (
    <footer className="mt-48 flex justify-center items-center flex-col">
      <Separator />
      <div className="mt-3 flex space-x-2 items-center">
        <h2>Feito por: Dimitry Machado Marinho</h2>
        <GitHubLogoIcon width={25} height={25} />
        <LinkedInLogoIcon width={25} height={25} />
      </div>
    </footer>
  );
}
