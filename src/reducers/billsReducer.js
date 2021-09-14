const billsInitialValue = []

const billsReducer = (state=billsInitialValue, action) => {
    switch (action.type) {
        case 'GET_ALL_BILLS': {
            return [...action.payload]
        }
        // case 'GET_BILL' : {
        //     return state.filter(ele=>{
        //         return ele._id === action.payload._id
        //     })
        // }
        case 'ADD_BILL' : {
            return [action.payload, ...state]
        }
        case 'DELETE_BILL': {
            return state.filter(ele => {
                return ele._id !== action.payload._id
            })
        }
        default : {
            return [...state]
        }
    }
}
export default billsReducer