import type { Listing, RedditAPIClient } from "@devvit/public-api";
import { createDevvRedditApi, redditApiHandler } from "./index.js";
import type { Mock } from "vitest";
import type { Subreddit } from "@devvit/public-api";
import type { ModMailService } from "@devvit/public-api";
import type { Post } from "@devvit/public-api";

describe("Reddit Api mock service", () => {
  const realRedditApi = {
    getSubredditById: vi.fn(),
    getCurrentUser: vi.fn(),
    getSpam: vi.fn(),
    modMail: { getSubreddits: vi.fn() },
  } as unknown as RedditAPIClient;

  beforeEach(() => {
    (realRedditApi.getSubredditById as Mock).mockReset();
    (realRedditApi.getCurrentUser as Mock).mockReset();
  });

  describe("when no handlers provided", () => {
    it("uses vanilla reddit api", async () => {
      const devvRedditApi = createDevvRedditApi(realRedditApi, []);
      await devvRedditApi.getSubredditById("test_subreddit");
      expect(realRedditApi.getSubredditById).toBeCalledWith("test_subreddit");
    });
  });

  describe("with handlers provided", () => {
    it("does not call the real reddit api when handler is provided", async () => {
      const devvRedditApi = createDevvRedditApi(realRedditApi, [
        redditApiHandler.getSubredditById((id: string) => {
          return { id } as Subreddit;
        }),
      ]);
      await devvRedditApi.getSubredditById("test_subreddit");
      expect(realRedditApi.getSubredditById).not.toBeCalled();
    });

    it("calls the handler instead of original method", async () => {
      const devvRedditApi = createDevvRedditApi(realRedditApi, [
        redditApiHandler.getSubredditById((id: string) => {
          return { id } as Subreddit;
        }),
      ]);
      const result = await devvRedditApi.getSubredditById("test_subreddit");
      expect(realRedditApi.getSubredditById).not.toBeCalled();
      expect(result).toStrictEqual({ id: "test_subreddit" });
    });

    it("calls the original method if no handler is provided", async () => {
      (realRedditApi.getCurrentUser as Mock).mockResolvedValue({
        name: "real_user",
      });
      const devvRedditApi = createDevvRedditApi(realRedditApi, [
        redditApiHandler.getSubredditById((id: string) => {
          return { id } as Subreddit;
        }),
      ]);
      const result = await devvRedditApi.getCurrentUser();
      expect(realRedditApi.getCurrentUser).toHaveBeenCalledOnce();
      expect(result).toStrictEqual({ name: "real_user" });
    });

    it("has modMail method", async () => {
      const mockFn = vi.fn();
      const devvRedditApi = createDevvRedditApi(realRedditApi, [
        redditApiHandler.modMail(() => {
          return { getSubreddits: mockFn } as unknown as ModMailService;
        }),
      ]);
      await devvRedditApi.modMail.getSubreddits();
      expect(realRedditApi.modMail.getSubreddits).not.toBeCalled();
      expect(mockFn).toBeCalled();
    });

    it("has getSpam method", async () => {
      const mockListing = { a: "b" } as unknown as Listing<Post>;
      const devvRedditApi = createDevvRedditApi(realRedditApi, [
        redditApiHandler.getSpam(() => {
          return mockListing;
        }),
      ]);
      const result = devvRedditApi.getSpam({
        type: "post",
        subreddit: "t5_123",
      });
      expect(realRedditApi.getSpam).not.toBeCalled();
      expect(result).toStrictEqual(mockListing);
    });

    it("has all methods defined", async () => {
      const allMethodNames = [
        "getSubredditById",
        "getSubredditByName",
        "addSubredditRemovalReason",
        "getSubredditRemovalReasons",
        "getCurrentSubreddit",
        "getPostById",
        "submitPost",
        "crosspost",
        "getUserById",
        "getCollectionById",
        "createCollection",
        "getCollectionsForSubreddit",
        "getUserByUsername",
        "getCurrentUser",
        "getAppUser",
        "getSnoovatarUrl",
        "getCommentById",
        "getComments",
        "getCommentsByUser",
        "submitComment",
        "getControversialPosts",
        "getTopPosts",
        "getHotPosts",
        "getNewPosts",
        "getRisingPosts",
        "getPostsByUser",
        "getCommentsAndPostsByUser",
        "getModerationLog",
        "getApprovedUsers",
        "approveUser",
        "removeUser",
        "getWikiContributors",
        "addWikiContributor",
        "removeWikiContributor",
        "getBannedUsers",
        "banUser",
        "unbanUser",
        "getBannedWikiContributors",
        "banWikiContributor",
        "unbanWikiContributor",
        "getModerators",
        "inviteModerator",
        "revokeModeratorInvite",
        "removeModerator",
        "setModeratorPermissions",
        "getMutedUsers",
        "muteUser",
        "unmuteUser",
        "getModNotes",
        "deleteModNote",
        "addModNote",
        "addRemovalNote",
        "sendPrivateMessage",
        "sendPrivateMessageAsSubreddit",
        "approve",
        "remove",
        "getPostFlairTemplates",
        "getUserFlairTemplates",
        "createPostFlairTemplate",
        "createUserFlairTemplate",
        "editFlairTemplate",
        "deleteFlairTemplate",
        "setUserFlair",
        "removeUserFlair",
        "setPostFlair",
        "removePostFlair",
        "getWidgets",
        "deleteWidget",
        "addWidget",
        "reorderWidgets",
        "getWikiPage",
        "getWikiPages",
        "createWikiPage",
        "updateWikiPage",
        "getWikiPageRevisions",
        "revertWikiPage",
        "getWikiPageSettings",
        "updateWikiPageSettings",
        "addEditorToWikiPage",
        "removeEditorFromWikiPage",
        "getMessages",
        "markAllMessagesAsRead",
        "report",
        "getModQueue",
        "getReports",
        "getSpam",
        "getUnmoderated",
        "getEdited",
        "getVaultByAddress",
        "getVaultByUserId",
      ] as const;
      allMethodNames.forEach((methodName) => {
        const expectedResult = { called: methodName } as unknown;
        const devvRedditApi = createDevvRedditApi(realRedditApi, [
          redditApiHandler[methodName](() => {
            return expectedResult;
          }),
        ]);
        // @ts-expect-error
        const result = devvRedditApi[methodName]();
        expect(result).toStrictEqual(expectedResult);
      });
    });
  });
});
