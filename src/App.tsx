
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Import des pages
import Music from "./pages/Music";
import Events from "./pages/Events";
import Shop from "./pages/Shop";
import Biography from "./pages/Biography";
import Publications from "./pages/Publications";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/musique" element={<Music />} />
          <Route path="/evenements" element={<Events />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/biographie" element={<Biography />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Attrape toutes les autres routes et renvoie vers NotFound */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
