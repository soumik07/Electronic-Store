import { useEffect, useState } from "react"
import UserContext from "./UserContext";
import { doLoginLocalStorage, doLogoutFromLocalStorage, getDataFromLocalStorage, isLoggedIn } from "../auth/HelperAuth";
import { isAdminUser as adminUser } from "../auth/HelperAuth";

function UserProvider({children}){
    
    const [isLogin, setIsLogin] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isAdminUser, setIsAdminUser] = useState(false);

    useEffect(()=>{
        setIsLogin(isLoggedIn());
        setUserData(getDataFromLocalStorage());
        setIsAdminUser(adminUser());
    }, []);

    //login
    function doLogin(data){
        // console.log("inside user provider")
        // console.log(getDataFromLocalStorage())
        doLoginLocalStorage(data);
        setIsLogin(true);
        setUserData(getDataFromLocalStorage());
        setIsAdminUser(adminUser());
    }

    //logout
    function doLogout(){
        doLogoutFromLocalStorage();
        setIsLogin(false);
        setUserData(null);
        setIsAdminUser(adminUser());
    }

    return(
        <UserContext.Provider 
            value={{userData: userData,
                    setUserData: setUserData, 
                    isLogin: isLogin, 
                    setIsLogin: setIsLogin,
                    isAdminUser: isAdminUser,
                    login: doLogin, 
                    logout: doLogout}}
        >
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider