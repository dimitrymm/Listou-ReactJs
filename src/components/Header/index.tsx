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
          <BreadcrumbItem className="hover:text-black hover:scale-110 transition-transform">
            <Link className="flex items-center" to="/">
              <HomeIcon />
              Home
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem className=" hover:text-black hover:scale-110 transition-transform ">
            <Link className="flex items-center" to="/products">
              <BackpackIcon />
              Produtos
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem className="hover:text-black hover:scale-110 transition-transform">
            <Link className="flex items-center" to="/statistics">
              <BarChartIcon />
              Estatisticas
            </Link>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Separator className="bg-[#020817]" />
    </header>
  );
}
