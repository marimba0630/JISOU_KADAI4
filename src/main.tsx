import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ShowMeishi } from "./pages/ShowMeishi";
import { RegisterMeishi } from "./pages/RegisterMeishi";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/cards/:id" element={<ShowMeishi />} />
          <Route path="/cards/register" element={<RegisterMeishi />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>,
);
