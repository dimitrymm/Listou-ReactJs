import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import { Toaster } from "./components/ui/toaster";
import ParticlesComponent from "./components/Particles";
import ProductsProvider from "./utils/contextApi/ProductsProvider";
import CategoryProvider from "./utils/contextApi/CategoriesProvider";

export default function App() {
  return (
    <CategoryProvider>
      <ProductsProvider>
        <BrowserRouter>
          <ParticlesComponent id="particles" />
          <Routes />
          <Toaster />
        </BrowserRouter>
      </ProductsProvider>
    </CategoryProvider>
  );
}
