import { useContext, useReducer, createContext } from "react";
import AppReducer, { initialState } from "./AppReducer";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    return (
        <GlobalContext.Provider
            value={{ basket: state.basket, user: state.user, dispatch: dispatch }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
export default GlobalProvider;
export const useAuth = () => {
    return useContext(GlobalContext);
};
