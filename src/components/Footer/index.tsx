import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Separator } from "../ui/separator";

export default function Footer() {
  return (
    <footer className="p-6">
      <Separator className="bg-black mb-6" />
      <div className="flex justify-center items-end space-x-2 ">
        <h2>Feito por: Dimitry Machado Marinho</h2>
        <GitHubLogoIcon width={25} height={25} />
        <LinkedInLogoIcon width={25} height={25} />
      </div>
    </footer>
  );
}
