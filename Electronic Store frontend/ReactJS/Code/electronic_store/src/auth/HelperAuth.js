// will use local storage to store data, so that, it does not vanish when we do a page refresh
// set the data/user/token in local storage while login, remove the data while logout and fetch when required...

 //login
export function doLoginLocalStorage(data){
    // console.log("inside dologin helper.auth")
    // console.log(data)
    localStorage.setItem("userData", JSON.stringify(data));
}
export function isLoggedIn(){
    if(getTokenFromLocalStorage()){
        return true;
    }else{
        return false;
    }
}
export function isAdminUser(){
    if(isLoggedIn()){
        const user = getUserFromLocalStorage();
        const roles = user.roles;
        if(roles.find((role)=>role.roleId == "wetrsdfwetwfasfwdf")){
            return true;
        }else{
            return false;
        }

    }else{
        return false;
    }
}

 //logout
export function doLogoutFromLocalStorage(){
    localStorage.removeItem("userData");
}

 //fetch
 export function getDataFromLocalStorage(){
    const data = localStorage.getItem("userData")
    if(data != null){
        return JSON.parse(data);
    }
    return null;
 }
 export function getUserFromLocalStorage(){
    const data = getDataFromLocalStorage()
    if(data != null){
        return data.user;
    }
    return null;
 }
 export function getTokenFromLocalStorage(){
    const data = getDataFromLocalStorage()
    if(data != null){
        return data.jwtToken;
    }
    return null;
 }