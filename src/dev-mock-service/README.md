## Dev Mock Service

Dev Mock Service Worker is an API mocking library that allows you to specify
custom responses for any API calls inside your app.

### Capabilities

- Mock API requests
- Dev/Prod switch

### Installation

Add the line `import { DevMockMode, DevMock } from '@devvit/kit';` in the beginning of your root component.

### API mocks

With custom handler functions, you can override the response for any API call, such as
Redis, RedditAPI, or HTTP request.

- In Dev mode (`DevMockMode.Dev`), handlers are applied for all requests with the matching method and ID (if available).
- In Prod mode (`DevMockMode.Prod`), handlers are ignored.

#### Setup

Create devv versions of the API clients you want to mock.

```typescript
const { devvRedis, devvRedditApi, devvFetch } = DevMock.createService({
  context,
  mode: DevMockMode.Dev,
  handlers: [
    DevMock.redis.get("mocked_key", () => "Value from mocks!"),
    DevMock.fetch.get("https://example.com", () =>
      DevMock.httpResponse.ok({ fetched: "mock" }),
    ),
    DevMock.reddit.getSubredditById((id: string) => ({ name: `mock_${id}` })),
  ],
});
```

Use devv versions of API clients in your app.

```typescript
const redisValue = await devvRedis.get("mocked_key"); // "Value from mocks!"
const fetchedValue = await(await devvFetch("https://example.com")).json(); // {fetched: "mock"}
const redditApiValue = (await devvRedditApi.getSubredditById("t5_123")).name; // "mock_t5_123"
```
