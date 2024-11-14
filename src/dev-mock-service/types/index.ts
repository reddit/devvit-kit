import type { RedisOverride } from "../redis-mock-service/types.js";
import type { RedditApiOverride } from "../reddit-api-mock-service/types.js";
import type { HttpOverride } from "../http-mock-service/types.js";

export type HandlerOverride = RedisOverride | RedditApiOverride | HttpOverride;
