import { Button } from "react-bootstrap";
import Base from "../components/Base";
import { toast } from "react-toastify";

function Index(){
    function showSuccessToast(){
        toast.success("Success..");
    }
    return(
        <Base title="Home page" description="Welcome to homepage" buttonEnabled={true}
         buttonText="Start shopping" buttonType="primary">
            <h3>This is index page</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <Button variant="success" onClick={showSuccessToast}>Toastify</Button>
        </Base>
        
    );
}

export default Index;