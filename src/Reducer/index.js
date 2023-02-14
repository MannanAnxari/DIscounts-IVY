import userReducer from "./Reducer";
import { combineReducers } from "redux";
import styleReducer from "./StyleReducer";

const rootReducer = combineReducers({
    userReducer,
    styleReducer
})

export default rootReducer