import { DevMock, DevMockMode } from "./dev-mock-service.js";
import type { Devvit } from "@devvit/public-api";
import type { Mock } from "vitest";
import type { Subreddit } from "@devvit/public-api";

describe("dev mock service", () => {
  const mockContext: Devvit.Context = {
    useState: vi.fn(),
    redis: {
      get: vi.fn(),
    },
    reddit: {
      getSubredditById: vi.fn(),
      getCurrentUser: vi.fn(),
    },
  } as unknown as Devvit.Context;

  afterEach(() => {
    (mockContext.useState as Mock).mockReset();
    (mockContext.redis.get as Mock).mockReset();
    (mockContext.reddit.getSubredditById as Mock).mockReset();
    (mockContext.reddit.getCurrentUser as Mock).mockReset();
  });

  describe("init api", () => {
    describe("redis", () => {
      it("returns devvRedis", () => {
        const devMockService = DevMock.createService({
          context: mockContext,
          mode: DevMockMode.Prod,
        });
        expect(devMockService.devvRedis).toBeDefined();
      });

      it("returns devvRedis that calls the original method if no handlers are provided", async () => {
        (mockContext.redis.get as Mock).mockResolvedValue("real redis");
        const devMockService = DevMock.createService({
          context: mockContext,
          mode: DevMockMode.Dev,
        });
        const response = await devMockService.devvRedis.get("regular_key");
        expect(mockContext.redis.get).toBeCalledWith("regular_key");
        expect(mockContext.redis.get).toHaveBeenCalledOnce();
        expect(response).toBe("real redis");
      });

      it("returns devvRedis that applies mock responses", async () => {
        (mockContext.redis.get as Mock).mockResolvedValue("real redis");
        const devMockService = DevMock.createService({
          context: mockContext,
          mode: DevMockMode.Dev,
          handlers: [DevMock.redis.get("mocked_key", () => "mocked_response")],
        });
        const response = await devMockService.devvRedis.get("mocked_key");
        expect(mockContext.redis.get).not.toBeCalled();
        expect(response).toBe("mocked_response");
      });

      it("ignores mocks in prod mode", async () => {
        (mockContext.redis.get as Mock).mockResolvedValue("real redis");
        const devMockService = DevMock.createService({
          context: mockContext,
          mode: DevMockMode.Prod,
          handlers: [DevMock.redis.get("mocked_key", () => "mocked_response")],
        });
        const response = await devMockService.devvRedis.get("mocked_key");
        expect(mockContext.redis.get).toBeCalledWith("mocked_key");
        expect(mockContext.redis.get).toHaveBeenCalledOnce();
        expect(response).toBe("real redis");
      });
    });
    describe("redditApi", () => {
      it("returns devvRedditApi", () => {
        const devMockService = DevMock.createService({
          context: mockContext,
          mode: DevMockMode.Prod,
        });
        expect(devMockService.devvRedditApi).toBeDefined();
      });

      it("calls the original method if no handlers are provided", async () => {
        (mockContext.reddit.getCurrentUser as Mock).mockResolvedValue({
          name: "real_user",
        });
        const devMockService = DevMock.createService({
          context: mockContext,
          mode: DevMockMode.Dev,
        });
        const response = await devMockService.devvRedditApi.getCurrentUser();
        expect(mockContext.reddit.getCurrentUser).toHaveBeenCalledOnce();
        expect(response).toEqual({ name: "real_user" });
      });

      it("calls the mock handler if provided", async () => {
        (mockContext.reddit.getSubredditById as Mock).mockResolvedValue({
          name: "realSubreddit",
        });
        const devMockService = DevMock.createService({
          context: mockContext,
          mode: DevMockMode.Dev,
          handlers: [
            DevMock.reddit.getSubredditById(
              (id: string) => ({ name: `mock_${id}` }) as Subreddit,
            ),
          ],
        });
        const response =
          await devMockService.devvRedditApi.getSubredditById("test");
        expect(mockContext.reddit.getSubredditById).not.toBeCalled();
        expect(response).toEqual({ name: "mock_test" });
      });

      it("ignores mocks in prod mode", async () => {
        (mockContext.reddit.getSubredditById as Mock).mockResolvedValue({
          name: "realSubreddit",
        });
        const devMockService = DevMock.createService({
          context: mockContext,
          mode: DevMockMode.Prod,
          handlers: [
            DevMock.reddit.getSubredditById(
              (id: string) => ({ name: `mock_${id}` }) as Subreddit,
            ),
          ],
        });
        const response =
          await devMockService.devvRedditApi.getSubredditById("test");
        expect(mockContext.reddit.getSubredditById).toBeCalled();
        expect(response).toEqual({ name: "realSubreddit" });
      });
    });

    describe("httpApi", () => {
      const mockFetch = vi.fn();
      const originalFetch = global.fetch;

      beforeEach(() => {
        mockFetch.mockReset();
        global.fetch = mockFetch;
      });

      afterEach(() => {
        global.fetch = originalFetch;
      });

      it("returns devvFetch", () => {
        const devMockService = DevMock.createService({
          context: mockContext,
          mode: DevMockMode.Prod,
        });
        expect(devMockService.devvFetch).toBeDefined();
      });

      it("calls the original method if no handlers are provided", async () => {
        mockFetch.mockResolvedValue({
          json: () => Promise.resolve({ real: "data" }),
        });
        const devMockService = DevMock.createService({
          context: mockContext,
          mode: DevMockMode.Dev,
        });
        const response = await devMockService.devvFetch(
          "https://example.com",
          {},
        );
        expect(mockFetch).toHaveBeenCalledOnce();
        expect(mockFetch).toBeCalledWith("https://example.com", {});
        expect(await response.json()).toEqual({ real: "data" });
      });

      it("uses handler if provided", async () => {
        const devMockService = DevMock.createService({
          context: mockContext,
          mode: DevMockMode.Dev,
          handlers: [
            DevMock.fetch.get("https://example.com", () => {
              return DevMock.httpResponse.ok({ mocked: "response" });
            }),
          ],
        });
        const response = await devMockService.devvFetch("https://example.com", {
          method: "GET",
        });
        expect(mockFetch).not.toBeCalled();
        expect(await response.json()).toEqual({ mocked: "response" });
      });
    });
  });
});
