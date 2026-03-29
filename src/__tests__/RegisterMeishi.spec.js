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
        insertNewMeishiRecord: vi.fn().mockResolvedValue(undefined),
        getAllRecords: vi.fn(),
    };
});
const mockSkillRecords = [
    new SkillRecord(1, "React", "2026-01-14 00:00:00.000000+00"),
    new SkillRecord(2, "Type Script", "2026-01-14 00:00:00.000000+00"),
    new SkillRecord(3, "Github", "2026-01-14 00:00:00.000000+00"),
];
import { SkillRecord } from "../domain/record";
import { getAllRecords, } from "../lib/supabaseCRUDFunctions";
beforeEach(() => {
    getAllRecords.mockResolvedValue(mockSkillRecords);
});
describe("RegisterMeishi", () => {
    it("should render title", async () => {
        render(_jsx(ChakraProvider, { value: defaultSystem, children: _jsx(MemoryRouter, { initialEntries: ["/cards/register"], children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(App, {}) }), _jsx(Route, { path: "/cards/:id", element: _jsx(ShowMeishi, {}) }), _jsx(Route, { path: "/cards/register", element: _jsx(RegisterMeishi, {}) })] }) }) }));
        const title = await screen.findByTestId("title");
        expect(title).toHaveTextContent("新規名刺登録");
    });
    it("should render All register and back", async () => {
        render(_jsx(ChakraProvider, { value: defaultSystem, children: _jsx(MemoryRouter, { initialEntries: ["/cards/register"], children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(App, {}) }), _jsx(Route, { path: "/cards/:id", element: _jsx(ShowMeishi, {}) }), _jsx(Route, { path: "/cards/register", element: _jsx(RegisterMeishi, {}) })] }) }) }));
        await userEvent.type(await screen.findByTestId("user_id"), "sample-id");
        await userEvent.type(await screen.findByTestId("name"), "テスト太郎");
        await userEvent.type(await screen.findByTestId("description"), "TEST");
        await userEvent.selectOptions(await screen.findByTestId("skill"), "1");
        await userEvent.type(await screen.findByTestId("github_id"), "Github");
        await userEvent.type(await screen.findByTestId("qiita_id"), "Qiita");
        await userEvent.type(await screen.findByTestId("x_id"), "X");
        const RegisterButton = await screen.findByRole("button", { name: "登録" });
        await userEvent.click(RegisterButton);
        await waitFor(() => {
            expect(mockedNavigator).toBeCalledWith("/");
        });
    });
    it("should show error ID", async () => {
        render(_jsx(ChakraProvider, { value: defaultSystem, children: _jsx(MemoryRouter, { initialEntries: ["/cards/register"], children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(App, {}) }), _jsx(Route, { path: "/cards/:id", element: _jsx(ShowMeishi, {}) }), _jsx(Route, { path: "/cards/register", element: _jsx(RegisterMeishi, {}) })] }) }) }));
        await userEvent.type(await screen.findByTestId("name"), "テスト太郎");
        await userEvent.type(await screen.findByTestId("description"), "TEST");
        await userEvent.selectOptions(await screen.findByTestId("skill"), "1");
        const RegisterButton = await screen.findByRole("button", { name: "登録" });
        await userEvent.click(RegisterButton);
        const user_id_error = await screen.findByTestId("user_id_error");
        await waitFor(() => {
            expect(user_id_error).toHaveTextContent("IDの入力は必須です");
        });
    });
    it("should show error name", async () => {
        render(_jsx(ChakraProvider, { value: defaultSystem, children: _jsx(MemoryRouter, { initialEntries: ["/cards/register"], children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(App, {}) }), _jsx(Route, { path: "/cards/:id", element: _jsx(ShowMeishi, {}) }), _jsx(Route, { path: "/cards/register", element: _jsx(RegisterMeishi, {}) })] }) }) }));
        await userEvent.type(await screen.findByTestId("user_id"), "sample-id");
        await userEvent.type(await screen.findByTestId("description"), "TEST");
        await userEvent.selectOptions(await screen.findByTestId("skill"), "1");
        const RegisterButton = await screen.findByRole("button", { name: "登録" });
        await userEvent.click(RegisterButton);
        const name_error = await screen.findByTestId("name_error");
        await waitFor(() => {
            expect(name_error).toHaveTextContent("名前の入力は必須です");
        });
    });
    it("should show error discription", async () => {
        render(_jsx(ChakraProvider, { value: defaultSystem, children: _jsx(MemoryRouter, { initialEntries: ["/cards/register"], children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(App, {}) }), _jsx(Route, { path: "/cards/:id", element: _jsx(ShowMeishi, {}) }), _jsx(Route, { path: "/cards/register", element: _jsx(RegisterMeishi, {}) })] }) }) }));
        await userEvent.type(await screen.findByTestId("user_id"), "sample-id");
        await userEvent.type(await screen.findByTestId("name"), "テスト太郎");
        await userEvent.selectOptions(await screen.findByTestId("skill"), "1");
        const RegisterButton = await screen.findByRole("button", { name: "登録" });
        await userEvent.click(RegisterButton);
        const description_error = await screen.findByTestId("description_error");
        await waitFor(() => {
            expect(description_error).toHaveTextContent("自己紹介の入力は必須です");
        });
    });
    it("should show error skill", async () => {
        render(_jsx(ChakraProvider, { value: defaultSystem, children: _jsx(MemoryRouter, { initialEntries: ["/cards/register"], children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(App, {}) }), _jsx(Route, { path: "/cards/:id", element: _jsx(ShowMeishi, {}) }), _jsx(Route, { path: "/cards/register", element: _jsx(RegisterMeishi, {}) })] }) }) }));
        await userEvent.type(await screen.findByTestId("user_id"), "sample-id");
        await userEvent.type(await screen.findByTestId("name"), "テスト太郎");
        await userEvent.type(await screen.findByTestId("description"), "TEST");
        const RegisterButton = await screen.findByRole("button", { name: "登録" });
        await userEvent.click(RegisterButton);
        const skill_error = await screen.findByTestId("skill_error");
        await waitFor(() => {
            expect(skill_error).toHaveTextContent("好きな技術の選択は必須です");
        });
    });
    it("should render back", async () => {
        render(_jsx(ChakraProvider, { value: defaultSystem, children: _jsx(MemoryRouter, { initialEntries: ["/cards/register"], children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(App, {}) }), _jsx(Route, { path: "/cards/:id", element: _jsx(ShowMeishi, {}) }), _jsx(Route, { path: "/cards/register", element: _jsx(RegisterMeishi, {}) })] }) }) }));
        await userEvent.type(await screen.findByTestId("user_id"), "sample-id");
        await userEvent.type(await screen.findByTestId("name"), "テスト太郎");
        await userEvent.type(await screen.findByTestId("description"), "TEST");
        await userEvent.selectOptions(await screen.findByTestId("skill"), "1");
        const RegisterButton = await screen.findByRole("button", { name: "登録" });
        await userEvent.click(RegisterButton);
        await waitFor(() => {
            expect(mockedNavigator).toBeCalledWith("/");
        });
    });
});
