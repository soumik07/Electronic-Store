import { useEffect, useState } from "react";
import { getAllOrders, updateOrderAPI, updateOrderService } from "../../services/OrderService";
import {toast} from 'react-toastify';
import { ADMIN_ORDER_PAGE_SIZE, getProductImageUrl } from "../../services/helper.service";
import { Card, Col, Container, Modal, Row, Button, Table, ListGroup, ListGroupItem, Badge, Form } from "react-bootstrap";
import { SingleOrderView } from "../../components/SingleOrderView";
import { MdContactSupport } from "react-icons/md";
import { formatDate } from "../../services/helper.service";
import InfiniteScroll from 'react-infinite-scroll-component';


function AdminOrders(){

    const[orderData, setOrderData] = useState(undefined)
    
    
    useEffect(()=>{
        //Loading the Orders from backend when the component gets loaded
        getAllOrdersFromBacknd();
    },[orderData])

    const getAllOrdersFromBacknd = async ()=> {
            
            try{
                const data = await getAllOrders(0,ADMIN_ORDER_PAGE_SIZE, 'orderedDate', 'desc')
                setOrderData(data); 
                // console.log(data)
                // console.log("from order api")
            }catch(e){
                console.log(e)
                console.log("error")
            }
            
        
    }

    //Load order from  next page
    const [currentPage, setCurrentPage] = useState(0)
    useEffect(()=>{
        if(currentPage > 0){
            getAllOrdersFromBacknd()
        }
    },[currentPage])
    const loadNextPage = () =>{
        setCurrentPage(currentPage+1)
    }

    //Selected order state
    const [selectedOrder, setSelectedOrder] = useState(undefined)

    //Modal state for View
    const [show, setShow] = useState(false);
    const handleCloseModal = () => setShow(false);
    const handleShowModal = (event, order) =>{
        setSelectedOrder(order)
        //console.log(selectedOrder)
        setShow(true);
    } 
    //Modal for view order
    const viewOrderDetailsModal = () => {
        return (
            <>
              {/* <Button variant="primary" onClick={handleShowModal}>
                Launch demo modal
              </Button> */}
              
              <Modal animation={false} size="xl" show={show} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <b>Order ID: </b>{selectedOrder.orderId}
                                </Col>
                                <Col>
                                    <b>Billing Name: </b>{selectedOrder.billingName}
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col>
                                    <Table bordered striped>
                                        <tbody>
                                            <tr>
                                                <td>Billing Phone</td>
                                                <td>{selectedOrder.billingPhone}</td>
                                            </tr>
                                            <tr>
                                                <td>Items</td>
                                                <td>{selectedOrder.orderItems.length}</td>
                                            </tr>
                                            <tr>
                                                <td>Order Amount</td>
                                                <td>{selectedOrder.orderAmount}</td>
                                            </tr>
                                            <tr className={selectedOrder.paymentStatus==="Paid"?'table-success':'table-danger'}>
                                                <td>Payment Status</td>
                                                <td>{selectedOrder.paymentStatus}</td>
                                            </tr>
                                            <tr>
                                                <td>Order Status</td>
                                                <td>{selectedOrder.orderStatus}</td>
                                            </tr>
                                            <tr>
                                                <td>Ordered date</td>
                                                <td>{formatDate(selectedOrder.orderedDate)}</td>
                                            </tr>
                                            <tr>
                                                <td>Delivery Date</td>
                                                <td>{selectedOrder.deliveredDate?formatDate(selectedOrder.deliveredDate):'Not-available'}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Card className="mt-3">
                        <Card.Body>
                            <h5>Order Items</h5>
                            
                            <ListGroup>
                                {selectedOrder.orderItems.map((item)=>{
                                    return (
                                        <ListGroup.Item action className="mt-2">
                                            <Row>
                                                <Col md={2} className="d-flex align-items-center">
                                                    <img style={{width: "100px"}} src={getProductImageUrl(item.product.productId)}/>
                                                </Col>
                                                <Col>
                                                    <b>{item.product.title}</b>
                                                    <div className="mt-2">
                                                        <Badge pill bg="primary">Quantity: {item.product.quantity}</Badge>
                                                        <Badge pill className="ms-2" bg="success">Amount: {item.product.price}</Badge>
                                                    </div>
                                                    <p className="text-muted mt-2">Product ID: {item.product.productId}</p>
                                                </Col>
                                            </Row>
                                            
                                        </ListGroup.Item>
                                    ) 
                                })}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleCloseModal}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          );
    }


    //modal state for Update
    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseModalUpdate = () => setShowUpdate(false);
    const handleShowModalUpdate = (event, order) =>{
        setSelectedOrder(order)
        console.log(selectedOrder)
        setShowUpdate(true);
    }
    const handleUpdateChange = (event, property) => {
        setSelectedOrder({
            ...selectedOrder,
            [property]: event.target.value 
        })
    }

    //Update Order API backend
    async function updateOrder  (event){
        event.preventDefault();
        console.log(selectedOrder)
        
        try{
            var data = await updateOrderService(selectedOrder)
            // console.log(data)
            toast.success("Order Updated")
            // console.log(data)
            // console.log(item)
            // console.log(selectedOrder)
            // const newList = orderData.content.map(item=>{
            //     if(selectedOrder.orderId === item.orderId){
            //         return data
            //     }else{
            //         return item
            //     }
            // })
            // setOrderData({
            //     ...orderData,
            //     content: newList
            // })
            // setOrderData(selectedOrder)
        }catch(error){
            toast.error("Error")
            console.log(error)
        }

    }
        
    const updateOrderDetailsModal = () => {
        return (
            <>
                <Modal size="lg" animation={false} show={showUpdate} onHide={handleCloseModalUpdate}>
                  <Modal.Header closeButton>
                    <Modal.Title>Update Order</Modal.Title>
                    {/* {JSON.stringify(selectedOrder)} */}
                  </Modal.Header>
                  <Modal.Body>
                    <Card >
                        <Card.Body>
                            <Form onSubmit={updateOrder}>
                                <Form.Group>
                                    <Form.Label><b>Billing Name</b></Form.Label>
                                    <Form.Control type="text" value={selectedOrder.billingName} 
                                    onChange={(event)=>handleUpdateChange(event,"billingName")}/>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Form.Label><b>Phone Number</b></Form.Label>
                                    <Form.Control type="text" value={selectedOrder.billingPhone}
                                    onChange={(event)=>handleUpdateChange(event, "billingPhone")}/>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Form.Label><b>Billing Address</b></Form.Label>
                                    <Form.Control type="text" value={selectedOrder.billingAddress}
                                    onChange={(event)=>handleUpdateChange(event, "billingAddress")}/>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Form.Label><b>Payment Status</b></Form.Label>
                                    <Form.Select onChange={(event)=>{
                                        setSelectedOrder({
                                            ...selectedOrder,
                                            paymentStatus: event.target.value
                                        })
                                    }}>
                                        <option selected={selectedOrder.paymentStatus === "Paid"} value="Paid">Paid</option>
                                        <option selected={selectedOrder.paymentStatus === "Not Paid"} value="Not Paid">Not Paid</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Form.Label><b>Order Status</b></Form.Label>
                                    <Form.Select onChange={(event)=>{
                                        setSelectedOrder({
                                            ...selectedOrder,
                                            orderStatus: event.target.value
                                        })
                                    }}>
                                        <option value="Pending">Pending</option>
                                        <option value="Dispatched">Dispatched</option>
                                        <option value="OnWay">OnWay</option>
                                        <option value="Delivered">Delivered</option>
                                    </Form.Select>

                                {/* DeleveredDate */}
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Form.Label><b>Select Delivey date</b></Form.Label>
                                    <Form.Control type="text" value={selectedOrder.deliveredDate}
                                    onChange={(event)=>{
                                        //console.log("Date")
                                        setSelectedOrder({
                                            ...selectedOrder,
                                            deliveredDate: event.target.value
                                        }) 
                                    }}/>
                                    <p className="text-muted">Format: YYYY-MM-DD</p>
                                </Form.Group>

                                <Container className="text-center">
                                    <Button type="submit" variant="primary" >
                                        Save Changes
                                    </Button>
                                    <Button className="ms-2" variant="secondary" onClick={handleCloseModalUpdate}>
                                        Close
                                    </Button>
                                </Container>
                            </Form>
                        </Card.Body>
                    </Card>
                          
                  </Modal.Body>
                </Modal>
            </>
        );
    }

    //view all order
    const orderView = () => {
        return(
            <Container >
                {/* {console.log(orderData)} */}
                <Row>
                    <Col>
                        <Card className="shadow border-0">
                            <Card.Body>
                                <h5 className="text-center">All Orders Here</h5>
                                <InfiniteScroll
                                    dataLength={orderData.content.length}
                                    next={loadNextPage}
                                    hasMore={!orderData.lastPage}
                                    loader={<h3 className="text-center my-4">Loading...</h3>}
                                    endMessage={<p className="text-center my-3 text-muted">All orders loaded</p>}
                                    >
                                    {
                                    
                                    orderData.content.map(order=>{
                                       return (<SingleOrderView key={order.orderId} order={order} 
                                        handleShowModalUpdate={handleShowModalUpdate} handleShowModal={handleShowModal}/>)
                                    })}
                                </InfiniteScroll>
                                {selectedOrder && viewOrderDetailsModal()}
                                {showUpdate && updateOrderDetailsModal()}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
    return(
        <div>
              {(orderData === undefined ) ?  <>
                <h3>No Orders Present Currently</h3>
              </>: orderView()}
            
            

        </div>
    );
}
export default AdminOrders;