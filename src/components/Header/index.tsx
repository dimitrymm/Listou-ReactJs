import {
  BackpackIcon,
  BarChartIcon,
  HomeIcon,
  SlashIcon,
} from "@radix-ui/react-icons";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";

export default function Header() {
  return (
    <header className="p-6 mx-auto flex justify-center items-center flex-col">
      <Breadcrumb className="mb-3">
        <BreadcrumbList className="">
          <BreadcrumbItem>
            <HomeIcon className="" />
            <Link className="text-base flex items-center " to="/">
              Home
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BackpackIcon />
            <Link to="/products">Produtos</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BarChartIcon />
            <Link to="/statistics">Estatisticas</Link>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Separator className="bg-[#020817]" />
    </header>
  );
}
