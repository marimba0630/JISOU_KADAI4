import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ShowMeishi } from "./pages/ShowMeishi";
import { RegisterMeishi } from "./pages/RegisterMeishi";
createRoot(document.getElementById("root")).render(_jsx(StrictMode, { children: _jsx(ChakraProvider, { value: defaultSystem, children: _jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(App, {}) }), _jsx(Route, { path: "/cards/:id", element: _jsx(ShowMeishi, {}) }), _jsx(Route, { path: "/cards/register", element: _jsx(RegisterMeishi, {}) })] }) }) }) }));
