import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import { BackgroundMusic } from "@/components/birthday/BackgroundMusic";

export default function App() {
  return (
    <>
      <BackgroundMusic />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
