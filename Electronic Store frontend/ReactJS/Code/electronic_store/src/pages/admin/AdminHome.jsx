import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";
import { FaBorderAll } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { Link } from "react-router-dom";


function AdminHome(){
    return(
        <Container>
            <Row>
                <Col>
                    <Card className="shadow border-0">
                        <Card.Body>
                            <h5 className="text-center">Welcome to Admin Dashboard</h5>
                            <p className="text-muted text-center    ">Customized dashboard for admin, to add categoties, to add products, to view categories, to view products,
                                manage orders and users and much more. Customized dashboard for admin, to add Categoties, to add Products, to view categories, to view products,
                                manage orders and users and much more.
                            </p>
                            <Container className="text-center my-4">
                                <Button as={Link} to={'/admin/products'} variant="outline-primary">Start Managing Products</Button>
                                <Button as={Link} to={'/admin/categories'}  className="ms-2" variant="outline-primary">Start Managing Categories</Button>
                                <Button as={Link} to={'/admin/orders'}  className="ms-2" variant="outline-primary">Start Managing Orders</Button>
                                <Button as={Link} to={'/admin/users'}  className="ms-2" variant="outline-primary">Start Managing Users</Button>
                            </Container>

                            <Row className="mt-5">
                                <Col >
                                    <Card className="shadow border-0">
                                        <Card.Body className="text-center">
                                            <MdOutlineProductionQuantityLimits size={60}/>
                                            <h3 className="mt-2">(2895)</h3>
                                            <p className="text-muted">Number of Products</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card className="shadow border-0">
                                        <Card.Body className="text-center">
                                            <MdCategory size={60}/>
                                            <h3 className="text-center mt-2">(5)</h3>
                                            <p className="text-center text-muted">Number of Categories</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                
                            </Row>
                            <Row className="mt-5 mb-4">
                                <Col >
                                    <Card className="shadow border-0">
                                        <Card.Body className="text-center">
                                            <FaBorderAll size={60}/>
                                            <h3 className="mt-2">(56)</h3>
                                            <p className="text-muted">Number of Orders</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card className="shadow border-0">
                                        <Card.Body className="text-center">
                                            <FaUser size={60}/>
                                            <h3 className="text-center mt-2">(20)</h3>
                                            <p className="text-center text-muted">Number of Users</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                
                            </Row>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        
    )
}
export default AdminHome;