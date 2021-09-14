const productsIntialValue = []

const productsReducer = (state=productsIntialValue, action) => {
    switch (action.type) {
        case 'GET_ALL_PRODUCTS': {
            return [...action.payload]
        }
        // case 'GET_CUSTOMER' : {
        //     return state.filter(ele=>{
        //         return ele._id === action.payload._id
        //     })
        // }
        case 'ADD_PRODUCT' : {
            return [...state, action.payload]
        }
        case 'EDIT_PRODUCT': {
            return state.map((ele)=>{
                if(ele._id === action.payload._id){
                    return { ...ele, ...action.payload }
                }else{
                    return {...ele}
                }
            })
        }
        case 'DELETE_PRODUCT': {
            return state.filter(ele => {
                return ele._id !== action.payload._id
            })
        }
        default : {
            return [...state]
        }
    }
}
export default productsReducer