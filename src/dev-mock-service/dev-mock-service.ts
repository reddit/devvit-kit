import type { RedditAPIClient, RedisClient } from "@devvit/public-api";
import type { Devvit } from "@devvit/public-api";
import type { HandlerOverride } from "./types/index.js";

import {
  createDevvRedis,
  isRedisHandler,
  redisHandler,
} from "./redis-mock-service/index.js";
import {
  createDevvRedditApi,
  isRedditApiHandler,
  redditApiHandler,
} from "./reddit-api-mock-service/index.js";
import {
  createDevvFetch,
  httpHandler,
  httpResponse,
  isHttpApiHandler,
} from "./http-mock-service/index.js";

export enum DevMockMode {
  Prod = "Prod",
  Dev = "Dev",
}

export type DevMockService = {
  devvRedis: RedisClient;
  devvRedditApi: RedditAPIClient;
  devvFetch: typeof fetch;
};

const createDevMockService = (config: {
  context: Devvit.Context;
  mode: DevMockMode;
  handlers?: HandlerOverride[];
}): DevMockService => {
  if (config.mode === DevMockMode.Prod) {
    return {
      devvRedis: config.context.redis,
      devvRedditApi: config.context.reddit,
      devvFetch: fetch,
    };
  }
  const redisHandlers = config.handlers?.filter(isRedisHandler) || [];
  const devvRedis = createDevvRedis(config.context.redis, redisHandlers);

  const redditApiHandlers = config.handlers?.filter(isRedditApiHandler) || [];
  const devvRedditApi = createDevvRedditApi(
    config.context.reddit,
    redditApiHandlers,
  );

  const httpApiHandlers = config.handlers?.filter(isHttpApiHandler) || [];
  const devvFetch = createDevvFetch(fetch, httpApiHandlers);

  return { devvRedis, devvRedditApi, devvFetch };
};

export const DevMock = {
  createService: createDevMockService,
  redis: redisHandler,
  reddit: redditApiHandler,
  fetch: httpHandler,
  httpResponse: httpResponse,
} as const;