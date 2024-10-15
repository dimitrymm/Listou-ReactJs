import { HomeIcon, SlashIcon } from "@radix-ui/react-icons";
import { Separator } from "@radix-ui/react-separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="p-6 mx-auto flex justify-center items-center flex-col">
      <Breadcrumb className="mb-3">
        <BreadcrumbList className="">
          <BreadcrumbItem>
            <BreadcrumbLink className="text-base flex items-center ">
              <HomeIcon className="mr-1" />
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/products">Produtos</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/statistics">Estatisticas</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Separator />
    </header>
  );
}
