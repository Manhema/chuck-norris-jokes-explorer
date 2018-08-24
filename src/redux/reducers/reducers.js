import { combineReducers } from "redux";

//reducers
import { categories, category } from "./category/category";

const ChuckNorrisApp = combineReducers({
  categories,
  category
});

export default ChuckNorrisApp;
