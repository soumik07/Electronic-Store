import { Navigate, Outlet } from "react-router-dom";
import { isAdminUser } from "../../auth/HelperAuth";
import { Button, Card, Col, Container, Form, NavLink, Row, Spinner } from "react-bootstrap";
import SideMenu from "../../components/admin/SideMenu";


function AdminDashboard(){

    function dashboardView(){
        return(

            // remove the offset to make the CATEGORY FROM NAVBAR VISIBLE

            <div>
              <Container className="p-5">
                    <Row >
                        <Col className="" md={{
                            span: 2,
                            offset: 0
                            
                            }}>
                        
                            <SideMenu/>
                        </Col>
                        <Col md={10} className=" ps-3 pt-0">
                            <Outlet/>
                        </Col>
                    </Row>
              </Container>
            </div>
        );
    }

    return(
        isAdminUser() ? dashboardView() : <Navigate to={"/users/home"}/>
        
    )
}
export default AdminDashboard;