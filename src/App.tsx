import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Dashboard from "./pages/Dashboard";
import TradingLog from "./pages/TradingLog";
import TradingAnalytics from "./pages/TradingAnalytics";
import Expenses from "./pages/Expenses";
import Budget from "./pages/Budget";
import Login from "./pages/Login";

function App(){
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/trading-log" element={<TradingLog />} />
        <Route path="/analytics" element={<TradingAnalytics />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>)
}

export default App;