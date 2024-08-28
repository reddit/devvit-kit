import type { RedditAPIClient } from "@devvit/public-api";

export type RedditApiOverride = {
  __type: "RedditApi";
  method: keyof RedditAPIClient;
  handler: Function;
};

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export type SyncHandler<Method extends (...args: any) => any> = (
  ...params: Parameters<Method>
) => Awaited<ReturnType<Method>>;

export type OverridesMap<
  T extends keyof RedditAPIClient = keyof RedditAPIClient,
> = Partial<Record<T, RedditAPIClient[T]>>;
export type RedditApiInterface<
  T extends keyof RedditAPIClient = keyof RedditAPIClient,
> = Record<T, RedditAPIClient[T]>;
export type BasicRedditApiClient = Omit<RedditAPIClient, "modMail">;
