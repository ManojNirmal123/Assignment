import {
    put,
    takeLatest
} from "redux-saga/effects";
import * as actionCreators from "../actionCreators/product"
import {
    GET_PRODUCTS, ADD_PRODUCT,GET_SEARCH_PRODUCTS,DELETE_PRODUCTS,DELETE_PRODUCTS_SUCCESS
} from "../actionTypes/product";

let URI = "http://10.100.218.40:4000/products";
let initialKey = 0;
function* getProducts(action) { 
    try {
        let products = yield fetch(`${URI}?_page=${action.page}&_limit=${action.limit}`).then(r => r.json());
        yield put(actionCreators.getProductsSuccess(products))
    } catch (error) {
        yield put(actionCreators.getProductsFailure(error))
    }
}

function* getSearchProducts(action) {
    try {
        let products = yield fetch(`${URI}?q=${action.search}&_page=${action.page}&_limit=${action.limit}`).then(r => r.json());
        if(initialKey === 0){
            yield put(actionCreators.getInitialSearchProductsResults(products))
        }else{
            yield put(actionCreators.getSearchProductsResults(products))
        }
        initialKey = 1;
    } catch (error) {
        yield put(actionCreators.getProductsFailure(error))
    }
}

function* deleteProduct(action){
    try {
            let product = yield fetch(`${URI}/${action.id}`, {
                method: 'DELETE',
            }).then(r => r.json());
            let actions = {page:1,limit:8};
            let products = yield fetch(`${URI}?_page=${action.page}&_limit=${action.limit}`).then(r => r.json());
           yield put(actionCreators.deleteProductsSuccess(products));
            
            
            
           
    } catch (error) {
        yield put(actionCreators.getProductsFailure(error))
    }
}
// function* getProduct(action) {
//     try {
//         let product = yield fetch(`${URI}\product\${action.id}`).then(r => r.json());
//         yield put(actionCreators.getProductSuccess(product))
//     } catch (error) {
//         yield put(actionCreators.getProductFailure(error))
//     }
// }

function* addProduct(action) {
     console.log('yes');
    try {
        let product = yield fetch(`${URI}`, {
            body: JSON.stringify(action.product),
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
        }).then(r => r.json());
        yield put(actionCreators.addProductSuccess(product));
    } catch (error) {
        yield put(actionCreators.addProductFailure(error))
    }
}

export function* productWatchers() {
    yield takeLatest(GET_PRODUCTS, getProducts);
    yield takeLatest(GET_SEARCH_PRODUCTS, getSearchProducts);
    yield takeLatest(DELETE_PRODUCTS, deleteProduct);
    yield takeLatest(ADD_PRODUCT, addProduct);
}

// export function* searchProductWatchers() {
//     yield takeLatest(GET_SEARCH_PRODUCTS, getSearchProducts)
// }