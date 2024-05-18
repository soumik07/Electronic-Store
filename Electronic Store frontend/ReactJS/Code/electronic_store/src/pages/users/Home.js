import { useContext } from "react";
import Base from "../../components/Base";
import UserContext from "../../context/UserContext";

function Homepage(){
    const userContext = useContext(UserContext);
    return(
        <div>
            <div>{JSON.stringify(userContext)}</div>
            Welcome {userContext.userData?.user?.name}, This is your homepage..!
            
        </div>
    );
}

export default Homepage;