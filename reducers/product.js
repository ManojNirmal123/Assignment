import {
    GET_PRODUCTS,
    GET_PRODUCTS_FAILURE,
    GET_PRODUCTS_SUCCESS,
    GET_SEARCH_PRODUCTS,
    GET_SEARCH_PRODUCTS_SUCCESS,
    GET_INITIAL_SEARCH_PRODUCTS_SUCCESS,
    GET_PRODUCT,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAILURE,
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAILURE,
    DELETE_PRODUCTS,
    DELETE_PRODUCTS_SUCCESS
} from "../actionTypes/product";

export default (prevState = {
    products: [],
    product: {},
    isLoading: false,
    isRefreshing: false,
    page: 1,
    limit: 8
}, action) => {
    console.log(action.type);
    switch (action.type) {
        case GET_PRODUCTS:
            return { ...prevState,
                isLoading: prevState.products.length > 0 ? false:true,
                page: action.page
            }
        case GET_PRODUCTS_SUCCESS:
            return { ...prevState,
                isLoading: false,
                products: prevState.products.concat(action.products)
            }
        case DELETE_PRODUCTS:
            return { ...prevState,
                //isLoading: prevState.products.length > 0 ? false:true,
                //page: action.page
            }
        case DELETE_PRODUCTS_SUCCESS: 
            return { ...prevState,
                //isLoading: false,
                products: action.products
            }
        case GET_SEARCH_PRODUCTS:
            return { ...prevState,
                isLoading: prevState.products.length > 0 ? false:true,
                page: action.page
            }
        case GET_SEARCH_PRODUCTS_SUCCESS:
            return { ...prevState,
                isLoading: false,
                products: prevState.products.length > 0 ? prevState.products.concat(action.products) : action.products
            }
        case GET_INITIAL_SEARCH_PRODUCTS_SUCCESS:
            return { ...prevState,
                isLoading: false,
                products: action.products
            }
        case GET_PRODUCT:
            return { ...prevState,
                isLoading: true
            }
        case GET_PRODUCT_SUCCESS:
            return { ...prevState,
                isLoading: false,
                product: action.product
            }
        case ADD_PRODUCT:
            return { ...prevState,
                isLoading: true,
                product: action.product
            }
        case ADD_PRODUCT_SUCCESS:
            return { ...prevState,
                isLoading: false,
                isProductAdded:true,
                product: action.product
            }
        case GET_PRODUCTS_FAILURE:
        case GET_PRODUCT_FAILURE:
        case ADD_PRODUCT_FAILURE:
            return { ...prevState,
                isLoading: false,
                error: action.error
            }
        default:
            return prevState;

    }
}