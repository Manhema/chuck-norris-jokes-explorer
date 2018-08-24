import {
  SET_CATEGORY,
  SET_CATEGORY_PENDING,
  SET_CATEGORY_SUCCESS,
  SET_CATEGORY_ERROR,
  SET_CATEGORY_FAILURE,
  SET_CATEGORIES,
  SET_CATEGORIES_PENDING,
  SET_CATEGORIES_SUCCESS,
  SET_CATEGORIES_ERROR,
  SET_CATEGORIES_FAILURE
} from "../../actions/category/category";

export function category(
  state = {
    category: null,
    isCategorySuccess: false,
    isCategoryPending: false,
    categoryError: null,
    categoryFailure: null
  },
  action
) {
  switch (action.type) {
    case SET_CATEGORY:
      return Object.assign({}, state, {
        category: action.category
      });

    case SET_CATEGORY_PENDING:
      return Object.assign({}, state, {
        isCategoryPending: action.isCategoryPending
      });

    case SET_CATEGORY_SUCCESS:
      return Object.assign({}, state, {
        isCategorySuccess: action.isCategorySuccess
      });

    case SET_CATEGORY_ERROR:
      return Object.assign({}, state, {
        categoryError: action.categoryError
      });

    case SET_CATEGORY_FAILURE:
      return Object.assign({}, state, {
        categoryFailure: action.categoryFailure
      });

    default:
      return state;
  }
}

export function categories(
  state = {
    categories: null,
    isCategoriesSuccess: false,
    isCategoriesPending: false,
    categoriesError: null,
    categoriesFailure: null
  },
  action
) {
  switch (action.type) {
    case SET_CATEGORIES:
      return Object.assign({}, state, {
        categories: action.categories
      });

    case SET_CATEGORIES_PENDING:
      return Object.assign({}, state, {
        isCategoriesPending: action.isCategoriesPending
      });

    case SET_CATEGORIES_SUCCESS:
      return Object.assign({}, state, {
        isCategoriesSuccess: action.isCategoriesSuccess
      });

    case SET_CATEGORIES_ERROR:
      return Object.assign({}, state, {
        categoriesError: action.categoriesError
      });

    case SET_CATEGORIES_FAILURE:
      return Object.assign({}, state, {
        categoriesFailure: action.categoriesFailure
      });

    default:
      return state;
  }
}
