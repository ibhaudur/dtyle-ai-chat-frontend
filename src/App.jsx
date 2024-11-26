import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AllRoute from "./routes/AllRoute";

function App() {
  return (
    <BrowserRouter>
      <AllRoute />
    </BrowserRouter>
  );
}

export default App;
