import { Routes, Route } from "react-router-dom";
import Index from "./components/Index";

const AppRouter = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Index />} />
    </Routes>
  );
};

export default AppRouter;
