import { useContext } from "react";
import Provider,{MyContext}from'./useContextApi'
const Name = () =>{
const {name,setName}=useContext(myContext)
    return(
        <div>Name</div>
    )
}
export default Name    

