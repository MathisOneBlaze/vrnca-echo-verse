
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Importer les pages qui seront créées plus tard
// Ces imports sont préparés pour l'arborescence future
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Routes planifiées pour le développement futur */}
          {/* <Route path="/musique" element={<Music />} /> */}
          {/* <Route path="/evenements" element={<Events />} /> */}
          {/* <Route path="/shop" element={<Shop />} /> */}
          {/* <Route path="/biographie" element={<Biography />} /> */}
          {/* <Route path="/services" element={<Services />} /> */}
          {/* <Route path="/bibliographie" element={<Bibliography />} /> */}
          {/* <Route path="/design" element={<Design />} /> */}
          {/* <Route path="/education" element={<Education />} /> */}
          {/* <Route path="/presse" element={<Press />} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}
          {/* <Route path="/communaute" element={<Community />} /> */}
          
          {/* Attrape toutes les autres routes et renvoie vers NotFound */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
