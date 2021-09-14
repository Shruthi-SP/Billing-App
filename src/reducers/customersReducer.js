const customersIntialValue = []

const customersReducer = (state=customersIntialValue, action) => {
    switch (action.type) {
        case 'GET_ALL_CUSTOMER': {
            return [...action.payload]
        }
        
        case 'ADD_CUSTOMER' : {
            return [...state, action.payload]
        }
        case 'EDIT_CUSTOMER': {
            return state.map((ele)=>{
                if(ele._id === action.payload._id){
                    return { ...ele, ...action.payload }
                }else{
                    return {...ele}
                }
            })
        }
        case 'DELETE_CUSTOMER': {
            return state.filter(ele => {
                return ele._id !== action.payload._id
            })
        }
        default : {
            return [...state]
        }
    }
}
export default customersReducer