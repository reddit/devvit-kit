import type { RedditAPIClient, RedisClient } from "@devvit/public-api";
import type { Devvit } from "@devvit/public-api";
import type { HandlerOverride } from "./types/index.js";

import {
  createdevRedis,
  isRedisOverride,
  redisHandler,
} from "./redis-mock-service/index.js";
import {
  createdevRedditApi,
  isRedditApiOverride,
  redditApiHandler,
} from "./reddit-api-mock-service/index.js";
import {
  createdevFetch,
  httpHandler,
  httpResponse,
  isHttpApiOverride,
} from "./http-mock-service/index.js";

export enum DevMockMode {
  Prod = "Prod",
  Dev = "Dev",
}

export type DevMockService = {
  devRedis: RedisClient;
  devRedditApi: RedditAPIClient;
  devFetch: typeof fetch;
};

const createDevMockService = (config: {
  context: Devvit.Context;
  mode: DevMockMode;
  handlers?: HandlerOverride[];
}): DevMockService => {
  if (config.mode === DevMockMode.Prod) {
    return {
      devRedis: config.context.redis,
      devRedditApi: config.context.reddit,
      devFetch: fetch,
    };
  }
  const redisHandlers = config.handlers?.filter(isRedisOverride) || [];
  const devRedis = createdevRedis(config.context.redis, redisHandlers);

  const redditApiHandlers = config.handlers?.filter(isRedditApiOverride) || [];
  const devRedditApi = createdevRedditApi(
    config.context.reddit,
    redditApiHandlers,
  );

  const httpApiHandlers = config.handlers?.filter(isHttpApiOverride) || [];
  const devFetch = createdevFetch(fetch, httpApiHandlers);

  return { devRedis, devRedditApi, devFetch };
};

export const DevMock = {
  createService: createDevMockService,
  redis: redisHandler,
  reddit: redditApiHandler,
  fetch: httpHandler,
  httpResponse: httpResponse,
} as const;
