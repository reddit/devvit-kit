import type { RedisClient } from "@devvit/public-api";

export type RedisOverride = {
  __type: "Redis";
  method: keyof RedisClient;
  key: string;
  handler: Function;
};
type RestParam<Params extends unknown[]> = Params extends [
  unknown,
  ...infer Rest,
]
  ? Rest
  : [];
export type RedisMethods = Omit<RedisClient, "global">;
type NonBasicRedisMethodNames = "watch" | "del" | "mget" | "mset";

export type BasicRedisMethods = Omit<RedisMethods, NonBasicRedisMethodNames>;
export type NonKeyRedisParams<Method extends keyof BasicRedisMethods> =
  RestParam<Parameters<RedisClient[Method]>>;
export type RedisSyncResponse<Method extends keyof RedisMethods> = Awaited<
  ReturnType<RedisClient[Method]>
>;
export type Unpacked<T> = T extends (infer U)[] ? U : T;
