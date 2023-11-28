import { createContext, useContext, useEffect, useState } from "react";

const TreeContext = createContext();
const TreeProvider = ({ children }) => {
    const [selected, setSelected] = useState("Binary Search Tree");
    const [openInfo,setOpenInfo]=useState(false);

    return (
        <TreeContext.Provider value={{openInfo,setOpenInfo, selected, setSelected }}>
            {children}
        </TreeContext.Provider>
    )
}
export default TreeProvider;
export const useTreeContext = () => useContext(TreeContext);