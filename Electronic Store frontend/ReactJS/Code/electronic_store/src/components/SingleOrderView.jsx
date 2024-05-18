import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { formatDate } from "../services/helper.service";
import {Link} from "react-router-dom";

export function SingleOrderView({order,handleShowModal, handleShowModalUpdate}){
    return(
        <Card className="mt-4 shadow-sm ">
            <Card.Body>
               
                <Row>
                    <Col>
                        <b>Order ID: </b>{order.orderId}
                    </Col>
                    <Col>
                        <b>Ordered By: </b>{order.billingName}
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <Table bordered striped>
                            <tbody>
                                <tr>
                                    <td>Billing Phone</td>
                                    <td>{order.billingPhone}</td>
                                </tr>
                                <tr>
                                    <td>Items</td>
                                    <td>{order.orderItems.length}</td>
                                </tr>
                                <tr className={order.paymentStatus==="Paid"?'table-success':'table-danger'}>
                                    <td>Payment Status</td>
                                    <td>{order.paymentStatus}</td>
                                </tr>
                                <tr>
                                    <td>Order Status</td>
                                    <td>{order.orderStatus}</td>
                                </tr>
                                <tr>
                                    <td>Ordered date</td>
                                    <td>{formatDate(order.orderedDate)}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Container className="text-center">
                        <Button onClick={(event)=>handleShowModalUpdate(event,order)} variant="warning" size="sm">Update</Button>  
                        <Button className="ms-2" onClick={(event)=>handleShowModal(event,order)} variant="info" size="sm">Order Details</Button>  
                    </Container>
                                             
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}