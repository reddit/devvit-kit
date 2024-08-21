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
    // @ts-ignore
    return match();
  }

  public getSubredditById: RedditAPIClient["getSubredditById"] = (...args) => {
    return this.#defaultHandler("getSubredditById")(...args);
  };
  public getSubredditByName: RedditAPIClient["getSubredditByName"] = (
    ...args
  ) => {
    return this.#defaultHandler("getSubredditByName")(...args);
  };
  public addSubredditRemovalReason: RedditAPIClient["addSubredditRemovalReason"] =
    (...args) => {
      return this.#defaultHandler("addSubredditRemovalReason")(...args);
    };
  public getSubredditRemovalReasons: RedditAPIClient["getSubredditRemovalReasons"] =
    (...args) => {
      return this.#defaultHandler("getSubredditRemovalReasons")(...args);
    };
  public getCurrentSubreddit: RedditAPIClient["getCurrentSubreddit"] = (
    ...args
  ) => {
    return this.#defaultHandler("getCurrentSubreddit")(...args);
  };
  public getPostById: RedditAPIClient["getPostById"] = (...args) => {
    return this.#defaultHandler("getPostById")(...args);
  };
  public submitPost: RedditAPIClient["submitPost"] = (...args) => {
    return this.#defaultHandler("submitPost")(...args);
  };
  public crosspost: RedditAPIClient["crosspost"] = (...args) => {
    return this.#defaultHandler("crosspost")(...args);
  };
  public getUserById: RedditAPIClient["getUserById"] = (...args) => {
    return this.#defaultHandler("getUserById")(...args);
  };
  public getCollectionById: RedditAPIClient["getCollectionById"] = (
    ...args
  ) => {
    return this.#defaultHandler("getCollectionById")(...args);
  };
  public createCollection: RedditAPIClient["createCollection"] = (...args) => {
    return this.#defaultHandler("createCollection")(...args);
  };
  public getCollectionsForSubreddit: RedditAPIClient["getCollectionsForSubreddit"] =
    (...args) => {
      return this.#defaultHandler("getCollectionsForSubreddit")(...args);
    };
  public getUserByUsername: RedditAPIClient["getUserByUsername"] = (
    ...args
  ) => {
    return this.#defaultHandler("getUserByUsername")(...args);
  };
  public getCurrentUser: RedditAPIClient["getCurrentUser"] = (...args) => {
    return this.#defaultHandler("getCurrentUser")(...args);
  };
  public getAppUser: RedditAPIClient["getAppUser"] = (...args) => {
    return this.#defaultHandler("getAppUser")(...args);
  };
  public getSnoovatarUrl: RedditAPIClient["getSnoovatarUrl"] = (...args) => {
    return this.#defaultHandler("getSnoovatarUrl")(...args);
  };
  public getCommentById: RedditAPIClient["getCommentById"] = (...args) => {
    return this.#defaultHandler("getCommentById")(...args);
  };
  public getComments: RedditAPIClient["getComments"] = (...args) => {
    return this.#defaultHandler("getComments")(...args);
  };
  public getCommentsByUser: RedditAPIClient["getCommentsByUser"] = (
    ...args
  ) => {
    return this.#defaultHandler("getCommentsByUser")(...args);
  };
  public submitComment: RedditAPIClient["submitComment"] = (...args) => {
    return this.#defaultHandler("submitComment")(...args);
  };
  public getControversialPosts: RedditAPIClient["getControversialPosts"] = (
    ...args
  ) => {
    return this.#defaultHandler("getControversialPosts")(...args);
  };
  public getTopPosts: RedditAPIClient["getTopPosts"] = (...args) => {
    return this.#defaultHandler("getTopPosts")(...args);
  };
  public getHotPosts: RedditAPIClient["getHotPosts"] = (...args) => {
    return this.#defaultHandler("getHotPosts")(...args);
  };
  public getNewPosts: RedditAPIClient["getNewPosts"] = (...args) => {
    return this.#defaultHandler("getNewPosts")(...args);
  };
  public getRisingPosts: RedditAPIClient["getRisingPosts"] = (...args) => {
    return this.#defaultHandler("getRisingPosts")(...args);
  };
  public getPostsByUser: RedditAPIClient["getPostsByUser"] = (...args) => {
    return this.#defaultHandler("getPostsByUser")(...args);
  };
  public getCommentsAndPostsByUser: RedditAPIClient["getCommentsAndPostsByUser"] =
    (...args) => {
      return this.#defaultHandler("getCommentsAndPostsByUser")(...args);
    };
  public getModerationLog: RedditAPIClient["getModerationLog"] = (...args) => {
    return this.#defaultHandler("getModerationLog")(...args);
  };
  public getApprovedUsers: RedditAPIClient["getApprovedUsers"] = (...args) => {
    return this.#defaultHandler("getApprovedUsers")(...args);
  };
  public approveUser: RedditAPIClient["approveUser"] = (...args) => {
    return this.#defaultHandler("approveUser")(...args);
  };
  public removeUser: RedditAPIClient["removeUser"] = (...args) => {
    return this.#defaultHandler("removeUser")(...args);
  };
  public getWikiContributors: RedditAPIClient["getWikiContributors"] = (
    ...args
  ) => {
    return this.#defaultHandler("getWikiContributors")(...args);
  };
  public addWikiContributor: RedditAPIClient["addWikiContributor"] = (
    ...args
  ) => {
    return this.#defaultHandler("addWikiContributor")(...args);
  };
  public removeWikiContributor: RedditAPIClient["removeWikiContributor"] = (
    ...args
  ) => {
    return this.#defaultHandler("removeWikiContributor")(...args);
  };
  public getBannedUsers: RedditAPIClient["getBannedUsers"] = (...args) => {
    return this.#defaultHandler("getBannedUsers")(...args);
  };
  public banUser: RedditAPIClient["banUser"] = (...args) => {
    return this.#defaultHandler("banUser")(...args);
  };
  public unbanUser: RedditAPIClient["unbanUser"] = (...args) => {
    return this.#defaultHandler("unbanUser")(...args);
  };
  public getBannedWikiContributors: RedditAPIClient["getBannedWikiContributors"] =
    (...args) => {
      return this.#defaultHandler("getBannedWikiContributors")(...args);
    };
  public banWikiContributor: RedditAPIClient["banWikiContributor"] = (
    ...args
  ) => {
    return this.#defaultHandler("banWikiContributor")(...args);
  };
  public unbanWikiContributor: RedditAPIClient["unbanWikiContributor"] = (
    ...args
  ) => {
    return this.#defaultHandler("unbanWikiContributor")(...args);
  };
  public getModerators: RedditAPIClient["getModerators"] = (...args) => {
    return this.#defaultHandler("getModerators")(...args);
  };
  public inviteModerator: RedditAPIClient["inviteModerator"] = (...args) => {
    return this.#defaultHandler("inviteModerator")(...args);
  };
  public revokeModeratorInvite: RedditAPIClient["revokeModeratorInvite"] = (
    ...args
  ) => {
    return this.#defaultHandler("revokeModeratorInvite")(...args);
  };
  public removeModerator: RedditAPIClient["removeModerator"] = (...args) => {
    return this.#defaultHandler("removeModerator")(...args);
  };
  public setModeratorPermissions: RedditAPIClient["setModeratorPermissions"] = (
    ...args
  ) => {
    return this.#defaultHandler("setModeratorPermissions")(...args);
  };
  public getMutedUsers: RedditAPIClient["getMutedUsers"] = (...args) => {
    return this.#defaultHandler("getMutedUsers")(...args);
  };
  public muteUser: RedditAPIClient["muteUser"] = (...args) => {
    return this.#defaultHandler("muteUser")(...args);
  };
  public unmuteUser: RedditAPIClient["unmuteUser"] = (...args) => {
    return this.#defaultHandler("unmuteUser")(...args);
  };
  public getModNotes: RedditAPIClient["getModNotes"] = (...args) => {
    return this.#defaultHandler("getModNotes")(...args);
  };
  public deleteModNote: RedditAPIClient["deleteModNote"] = (...args) => {
    return this.#defaultHandler("deleteModNote")(...args);
  };
  public addModNote: RedditAPIClient["addModNote"] = (...args) => {
    return this.#defaultHandler("addModNote")(...args);
  };
  public addRemovalNote: RedditAPIClient["addRemovalNote"] = (...args) => {
    return this.#defaultHandler("addRemovalNote")(...args);
  };
  public sendPrivateMessage: RedditAPIClient["sendPrivateMessage"] = (
    ...args
  ) => {
    return this.#defaultHandler("sendPrivateMessage")(...args);
  };
  public sendPrivateMessageAsSubreddit: RedditAPIClient["sendPrivateMessageAsSubreddit"] =
    (...args) => {
      return this.#defaultHandler("sendPrivateMessageAsSubreddit")(...args);
    };
  public approve: RedditAPIClient["approve"] = (...args) => {
    return this.#defaultHandler("approve")(...args);
  };
  public remove: RedditAPIClient["remove"] = (...args) => {
    return this.#defaultHandler("remove")(...args);
  };
  public getPostFlairTemplates: RedditAPIClient["getPostFlairTemplates"] = (
    ...args
  ) => {
    return this.#defaultHandler("getPostFlairTemplates")(...args);
  };
  public getUserFlairTemplates: RedditAPIClient["getUserFlairTemplates"] = (
    ...args
  ) => {
    return this.#defaultHandler("getUserFlairTemplates")(...args);
  };
  public createPostFlairTemplate: RedditAPIClient["createPostFlairTemplate"] = (
    ...args
  ) => {
    return this.#defaultHandler("createPostFlairTemplate")(...args);
  };
  public createUserFlairTemplate: RedditAPIClient["createUserFlairTemplate"] = (
    ...args
  ) => {
    return this.#defaultHandler("createUserFlairTemplate")(...args);
  };
  public editFlairTemplate: RedditAPIClient["editFlairTemplate"] = (
    ...args
  ) => {
    return this.#defaultHandler("editFlairTemplate")(...args);
  };
  public deleteFlairTemplate: RedditAPIClient["deleteFlairTemplate"] = (
    ...args
  ) => {
    return this.#defaultHandler("deleteFlairTemplate")(...args);
  };
  public setUserFlair: RedditAPIClient["setUserFlair"] = (...args) => {
    return this.#defaultHandler("setUserFlair")(...args);
  };
  public removeUserFlair: RedditAPIClient["removeUserFlair"] = (...args) => {
    return this.#defaultHandler("removeUserFlair")(...args);
  };
  public setPostFlair: RedditAPIClient["setPostFlair"] = (...args) => {
    return this.#defaultHandler("setPostFlair")(...args);
  };
  public removePostFlair: RedditAPIClient["removePostFlair"] = (...args) => {
    return this.#defaultHandler("removePostFlair")(...args);
  };
  public getWidgets: RedditAPIClient["getWidgets"] = (...args) => {
    return this.#defaultHandler("getWidgets")(...args);
  };
  public deleteWidget: RedditAPIClient["deleteWidget"] = (...args) => {
    return this.#defaultHandler("deleteWidget")(...args);
  };
  public addWidget: RedditAPIClient["addWidget"] = (...args) => {
    return this.#defaultHandler("addWidget")(...args);
  };
  public reorderWidgets: RedditAPIClient["reorderWidgets"] = (...args) => {
    return this.#defaultHandler("reorderWidgets")(...args);
  };
  public getWikiPage: RedditAPIClient["getWikiPage"] = (...args) => {
    return this.#defaultHandler("getWikiPage")(...args);
  };
  public getWikiPages: RedditAPIClient["getWikiPages"] = (...args) => {
    return this.#defaultHandler("getWikiPages")(...args);
  };
  public createWikiPage: RedditAPIClient["createWikiPage"] = (...args) => {
    return this.#defaultHandler("createWikiPage")(...args);
  };
  public updateWikiPage: RedditAPIClient["updateWikiPage"] = (...args) => {
    return this.#defaultHandler("updateWikiPage")(...args);
  };
  public getWikiPageRevisions: RedditAPIClient["getWikiPageRevisions"] = (
    ...args
  ) => {
    return this.#defaultHandler("getWikiPageRevisions")(...args);
  };
  public revertWikiPage: RedditAPIClient["revertWikiPage"] = (...args) => {
    return this.#defaultHandler("revertWikiPage")(...args);
  };
  public getWikiPageSettings: RedditAPIClient["getWikiPageSettings"] = (
    ...args
  ) => {
    return this.#defaultHandler("getWikiPageSettings")(...args);
  };
  public updateWikiPageSettings: RedditAPIClient["updateWikiPageSettings"] = (
    ...args
  ) => {
    return this.#defaultHandler("updateWikiPageSettings")(...args);
  };
  public addEditorToWikiPage: RedditAPIClient["addEditorToWikiPage"] = (
    ...args
  ) => {
    return this.#defaultHandler("addEditorToWikiPage")(...args);
  };
  public removeEditorFromWikiPage: RedditAPIClient["removeEditorFromWikiPage"] =
    (...args) => {
      return this.#defaultHandler("removeEditorFromWikiPage")(...args);
    };
  public getMessages: RedditAPIClient["getMessages"] = (...args) => {
    return this.#defaultHandler("getMessages")(...args);
  };
  public markAllMessagesAsRead: RedditAPIClient["markAllMessagesAsRead"] = (
    ...args
  ) => {
    return this.#defaultHandler("markAllMessagesAsRead")(...args);
  };
  public report: RedditAPIClient["report"] = (...args) => {
    return this.#defaultHandler("report")(...args);
  };
  public getModQueue: RedditAPIClient["getModQueue"] = (...args) => {
    // @ts-ignore
    return this.#defaultHandler("getModQueue")(...args);
  };
  public getReports: RedditAPIClient["getReports"] = (...args) => {
    // @ts-ignore
    return this.#defaultHandler("getReports")(...args);
  };
  public getSpam: RedditAPIClient["getSpam"] = (...args) => {
    // @ts-ignore
    return this.#defaultHandler("getSpam")(...args);
  };
  public getUnmoderated: RedditAPIClient["getUnmoderated"] = (...args) => {
    // @ts-ignore
    return this.#defaultHandler("getUnmoderated")(...args);
  };
  public getEdited: RedditAPIClient["getEdited"] = (...args) => {
    // @ts-ignore
    return this.#defaultHandler("getEdited")(...args);
  };
  public getVaultByAddress: RedditAPIClient["getVaultByAddress"] = (
    ...args
  ) => {
    return this.#defaultHandler("getVaultByAddress")(...args);
  };
  public getVaultByUserId: RedditAPIClient["getVaultByUserId"] = (...args) => {
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
