import React from "react";
const myContext=createContext()
const provider=({children})=>{
    const[name,setName]=useState("uwase Ndegeya Nina")
    return(
        <myContext.Provider value={{name,setName}}>
            {children}</myContext.Provider>

    )
}
export default Provider