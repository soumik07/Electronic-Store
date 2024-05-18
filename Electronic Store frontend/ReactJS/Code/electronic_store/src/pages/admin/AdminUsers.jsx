import { useEffect, useState } from "react";
import { getAllUser } from "../../services/user.service";
import {Card} from 'react-bootstrap';
import { SingleUserView } from "../../components/admin/SingleUserView";

function AdminUsers(){

    const[userData,setUserData] = useState(undefined)

    useEffect(()=>{
        getUsers(0,20,'name','asc')
    },[])
    const getUsers = (pageNumber,pageSize,sortBy,sortDir) => {
        getAllUser(pageNumber,pageSize,sortBy,sortDir).then(data=>{
            
            setUserData(data)
            console.log(userData)
        }).catch(error=>{
            console.log(error);
        })
    }

    const viewUsers = () => {
        return(
            <>
                <Card className="shadow border-0">
                    <Card.Body>
                        <h5 className="text-center mb-2">All Users Here</h5>
                        {userData.content.map(user=>{
                            return <SingleUserView user={user}/>
                        })}
                    </Card.Body>
                </Card>
            </>
        )
    }
    return(
        <div>
            {userData && viewUsers()}
        </div>
    );
}
export default AdminUsers;