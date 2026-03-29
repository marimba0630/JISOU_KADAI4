import "@testing-library/jest-dom/vitest";
import "whatwg-fetch";
import { config } from "dotenv";
config();
if (!globalThis.structuredClone) {
    globalThis.structuredClone = (value) => JSON.parse(JSON.stringify(value));
}
