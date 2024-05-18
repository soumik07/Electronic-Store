import { Badge, ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { BiCategory } from "react-icons/bi";
import { BiSolidCategory } from "react-icons/bi";
import { MdAddBox } from "react-icons/md";
import { MdOutlineViewCarousel } from "react-icons/md";
import { MdBorderColor } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { FaUserShield } from "react-icons/fa6";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

function SideMenu(){

    const {logout} = useContext(UserContext)

    return(
        <>
            <ListGroup variant="flush" className="shadow " style={
                                                                    {
                                                                        position: "sticky",
                                                                        top: "60px"
                                                                    }}>
                <ListGroup.Item className="" as={NavLink} to={'/admin/home'} variant='light'  action>
                    <HiHome className="me-2"/> 
                    Home
                </ListGroup.Item>
                <ListGroup.Item as={NavLink} to={'/admin/add-category'} variant='light' action>
                    <BiCategory className="me-2"/>
                    Add Category
                </ListGroup.Item>
                <ListGroup.Item as={NavLink} to={'/admin/categories'} variant='light' action>
                    <BiSolidCategory className="me-2"/>
                    View Category
                </ListGroup.Item>
                <ListGroup.Item as={NavLink} to={'/admin/add-product'} variant='light' action>
                    <MdAddBox className="me-2"/>
                    Add Products
                </ListGroup.Item>
                <ListGroup.Item as={NavLink} to={'/admin/products'} variant='light' action>
                    <MdOutlineViewCarousel className="me-2"/>
                    View Products</ListGroup.Item>
                <ListGroup.Item as={NavLink} to={'/admin/users'} className="d-flex justify-content-between align-item-start" variant='light'  action>
                    <div>
                        <FaUserShield className="me-2"/>
                        Users
                    </div>
                    <Badge bg="danger" pill>New</Badge>
                </ListGroup.Item>
                <ListGroup.Item as={NavLink} to={'/admin/orders'} variant='light' action>
                    <MdBorderColor className="me-2"/>
                    Orders
                </ListGroup.Item>
                <ListGroup.Item as={NavLink} to={'/users/home'} variant='light'  action>
                    <MdDashboard className="me-2"/>    
                    Dashboard
                </ListGroup.Item>
                <ListGroup.Item action href='/login' variant='light' onClick={(event)=>{logout()}}>
                    <IoLogOut className="me-2"/>
                    Logout
                </ListGroup.Item>
            </ListGroup>
        </>
    );
}

export default SideMenu;