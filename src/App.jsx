import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AllRoute from "./routes/AllRoute";
import "./assets/style/style.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <AllRoute />
    </BrowserRouter>
  );
}

export default App;
