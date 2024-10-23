import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import { Toaster } from "./components/ui/toaster";

export default function App() {
  return (
    <BrowserRouter>
      <Routes />
      <Toaster />
    </BrowserRouter>
  );
}
