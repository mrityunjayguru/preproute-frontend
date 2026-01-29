import { forum } from "../endPoints";
import Repository from "../Repository";
import { AxiosResponse } from "axios";

interface Payload {
  [key: string]: any;
}

interface ForumRepo {
  getForums: (payload: Payload) => Promise<AxiosResponse>;
  singleForum: (payload: Payload) => Promise<AxiosResponse>;
  createForum: (payload: Payload) => Promise<AxiosResponse>;
  updateForum: (payload: Payload) => Promise<AxiosResponse>;
  deleteForum: (payload: Payload) => Promise<AxiosResponse>;

  getComments: (payload: Payload) => Promise<AxiosResponse>;
  addComment: (payload: Payload) => Promise<AxiosResponse>;
  likeComment: (payload: Payload) => Promise<AxiosResponse>;
  likePost: (payload: Payload) => Promise<AxiosResponse>;
  replyComment: (payload: Payload) => Promise<AxiosResponse>;
  blockCommunity: (payload: Payload) => Promise<AxiosResponse>;
  
}

export const ForumRepo: ForumRepo = {
  getForums(payload) {
    return Repository.post(forum.getForums, payload);
  },

  createForum(payload) {
    return Repository.post(forum.createForum, payload);
  },

  updateForum(payload) {
    return Repository.put(forum.updateForum, payload);
  },

  deleteForum(payload) {
    return Repository.delete(forum.deleteForum, payload);
  },

  getComments(payload) {
    return Repository.post(forum.getComments, payload);
  },

  addComment(payload) {
    return Repository.post(forum.addComment, payload);
  },

  likeComment(payload) {
    return Repository.post(forum.likeComment, payload);
  },
  singleForum(payload) {
    return Repository.post(forum.singleForum, payload);
  },
  likePost(payload) {
    return Repository.post(forum.likePost, payload);
  },
  replyComment(payload) {
    return Repository.post(forum.replyComment, payload);
  },
   blockCommunity(payload) {
    return Repository.post(forum.blockCommunity, payload);
  },
};
