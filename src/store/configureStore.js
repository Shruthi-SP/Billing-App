import { applyMiddleware, combineReducers, createStore } from "redux";
import userReducer from "../reducers/userReducer";
import thunk from 'redux-thunk'
import customersReducer from "../reducers/customersReducer";
import productsReducer from "../reducers/productsReducer";
import billsReducer from "../reducers/billsReducer";

const configureStore = () => {
    const store = createStore(combineReducers({
        user: userReducer,
        customers: customersReducer,
        products: productsReducer,
        bills: billsReducer
    }), applyMiddleware(thunk))
    return store
}
export default configureStore