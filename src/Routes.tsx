import { Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import Products from "./pages/products";
import Statistics from "./pages/statistics";
export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/products" component={Products} />
      <Route path="/statistics" component={Statistics} />
    </Switch>
  );
}
