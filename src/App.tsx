import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Resources from "./pages/Resources";
import Forum from "./pages/Forum";
import Booking from "./pages/Booking";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onPageChange={setCurrentPage} />;
      case 'chat':
        return <Chat onPageChange={setCurrentPage} />;
      case 'resources':
        return <Resources />;
      case 'forum':
        return <Forum />;
      case 'booking':
        return <Booking />;
      case 'admin':
        return <Admin />;
      default:
        return <Home onPageChange={setCurrentPage} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-background">
          <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
          {renderPage()}
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
