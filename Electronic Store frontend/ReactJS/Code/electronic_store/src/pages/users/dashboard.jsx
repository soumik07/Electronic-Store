import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../auth/HelperAuth";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

function Dashboard(){
    
    // ADDED THE BELOW LINE TO RELOAD THE COMPONENT TO FETCH THE REAL TIME VALUE OF isLoggedIn() FUNCTION
    const userContext = useContext(UserContext)
    const dashboardView = ()=> {
        return(
            <>
                {/* <div>This is user Dashboard</div> */}
                <Outlet/>
            </>
        );
    }

    return(
        (isLoggedIn()) ? dashboardView() : <Navigate to={"/login"}/>
        
    );
}

export default Dashboard;