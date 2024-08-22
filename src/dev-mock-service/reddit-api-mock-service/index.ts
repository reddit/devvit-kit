import type { RedditAPIClient } from "@devvit/public-api";
import type {
  BasicRedditApiClient,
  OverridesMap,
  RedditApiInterface,
  RedditApiOverride,
  SyncHandler,
} from "./types.js";
import type { HandlerOverride } from "../types/index.js";
import type { ModMailService } from "@devvit/public-api";

class DevvRedditApi implements RedditApiInterface {
  #overrides: OverridesMap;
  #realRedditApi: RedditAPIClient;

  constructor(realRedditApi: RedditAPIClient, overrides: RedditApiOverride[]) {
    this.#realRedditApi = realRedditApi;
    this.#overrides = overrides.reduce<OverridesMap>((acc, override) => {
      return {
        ...acc,
        [override.method]: override.handler,
      };
    }, {});
  }

  #defaultHandler<T extends keyof RedditAPIClient>(
    methodName: T,
  ): RedditAPIClient[T] {
    const match = this.#overrides[methodName];
    if (!match) {
      return this.#realRedditApi[methodName];
    }
    return match as RedditAPIClient[T];
  }

  get modMail(): ModMailService {
    const match = this.#overrides["modMail"];
    if (!match) {
      return this.#realRedditApi.modMail;
    }
    // modmail is a getter, but we still want to provide a callable handler to be consistent
    // @ts-expect-error
    return match();
  }

  getSubredditById: RedditAPIClient["getSubredditById"] = (...args) => {
    return this.#defaultHandler("getSubredditById")(...args);
  };
  getSubredditByName: RedditAPIClient["getSubredditByName"] = (...args) => {
    return this.#defaultHandler("getSubredditByName")(...args);
  };
  addSubredditRemovalReason: RedditAPIClient["addSubredditRemovalReason"] = (
    ...args
  ) => {
    return this.#defaultHandler("addSubredditRemovalReason")(...args);
  };
  getSubredditRemovalReasons: RedditAPIClient["getSubredditRemovalReasons"] = (
    ...args
  ) => {
    return this.#defaultHandler("getSubredditRemovalReasons")(...args);
  };
  getCurrentSubreddit: RedditAPIClient["getCurrentSubreddit"] = (...args) => {
    return this.#defaultHandler("getCurrentSubreddit")(...args);
  };
  getPostById: RedditAPIClient["getPostById"] = (...args) => {
    return this.#defaultHandler("getPostById")(...args);
  };
  submitPost: RedditAPIClient["submitPost"] = (...args) => {
    return this.#defaultHandler("submitPost")(...args);
  };
  crosspost: RedditAPIClient["crosspost"] = (...args) => {
    return this.#defaultHandler("crosspost")(...args);
  };
  getUserById: RedditAPIClient["getUserById"] = (...args) => {
    return this.#defaultHandler("getUserById")(...args);
  };
  getCollectionById: RedditAPIClient["getCollectionById"] = (...args) => {
    return this.#defaultHandler("getCollectionById")(...args);
  };
  createCollection: RedditAPIClient["createCollection"] = (...args) => {
    return this.#defaultHandler("createCollection")(...args);
  };
  getCollectionsForSubreddit: RedditAPIClient["getCollectionsForSubreddit"] = (
    ...args
  ) => {
    return this.#defaultHandler("getCollectionsForSubreddit")(...args);
  };
  getUserByUsername: RedditAPIClient["getUserByUsername"] = (...args) => {
    return this.#defaultHandler("getUserByUsername")(...args);
  };
  getCurrentUser: RedditAPIClient["getCurrentUser"] = (...args) => {
    return this.#defaultHandler("getCurrentUser")(...args);
  };
  getAppUser: RedditAPIClient["getAppUser"] = (...args) => {
    return this.#defaultHandler("getAppUser")(...args);
  };
  getSnoovatarUrl: RedditAPIClient["getSnoovatarUrl"] = (...args) => {
    return this.#defaultHandler("getSnoovatarUrl")(...args);
  };
  getCommentById: RedditAPIClient["getCommentById"] = (...args) => {
    return this.#defaultHandler("getCommentById")(...args);
  };
  getComments: RedditAPIClient["getComments"] = (...args) => {
    return this.#defaultHandler("getComments")(...args);
  };
  getCommentsByUser: RedditAPIClient["getCommentsByUser"] = (...args) => {
    return this.#defaultHandler("getCommentsByUser")(...args);
  };
  submitComment: RedditAPIClient["submitComment"] = (...args) => {
    return this.#defaultHandler("submitComment")(...args);
  };
  getControversialPosts: RedditAPIClient["getControversialPosts"] = (
    ...args
  ) => {
    return this.#defaultHandler("getControversialPosts")(...args);
  };
  getTopPosts: RedditAPIClient["getTopPosts"] = (...args) => {
    return this.#defaultHandler("getTopPosts")(...args);
  };
  getHotPosts: RedditAPIClient["getHotPosts"] = (...args) => {
    return this.#defaultHandler("getHotPosts")(...args);
  };
  getNewPosts: RedditAPIClient["getNewPosts"] = (...args) => {
    return this.#defaultHandler("getNewPosts")(...args);
  };
  getRisingPosts: RedditAPIClient["getRisingPosts"] = (...args) => {
    return this.#defaultHandler("getRisingPosts")(...args);
  };
  getPostsByUser: RedditAPIClient["getPostsByUser"] = (...args) => {
    return this.#defaultHandler("getPostsByUser")(...args);
  };
  getCommentsAndPostsByUser: RedditAPIClient["getCommentsAndPostsByUser"] = (
    ...args
  ) => {
    return this.#defaultHandler("getCommentsAndPostsByUser")(...args);
  };
  getModerationLog: RedditAPIClient["getModerationLog"] = (...args) => {
    return this.#defaultHandler("getModerationLog")(...args);
  };
  getApprovedUsers: RedditAPIClient["getApprovedUsers"] = (...args) => {
    return this.#defaultHandler("getApprovedUsers")(...args);
  };
  approveUser: RedditAPIClient["approveUser"] = (...args) => {
    return this.#defaultHandler("approveUser")(...args);
  };
  removeUser: RedditAPIClient["removeUser"] = (...args) => {
    return this.#defaultHandler("removeUser")(...args);
  };
  getWikiContributors: RedditAPIClient["getWikiContributors"] = (...args) => {
    return this.#defaultHandler("getWikiContributors")(...args);
  };
  addWikiContributor: RedditAPIClient["addWikiContributor"] = (...args) => {
    return this.#defaultHandler("addWikiContributor")(...args);
  };
  removeWikiContributor: RedditAPIClient["removeWikiContributor"] = (
    ...args
  ) => {
    return this.#defaultHandler("removeWikiContributor")(...args);
  };
  getBannedUsers: RedditAPIClient["getBannedUsers"] = (...args) => {
    return this.#defaultHandler("getBannedUsers")(...args);
  };
  banUser: RedditAPIClient["banUser"] = (...args) => {
    return this.#defaultHandler("banUser")(...args);
  };
  unbanUser: RedditAPIClient["unbanUser"] = (...args) => {
    return this.#defaultHandler("unbanUser")(...args);
  };
  getBannedWikiContributors: RedditAPIClient["getBannedWikiContributors"] = (
    ...args
  ) => {
    return this.#defaultHandler("getBannedWikiContributors")(...args);
  };
  banWikiContributor: RedditAPIClient["banWikiContributor"] = (...args) => {
    return this.#defaultHandler("banWikiContributor")(...args);
  };
  unbanWikiContributor: RedditAPIClient["unbanWikiContributor"] = (...args) => {
    return this.#defaultHandler("unbanWikiContributor")(...args);
  };
  getModerators: RedditAPIClient["getModerators"] = (...args) => {
    return this.#defaultHandler("getModerators")(...args);
  };
  inviteModerator: RedditAPIClient["inviteModerator"] = (...args) => {
    return this.#defaultHandler("inviteModerator")(...args);
  };
  revokeModeratorInvite: RedditAPIClient["revokeModeratorInvite"] = (
    ...args
  ) => {
    return this.#defaultHandler("revokeModeratorInvite")(...args);
  };
  removeModerator: RedditAPIClient["removeModerator"] = (...args) => {
    return this.#defaultHandler("removeModerator")(...args);
  };
  setModeratorPermissions: RedditAPIClient["setModeratorPermissions"] = (
    ...args
  ) => {
    return this.#defaultHandler("setModeratorPermissions")(...args);
  };
  getMutedUsers: RedditAPIClient["getMutedUsers"] = (...args) => {
    return this.#defaultHandler("getMutedUsers")(...args);
  };
  muteUser: RedditAPIClient["muteUser"] = (...args) => {
    return this.#defaultHandler("muteUser")(...args);
  };
  unmuteUser: RedditAPIClient["unmuteUser"] = (...args) => {
    return this.#defaultHandler("unmuteUser")(...args);
  };
  getModNotes: RedditAPIClient["getModNotes"] = (...args) => {
    return this.#defaultHandler("getModNotes")(...args);
  };
  deleteModNote: RedditAPIClient["deleteModNote"] = (...args) => {
    return this.#defaultHandler("deleteModNote")(...args);
  };
  addModNote: RedditAPIClient["addModNote"] = (...args) => {
    return this.#defaultHandler("addModNote")(...args);
  };
  addRemovalNote: RedditAPIClient["addRemovalNote"] = (...args) => {
    return this.#defaultHandler("addRemovalNote")(...args);
  };
  sendPrivateMessage: RedditAPIClient["sendPrivateMessage"] = (...args) => {
    return this.#defaultHandler("sendPrivateMessage")(...args);
  };
  sendPrivateMessageAsSubreddit: RedditAPIClient["sendPrivateMessageAsSubreddit"] =
    (...args) => {
      return this.#defaultHandler("sendPrivateMessageAsSubreddit")(...args);
    };
  approve: RedditAPIClient["approve"] = (...args) => {
    return this.#defaultHandler("approve")(...args);
  };
  remove: RedditAPIClient["remove"] = (...args) => {
    return this.#defaultHandler("remove")(...args);
  };
  getPostFlairTemplates: RedditAPIClient["getPostFlairTemplates"] = (
    ...args
  ) => {
    return this.#defaultHandler("getPostFlairTemplates")(...args);
  };
  getUserFlairTemplates: RedditAPIClient["getUserFlairTemplates"] = (
    ...args
  ) => {
    return this.#defaultHandler("getUserFlairTemplates")(...args);
  };
  createPostFlairTemplate: RedditAPIClient["createPostFlairTemplate"] = (
    ...args
  ) => {
    return this.#defaultHandler("createPostFlairTemplate")(...args);
  };
  createUserFlairTemplate: RedditAPIClient["createUserFlairTemplate"] = (
    ...args
  ) => {
    return this.#defaultHandler("createUserFlairTemplate")(...args);
  };
  editFlairTemplate: RedditAPIClient["editFlairTemplate"] = (...args) => {
    return this.#defaultHandler("editFlairTemplate")(...args);
  };
  deleteFlairTemplate: RedditAPIClient["deleteFlairTemplate"] = (...args) => {
    return this.#defaultHandler("deleteFlairTemplate")(...args);
  };
  setUserFlair: RedditAPIClient["setUserFlair"] = (...args) => {
    return this.#defaultHandler("setUserFlair")(...args);
  };
  removeUserFlair: RedditAPIClient["removeUserFlair"] = (...args) => {
    return this.#defaultHandler("removeUserFlair")(...args);
  };
  setPostFlair: RedditAPIClient["setPostFlair"] = (...args) => {
    return this.#defaultHandler("setPostFlair")(...args);
  };
  removePostFlair: RedditAPIClient["removePostFlair"] = (...args) => {
    return this.#defaultHandler("removePostFlair")(...args);
  };
  getWidgets: RedditAPIClient["getWidgets"] = (...args) => {
    return this.#defaultHandler("getWidgets")(...args);
  };
  deleteWidget: RedditAPIClient["deleteWidget"] = (...args) => {
    return this.#defaultHandler("deleteWidget")(...args);
  };
  addWidget: RedditAPIClient["addWidget"] = (...args) => {
    return this.#defaultHandler("addWidget")(...args);
  };
  reorderWidgets: RedditAPIClient["reorderWidgets"] = (...args) => {
    return this.#defaultHandler("reorderWidgets")(...args);
  };
  getWikiPage: RedditAPIClient["getWikiPage"] = (...args) => {
    return this.#defaultHandler("getWikiPage")(...args);
  };
  getWikiPages: RedditAPIClient["getWikiPages"] = (...args) => {
    return this.#defaultHandler("getWikiPages")(...args);
  };
  createWikiPage: RedditAPIClient["createWikiPage"] = (...args) => {
    return this.#defaultHandler("createWikiPage")(...args);
  };
  updateWikiPage: RedditAPIClient["updateWikiPage"] = (...args) => {
    return this.#defaultHandler("updateWikiPage")(...args);
  };
  getWikiPageRevisions: RedditAPIClient["getWikiPageRevisions"] = (...args) => {
    return this.#defaultHandler("getWikiPageRevisions")(...args);
  };
  revertWikiPage: RedditAPIClient["revertWikiPage"] = (...args) => {
    return this.#defaultHandler("revertWikiPage")(...args);
  };
  getWikiPageSettings: RedditAPIClient["getWikiPageSettings"] = (...args) => {
    return this.#defaultHandler("getWikiPageSettings")(...args);
  };
  updateWikiPageSettings: RedditAPIClient["updateWikiPageSettings"] = (
    ...args
  ) => {
    return this.#defaultHandler("updateWikiPageSettings")(...args);
  };
  addEditorToWikiPage: RedditAPIClient["addEditorToWikiPage"] = (...args) => {
    return this.#defaultHandler("addEditorToWikiPage")(...args);
  };
  removeEditorFromWikiPage: RedditAPIClient["removeEditorFromWikiPage"] = (
    ...args
  ) => {
    return this.#defaultHandler("removeEditorFromWikiPage")(...args);
  };
  getMessages: RedditAPIClient["getMessages"] = (...args) => {
    return this.#defaultHandler("getMessages")(...args);
  };
  markAllMessagesAsRead: RedditAPIClient["markAllMessagesAsRead"] = (
    ...args
  ) => {
    return this.#defaultHandler("markAllMessagesAsRead")(...args);
  };
  report: RedditAPIClient["report"] = (...args) => {
    return this.#defaultHandler("report")(...args);
  };
  getModQueue: RedditAPIClient["getModQueue"] = (...args) => {
    // @ts-expect-error
    return this.#defaultHandler("getModQueue")(...args);
  };
  getReports: RedditAPIClient["getReports"] = (...args) => {
    // @ts-expect-error
    return this.#defaultHandler("getReports")(...args);
  };
  getSpam: RedditAPIClient["getSpam"] = (...args) => {
    // @ts-expect-error
    return this.#defaultHandler("getSpam")(...args);
  };
  getUnmoderated: RedditAPIClient["getUnmoderated"] = (...args) => {
    // @ts-expect-error
    return this.#defaultHandler("getUnmoderated")(...args);
  };
  getEdited: RedditAPIClient["getEdited"] = (...args) => {
    // @ts-expect-error
    return this.#defaultHandler("getEdited")(...args);
  };
  getVaultByAddress: RedditAPIClient["getVaultByAddress"] = (...args) => {
    return this.#defaultHandler("getVaultByAddress")(...args);
  };
  getVaultByUserId: RedditAPIClient["getVaultByUserId"] = (...args) => {
    return this.#defaultHandler("getVaultByUserId")(...args);
  };
}

export const createDevvRedditApi = (
  realRedditApi: RedditAPIClient,
  overrides: RedditApiOverride[],
): RedditAPIClient => {
  return new DevvRedditApi(
    realRedditApi,
    overrides,
  ) as unknown as RedditAPIClient;
};

const createBasicOverride =
  <T extends keyof BasicRedditApiClient>(methodName: T) =>
  (handler: SyncHandler<RedditAPIClient[T]>): RedditApiOverride => {
    return {
      handler,
      method: methodName,
      __type: "RedditApi",
    };
  };

export const redditApiHandler: Record<keyof RedditAPIClient, Function> = {
  getSubredditById: createBasicOverride("getSubredditById"),
  getSubredditByName: createBasicOverride("getSubredditByName"),
  addSubredditRemovalReason: createBasicOverride("addSubredditRemovalReason"),
  getSubredditRemovalReasons: createBasicOverride("getSubredditRemovalReasons"),
  getCurrentSubreddit: createBasicOverride("getCurrentSubreddit"),
  getPostById: createBasicOverride("getPostById"),
  submitPost: createBasicOverride("submitPost"),
  crosspost: createBasicOverride("crosspost"),
  getUserById: createBasicOverride("getUserById"),
  getCollectionById: createBasicOverride("getCollectionById"),
  createCollection: createBasicOverride("createCollection"),
  getCollectionsForSubreddit: createBasicOverride("getCollectionsForSubreddit"),
  getUserByUsername: createBasicOverride("getUserByUsername"),
  getCurrentUser: createBasicOverride("getCurrentUser"),
  getAppUser: createBasicOverride("getAppUser"),
  getSnoovatarUrl: createBasicOverride("getSnoovatarUrl"),
  getCommentById: createBasicOverride("getCommentById"),
  getComments: createBasicOverride("getComments"),
  getCommentsByUser: createBasicOverride("getCommentsByUser"),
  submitComment: createBasicOverride("submitComment"),
  getControversialPosts: createBasicOverride("getControversialPosts"),
  getTopPosts: createBasicOverride("getTopPosts"),
  getHotPosts: createBasicOverride("getHotPosts"),
  getNewPosts: createBasicOverride("getNewPosts"),
  getRisingPosts: createBasicOverride("getRisingPosts"),
  getPostsByUser: createBasicOverride("getPostsByUser"),
  getCommentsAndPostsByUser: createBasicOverride("getCommentsAndPostsByUser"),
  getModerationLog: createBasicOverride("getModerationLog"),
  getApprovedUsers: createBasicOverride("getApprovedUsers"),
  approveUser: createBasicOverride("approveUser"),
  removeUser: createBasicOverride("removeUser"),
  getWikiContributors: createBasicOverride("getWikiContributors"),
  addWikiContributor: createBasicOverride("addWikiContributor"),
  removeWikiContributor: createBasicOverride("removeWikiContributor"),
  getBannedUsers: createBasicOverride("getBannedUsers"),
  banUser: createBasicOverride("banUser"),
  unbanUser: createBasicOverride("unbanUser"),
  getBannedWikiContributors: createBasicOverride("getBannedWikiContributors"),
  banWikiContributor: createBasicOverride("banWikiContributor"),
  unbanWikiContributor: createBasicOverride("unbanWikiContributor"),
  getModerators: createBasicOverride("getModerators"),
  inviteModerator: createBasicOverride("inviteModerator"),
  revokeModeratorInvite: createBasicOverride("revokeModeratorInvite"),
  removeModerator: createBasicOverride("removeModerator"),
  setModeratorPermissions: createBasicOverride("setModeratorPermissions"),
  getMutedUsers: createBasicOverride("getMutedUsers"),
  muteUser: createBasicOverride("muteUser"),
  unmuteUser: createBasicOverride("unmuteUser"),
  getModNotes: createBasicOverride("getModNotes"),
  deleteModNote: createBasicOverride("deleteModNote"),
  addModNote: createBasicOverride("addModNote"),
  addRemovalNote: createBasicOverride("addRemovalNote"),
  sendPrivateMessage: createBasicOverride("sendPrivateMessage"),
  sendPrivateMessageAsSubreddit: createBasicOverride(
    "sendPrivateMessageAsSubreddit",
  ),
  approve: createBasicOverride("approve"),
  remove: createBasicOverride("remove"),
  getPostFlairTemplates: createBasicOverride("getPostFlairTemplates"),
  getUserFlairTemplates: createBasicOverride("getUserFlairTemplates"),
  createPostFlairTemplate: createBasicOverride("createPostFlairTemplate"),
  createUserFlairTemplate: createBasicOverride("createUserFlairTemplate"),
  editFlairTemplate: createBasicOverride("editFlairTemplate"),
  deleteFlairTemplate: createBasicOverride("deleteFlairTemplate"),
  setUserFlair: createBasicOverride("setUserFlair"),
  removeUserFlair: createBasicOverride("removeUserFlair"),
  setPostFlair: createBasicOverride("setPostFlair"),
  removePostFlair: createBasicOverride("removePostFlair"),
  getWidgets: createBasicOverride("getWidgets"),
  deleteWidget: createBasicOverride("deleteWidget"),
  addWidget: createBasicOverride("addWidget"),
  reorderWidgets: createBasicOverride("reorderWidgets"),
  getWikiPage: createBasicOverride("getWikiPage"),
  getWikiPages: createBasicOverride("getWikiPages"),
  createWikiPage: createBasicOverride("createWikiPage"),
  updateWikiPage: createBasicOverride("updateWikiPage"),
  getWikiPageRevisions: createBasicOverride("getWikiPageRevisions"),
  revertWikiPage: createBasicOverride("revertWikiPage"),
  getWikiPageSettings: createBasicOverride("getWikiPageSettings"),
  updateWikiPageSettings: createBasicOverride("updateWikiPageSettings"),
  addEditorToWikiPage: createBasicOverride("addEditorToWikiPage"),
  removeEditorFromWikiPage: createBasicOverride("removeEditorFromWikiPage"),
  getMessages: createBasicOverride("getMessages"),
  markAllMessagesAsRead: createBasicOverride("markAllMessagesAsRead"),
  report: createBasicOverride("report"),
  getModQueue: createBasicOverride("getModQueue"),
  getReports: createBasicOverride("getReports"),
  getSpam: createBasicOverride("getSpam"),
  getUnmoderated: createBasicOverride("getUnmoderated"),
  getEdited: createBasicOverride("getEdited"),
  getVaultByAddress: createBasicOverride("getVaultByAddress"),
  getVaultByUserId: createBasicOverride("getVaultByUserId"),
  modMail: (handler: () => ModMailService): RedditApiOverride => {
    return {
      handler,
      method: "modMail",
      __type: "RedditApi",
    };
  },
} as const;

export const isRedditApiHandler = (
  handler: HandlerOverride,
): handler is RedditApiOverride => handler.__type === "RedditApi";
