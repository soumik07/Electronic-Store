import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import {Link} from "react-router-dom";

export function SingleUserView({user}){
    return(
        <>
            <Card className="mt-3">
                <Card.Body>
                    <Row>
                        <Col md={2} className="d-flex justify-content-center">
                            <Container className="">
                            <img style={{width: "70px"}} src="https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png"/>
                            </Container>
                        </Col>
                        <Col md={6}>
                            <div><b><Link to={`/users/profile/${user.userId}`}>{user.name}</Link></b></div>
                            <div className="text-muted ">{user.about}</div>
                            <div className="text-muted  ">{user.email}</div>
                            
                            {/* {JSON.stringify(user.name)} */}
                        </Col>
                        <Col md={4}>
                            {user.roles.map(role=>{
                                return <Badge bg={role.roleName === "ROLE_ADMIN" ? 'primary':'success'} className="ms-2">{role.roleName}</Badge>
                            })}
                            
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    )
}