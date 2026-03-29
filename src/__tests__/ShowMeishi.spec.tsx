import { vi } from "vitest";
import { ChakraProvider, defaultSystem, useEditable } from "@chakra-ui/react";
import { render, screen, within, waitFor } from "@testing-library/react";
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
  (getSpecifyMeishiRecord as any).mockResolvedValue(
    MeishiRecord.createMeishi(
      "sample_id",
      "テスト太郎",
      "テスト太郎の自己紹介",
      ["React"],
      "marimba0630",
      "marimba0630",
      "NR_marimba",
    ),
  );
});

describe("Show Meishi", () => {
  it("should render title", async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter initialEntries={["/cards/sample_id"]}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/cards/:id" element={<ShowMeishi />} />
            <Route path="/cards/register" element={<RegisterMeishi />} />
          </Routes>
        </MemoryRouter>
      </ChakraProvider>,
    );

    const name = await screen.findByTestId("name");
    expect(name).toHaveTextContent("テスト太郎");
  });

  it("should render description", async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter initialEntries={["/cards/sample_id"]}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/cards/:id" element={<ShowMeishi />} />
            <Route path="/cards/register" element={<RegisterMeishi />} />
          </Routes>
        </MemoryRouter>
      </ChakraProvider>,
    );

    const description = await screen.findByTestId("description");
    expect(description).toHaveTextContent("テスト太郎の自己紹介");
  });

  it("should render skill", async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter initialEntries={["/cards/sample_id"]}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/cards/:id" element={<ShowMeishi />} />
            <Route path="/cards/register" element={<RegisterMeishi />} />
          </Routes>
        </MemoryRouter>
      </ChakraProvider>,
    );

    const skill = await screen.findByTestId("skill");
    expect(skill).toHaveTextContent("React");
  });

  it("should render github Icon", async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter initialEntries={["/cards/sample_id"]}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/cards/:id" element={<ShowMeishi />} />
            <Route path="/cards/register" element={<RegisterMeishi />} />
          </Routes>
        </MemoryRouter>
      </ChakraProvider>,
    );

    const github = await screen.findByTestId("githubid");
    expect(github).toBeInTheDocument();
  });

  it("should render qiita Icon", async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter initialEntries={["/cards/sample_id"]}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/cards/:id" element={<ShowMeishi />} />
            <Route path="/cards/register" element={<RegisterMeishi />} />
          </Routes>
        </MemoryRouter>
      </ChakraProvider>,
    );

    const qiita = await screen.findByTestId("qiitaid");
    expect(qiita).toBeInTheDocument();
  });

  it("should render X Icon", async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter initialEntries={["/cards/sample_id"]}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/cards/:id" element={<ShowMeishi />} />
            <Route path="/cards/register" element={<RegisterMeishi />} />
          </Routes>
        </MemoryRouter>
      </ChakraProvider>,
    );

    const x = await screen.findByTestId("xid");
    expect(x).toBeInTheDocument();
  });

  it("should back home", async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter initialEntries={["/cards/sample_id"]}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/cards/:id" element={<ShowMeishi />} />
            <Route path="/cards/register" element={<RegisterMeishi />} />
          </Routes>
        </MemoryRouter>
      </ChakraProvider>,
    );

    const backButton = await screen.findByRole("button", { name: "戻る" });
    await userEvent.click(backButton);

    expect(mockedNavigator).toHaveBeenCalledWith("/");
  });
});
