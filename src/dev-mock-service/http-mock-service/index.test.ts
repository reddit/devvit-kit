import { createdevFetch, httpHandler, httpResponse } from "./index.js";

describe("HTTP mock service", () => {
  const realFetch = vi.fn();

  beforeEach(() => {
    realFetch.mockReset();
  });
  describe("when no handlers provided", () => {
    it("uses vanilla fetch", async () => {
      const devFetch = createdevFetch(realFetch, []);
      await devFetch("https://example.com", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: "test" }),
      });

      expect(realFetch).toHaveBeenCalledWith("https://example.com", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: "test" }),
      });
    });
  });

  describe("with handlers provided", () => {
    it("calls the handler instead of the original method", async () => {
      const testHandler = vi.fn();
      const devFetch = createdevFetch(realFetch, [
        httpHandler.get("https://example.com", testHandler),
      ]);
      await devFetch("https://example.com", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: "test" }),
      });

      expect(realFetch).not.toBeCalled();
      expect(testHandler).toBeCalledWith({
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: "test" }),
      });
    });

    it("wraps the handler return value in Response object", async () => {
      const devFetch = createdevFetch(realFetch, [
        httpHandler.get("https://example.com", () => {
          return httpResponse.ok({ mock: "response" });
        }),
      ]);
      const result = await devFetch("https://example.com", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: "test" }),
      });

      expect(result.status).toBe(200);
      expect(result.ok).toBe(true);
      expect(await result.json()).toStrictEqual({ mock: "response" });
    });

    it("checks the method of the handler", async () => {
      const devFetch = createdevFetch(realFetch, [
        httpHandler.get("https://example.com", () => {
          return httpResponse.ok({ mock: "response" });
        }),
      ]);
      await devFetch("https://example.com", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: "test" }),
      });

      expect(realFetch).toBeCalled();
    });

    it("checks the url of the handler", async () => {
      const devFetch = createdevFetch(realFetch, [
        httpHandler.get("https://example.com", () => {
          return httpResponse.ok({ mock: "example" });
        }),
        httpHandler.get("https://weather.com", () => {
          return httpResponse.ok({ mock: "weather" });
        }),
      ]);
      const result = await devFetch("https://weather.com", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: "test" }),
      });

      expect(await result.json()).toStrictEqual({ mock: "weather" });
    });

    it("handles POST mocks", async () => {
      const devFetch = createdevFetch(realFetch, [
        httpHandler.get("https://example.com", () => {
          return httpResponse.ok({ mock: "example" });
        }),
        httpHandler.post("https://example.com", (request) => {
          return httpResponse.ok(JSON.parse(request.body as string));
        }),
      ]);
      const result = await devFetch("https://example.com", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: "test" }),
      });

      expect(realFetch).not.toBeCalled();
      expect(await result.json()).toStrictEqual({ content: "test" });
    });

    it("handles PUT mocks", async () => {
      const devFetch = createdevFetch(realFetch, [
        httpHandler.put("https://example.com", (request) => {
          return httpResponse.ok(JSON.parse(request.body as string));
        }),
      ]);
      const result = await devFetch("https://example.com", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: "test_put" }),
      });

      expect(realFetch).not.toBeCalled();
      expect(await result.json()).toStrictEqual({ content: "test_put" });
    });

    it("handles DELETE mocks", async () => {
      const devFetch = createdevFetch(realFetch, [
        httpHandler.delete("https://example.com", (request) => {
          return httpResponse.ok(JSON.parse(request.body as string));
        }),
      ]);
      const result = await devFetch("https://example.com", {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: "test_delete" }),
      });

      expect(realFetch).not.toBeCalled();
      expect(await result.json()).toStrictEqual({ content: "test_delete" });
    });

    it("handles OPTIONS mocks", async () => {
      const devFetch = createdevFetch(realFetch, [
        httpHandler.options("https://example.com", (request) => {
          return httpResponse.ok(JSON.parse(request.body as string));
        }),
      ]);
      const result = await devFetch("https://example.com", {
        method: "options",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: "test_options" }),
      });

      expect(realFetch).not.toBeCalled();
      expect(await result.json()).toStrictEqual({ content: "test_options" });
    });

    it("handles PATCH mocks", async () => {
      const devFetch = createdevFetch(realFetch, [
        httpHandler.patch("https://example.com", (request) => {
          return httpResponse.ok(JSON.parse(request.body as string));
        }),
      ]);
      const result = await devFetch("https://example.com", {
        method: "patch",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: "test_patch" }),
      });

      expect(realFetch).not.toBeCalled();
      expect(await result.json()).toStrictEqual({ content: "test_patch" });
    });
  });
});
