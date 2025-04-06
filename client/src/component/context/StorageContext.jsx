import { createContext, useState } from "react";

const StorageContext=createContext(null);

const StorageContextProvider=(props)=>{

    const url="http://localhost:5000";
    const [token,settoken]=useState(null);
    const contextValue={
       url,
       token,
       settoken,
    }
    return (
        <StorageContext.Provider value={contextValue}>
            {props.children}
        </StorageContext.Provider>
    )
}

export default StorageContextProvider;