import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { vi } from "vitest";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { render, screen, waitFor } from "@testing-library/react";
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
describe("Top Page", () => {
    it("should render title", async () => {
        render(_jsx(ChakraProvider, { value: defaultSystem, children: _jsx(MemoryRouter, { initialEntries: ["/"], children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(App, {}) }), _jsx(Route, { path: "/cards/:id", element: _jsx(ShowMeishi, {}) }), _jsx(Route, { path: "/cards/register", element: _jsx(RegisterMeishi, {}) })] }) }) }));
        const title = await screen.findByTestId("title");
        expect(title).toHaveTextContent("デジタル名刺");
    });
    it("should input ID", async () => {
        render(_jsx(ChakraProvider, { value: defaultSystem, children: _jsx(MemoryRouter, { initialEntries: ["/"], children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(App, {}) }), _jsx(Route, { path: "/cards/:id", element: _jsx(ShowMeishi, {}) }), _jsx(Route, { path: "/cards/register", element: _jsx(RegisterMeishi, {}) })] }) }) }));
        await userEvent.type(await screen.findByTestId("user_id"), "sample_id");
        const searchButton = await screen.findByRole("button", { name: "名刺検索" });
        await userEvent.click(searchButton);
        await waitFor(() => {
            expect(mockedNavigator).toBeCalledWith(expect.stringMatching(/^\/cards\/.+$/));
        });
    });
    it("should error", async () => {
        render(_jsx(ChakraProvider, { value: defaultSystem, children: _jsx(MemoryRouter, { initialEntries: ["/"], children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(App, {}) }), _jsx(Route, { path: "/cards/:id", element: _jsx(ShowMeishi, {}) }), _jsx(Route, { path: "/cards/register", element: _jsx(RegisterMeishi, {}) })] }) }) }));
        const searchButton = await screen.findByRole("button", { name: "名刺検索" });
        await userEvent.click(searchButton);
        const user_id_error = await screen.findByTestId("user_id_error");
        expect(user_id_error).toHaveTextContent("閲覧にはユーザーIDは必須です");
    });
    it("should move register", async () => {
        render(_jsx(ChakraProvider, { value: defaultSystem, children: _jsx(MemoryRouter, { initialEntries: ["/"], children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(App, {}) }), _jsx(Route, { path: "/cards/:id", element: _jsx(ShowMeishi, {}) }), _jsx(Route, { path: "/cards/register", element: _jsx(RegisterMeishi, {}) })] }) }) }));
        const RegisterButton = await screen.findByRole("button", { name: "新規登録はこちら" });
        await userEvent.click(RegisterButton);
        expect(mockedNavigator).toBeCalledWith("/cards/register");
    });
});
