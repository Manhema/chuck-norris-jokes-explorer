import { fetch, queryString } from "../actions";

//get categories details
export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_CATEGORIES_PENDING = "SET_CATEGORIES_PENDING";
export const SET_CATEGORIES_SUCCESS = "SET_CATEGORIES_SUCCESS";
export const SET_CATEGORIES_ERROR = "SET_CATEGORIES_ERROR";
export const SET_CATEGORIES_FAILURE = "SET_CATEGORIES_FAILURE";

function setCategories(categories) {
  return { type: SET_CATEGORIES, categories };
}

function setCategoriesPending(isCategoriesPending) {
  return { type: SET_CATEGORIES_PENDING, isCategoriesPending };
}

function setCategoriesSuccess(isCategoriesSuccess) {
  return { type: SET_CATEGORIES_SUCCESS, isCategoriesSuccess };
}

function setCategoriesError(categoriesError) {
  return { type: SET_CATEGORIES_ERROR, categoriesError };
}

function setCategoriesFailure(categoriesFailure) {
  return { type: SET_CATEGORIES_FAILURE, categoriesFailure };
}

export function categories() {
  return (dispatch, getState) => {
    dispatch(setCategories(null));
    dispatch(setCategoriesPending(true));
    dispatch(setCategoriesSuccess(false));
    dispatch(setCategoriesError(null));
    dispatch(setCategoriesFailure(null));

    fetch("https://api.chucknorris.io/jokes/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
      // body: JSON.stringify({ }),
    })
      .then(response => response.json())
      .then(response => {
        dispatch(setCategoriesPending(false));
        // alert(response.length)
        if (response.length != 0) {
          dispatch(setCategories(response));
          dispatch(setCategoriesSuccess(true));
        } else {
          let message = new Error("No results found");
          dispatch(setCategoriesError(message));
        }
      })
      .catch(error => dispatch(setCategoriesFailure(error)));
  };
}

//get category details
export const SET_CATEGORY = "SET_CATEGORY";
export const SET_CATEGORY_PENDING = "SET_CATEGORY_PENDING";
export const SET_CATEGORY_SUCCESS = "SET_CATEGORY_SUCCESS";
export const SET_CATEGORY_ERROR = "SET_CATEGORY_ERROR";
export const SET_CATEGORY_FAILURE = "SET_CATEGORY_FAILURE";

function setCategory(category) {
  return { type: SET_CATEGORY, category };
}

function setCategoryPending(isCategoryPending) {
  return { type: SET_CATEGORY_PENDING, isCategoryPending };
}

function setCategorySuccess(isCategorySuccess) {
  return { type: SET_CATEGORY_SUCCESS, isCategorySuccess };
}

function setCategoryError(categoryError) {
  return { type: SET_CATEGORY_ERROR, categoryError };
}

function setCategoryFailure(categoryFailure) {
  return { type: SET_CATEGORY_FAILURE, categoryFailure };
}

export function category(type) {
  return (dispatch, getState) => {
    dispatch(setCategory(null));
    dispatch(setCategoryPending(true));
    dispatch(setCategorySuccess(false));
    dispatch(setCategoryError(null));
    dispatch(setCategoryFailure(null));

    // alert(type)
    let params = { category: type };
    fetch(
      `https://api.chucknorris.io/jokes/random?${queryString.stringify(
        params
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
        // body: queryString.stringify({'category': 'science'}),
      }
    )
      .then(response => response.json())
      .then(response => {
        dispatch(setCategoryPending(false));
        // alert(response)
        // alert(JSON.stringify(response))
        if (response.length != 0) {
          dispatch(setCategory(response));
          dispatch(setCategorySuccess(true));
        } else {
          let message = new Error("No results found");
          dispatch(setCategoryError(message));
        }
      })
      .catch(error => dispatch(setCategoryFailure(error)));
  };
}
