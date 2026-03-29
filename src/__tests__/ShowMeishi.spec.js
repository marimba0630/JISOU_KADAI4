import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { vi } from "vitest";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "../App";
import { ShowMeishi } from "../pages/ShowMeishi";
import { RegisterMeishi } from "../pages/RegisterMeishi";
import { MemoryRouter, Routes, Route } from "react-router-dom";
const mockedNavigator = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockedNavigator,
    };
});
vi.mock("../lib/supabaseCRUDFunctions", () => {
    return {
        //insertRecord: vi.fn().mockResolvedValue(undefined),
        getSpecifyMeishiRecord: vi.fn(),
    };
});
import { MeishiRecord } from "../domain/record";
import { getSpecifyMeishiRecord } from "../lib/supabaseCRUDFunctions";
beforeEach(() => {
    getSpecifyMeishiRecord.mockResolvedValue(MeishiRecord.createMeishi("sample_id", "テスト太郎", "テスト太郎の自己紹介", ["React"], "marimba0630", "marimba0630", "NR_marimba"));
});
describe("Show Meishi", () => {
    it("should render title", async () => {
        render(_jsx(ChakraProvider, { value: defaultSystem, children: _jsx(MemoryRouter, { initialEntries: ["/cards/sample_id"], children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(App, {}) }), _jsx(Route, { path: "/cards/:id", element: _jsx(ShowMeishi, {}) }), _jsx(Route, { path: "/cards/register", element: _jsx(RegisterMeishi, {}) })] }) }) }));
        const name = await screen.findByTestId("name");
        expect(name).toHaveTextContent("テスト太郎");
    });
    it("should render description", async () => {
        render(_jsx(ChakraProvider, { value: defaultSystem, children: _jsx(MemoryRouter, { initialEntries: ["/cards/sample_id"], children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(App, {}) }), _jsx(Route, { path: "/cards/:id", element: _jsx(ShowMeishi, {}) }), _jsx(Route, { path: "/cards/register", element: _jsx(RegisterMeishi, {}) })] }) }) }));
        const description = await screen.findByTestId("description");
        expect(description).toHaveTextContent("テスト太郎の自己紹介");
    });
    it("should render skill", async () => {
        render(_jsx(ChakraProvider, { value: defaultSystem, children: _jsx(MemoryRouter, { initialEntries: ["/cards/sample_id"], children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(App, {}) }), _jsx(Route, { path: "/cards/:id", element: _jsx(ShowMeishi, {}) }), _jsx(Route, { path: "/cards/register", element: _jsx(RegisterMeishi, {}) })] }) }) }));
        const skill = await screen.findByTestId("skill");
        expect(skill).toHaveTextContent("React");
    });
    it("should render github Icon", async () => {
        render(_jsx(ChakraProvider, { value: defaultSystem, children: _jsx(MemoryRouter, { initialEntries: ["/cards/sample_id"], children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(App, {}) }), _jsx(Route, { path: "/cards/:id", element: _jsx(ShowMeishi, {}) }), _jsx(Route, { path: "/cards/register", element: _jsx(RegisterMeishi, {}) })] }) }) }));
        const github = await screen.findByTestId("githubid");
        expect(github).toBeInTheDocument();
    });
    it("should render qiita Icon", async () => {
        render(_jsx(ChakraProvider, { value: defaultSystem, children: _jsx(MemoryRouter, { initialEntries: ["/cards/sample_id"], children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(App, {}) }), _jsx(Route, { path: "/cards/:id", element: _jsx(ShowMeishi, {}) }), _jsx(Route, { path: "/cards/register", element: _jsx(RegisterMeishi, {}) })] }) }) }));
        const qiita = await screen.findByTestId("qiitaid");
        expect(qiita).toBeInTheDocument();
    });
    it("should render X Icon", async () => {
        render(_jsx(ChakraProvider, { value: defaultSystem, children: _jsx(MemoryRouter, { initialEntries: ["/cards/sample_id"], children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(App, {}) }), _jsx(Route, { path: "/cards/:id", element: _jsx(ShowMeishi, {}) }), _jsx(Route, { path: "/cards/register", element: _jsx(RegisterMeishi, {}) })] }) }) }));
        const x = await screen.findByTestId("xid");
        expect(x).toBeInTheDocument();
    });
    it("should back home", async () => {
        render(_jsx(ChakraProvider, { value: defaultSystem, children: _jsx(MemoryRouter, { initialEntries: ["/cards/sample_id"], children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(App, {}) }), _jsx(Route, { path: "/cards/:id", element: _jsx(ShowMeishi, {}) }), _jsx(Route, { path: "/cards/register", element: _jsx(RegisterMeishi, {}) })] }) }) }));
        const backButton = await screen.findByRole("button", { name: "戻る" });
        await userEvent.click(backButton);
        expect(mockedNavigator).toHaveBeenCalledWith("/");
    });
});
