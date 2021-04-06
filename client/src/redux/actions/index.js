import { ADD_ARTICLE } from "../constants/action-types";

// type property is a string. Strings are prone to typos and duplicates 
// for this reason it's better to declare actions as constants

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload };
}