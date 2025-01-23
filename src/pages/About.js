import React ,{useReducer} from react
const initialState={age:20}
function handleAge(state,action){
    switch(action.type){
        case "increment":
            return{
                age:state.age +1
            }
            case "decrement":
                return{
                    age:state.age -1

                }
                case "reset":
                    return{
                        age:20
                    }
                    default:
                        return state
    }
}
const countAge=()=>{
    const [state,dispatch]=useReducer(handleAge,initialState)
    console.log(state);
    return(
        <div>
            <button></button>
        </div>
    )
}
export default counteAge