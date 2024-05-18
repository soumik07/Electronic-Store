import { Button, Card, Col, Container, Row, Table, Form, Pagination, Modal, InputGroup } from "react-bootstrap";
import { getAllProducts, searchProduct } from "../../services/ProductService";
import { useEffect, useState } from "react";
import {toast} from "react-toastify";
import { SingleProductView } from "../../components/admin/SingleProductView";
import { json } from "react-router-dom";
import { getProductImageUrl } from "../../services/helper.service";

function ViewProduct(){
    const[products, setProducts] = useState(undefined)
    

    // State for selected product from SingleProductView
    const[selectedProduct, setSelectedProduct] = useState(undefined)

    //State for showing and closing the view modal
    const [showView, setShowView] = useState(false);
    const handleCloseView = () => setShowView(false);
    const handleShowView = (event, product) =>{
        
        setSelectedProduct(product)
        setShowView(true);
        // console.log(selectedProduct.title)
    } 

    useEffect(()=>{
        getProducts()
    },[])

    const getProducts = (pageNumber = 0, pageSize = 10, sortBy = "addedDate", sortDir = "asc") =>{
        getAllProducts(pageNumber, pageSize, sortBy, sortDir).then(data=>{
            console.log(data)
            setProducts({
                ...data
            })
        }).catch(error=>{
            toast.error("Error in getting the products from backend API....")
            console.log(error)  
        })
    }
    const updateProductRealTime = (productId) => {
           const newArray = products.content.filter((p) => {
                return p.productId != productId
            })
            setProducts({
                ...products,
                content: newArray
            })
    }

    const viewProductModal = () => {
        return selectedProduct && (
            <>
                <Modal  size="lg" centered show={showView} onHide={handleCloseView}>
                  <Modal.Header closeButton>
                    <Modal.Title>{selectedProduct.title}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Card className="shadow border-0">
                        <Card.Body>
                            <Container className="text-center">
                                <img style={{height: "200px", width: "200px"}} src={selectedProduct.productImageName?getProductImageUrl(selectedProduct.productId): selectedProduct.category.coverImage} alt=""/>
                            </Container>
                            <Table className="p-3 border    " striped>
                                <thead>
                                    <tr>
                                        <th>Info</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>product ID</th>
                                        <td>{selectedProduct.productId}</td>
                                    </tr>
                                    <tr>
                                        <th>Quantity</th>
                                        <td>{selectedProduct.quantity}</td>
                                    </tr>
                                    <tr>
                                        <th>Price</th>
                                        <td>₹{selectedProduct.price}</td>
                                    </tr>
                                    <tr>
                                        <th>Discounted price</th>
                                        <td>₹{selectedProduct.discountedPrice}</td>
                                    </tr>
                                    <tr>
                                        <th>Live</th>
                                        <td className={selectedProduct.live?"table-success":"table-danger"}>{selectedProduct.live?"True":"False"}</td>
                                    </tr>
                                    <tr>
                                        <th>Stock</th>
                                        <td className={`${selectedProduct.stock?"table-success":"table-danger"}`}>{selectedProduct.stock?"In Stock":"Out of Stock"}</td>
                                    </tr>

                                </tbody>
                            </Table>
                            <div className="p-3 border" dangerouslySetInnerHTML={{__html: selectedProduct.description}}>

                            </div>
                        </Card.Body>
                    </Card>
                    
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseView}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseView}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
            </>
        );
    }

    //Search
    const[searchQuery, setSearchQuery] = useState('')
    const[prevProducts, setPrevProducts] = useState(undefined)
    const searchProducts = () => {
        if(searchQuery === undefined || searchQuery.trim() === ''){ 
            return
        }   
        //calling backend Search API
        searchProduct(searchQuery).then(data=>{
            if(data.content.length === 0){
                toast.error("No search result",{position: "bottom-center"})
                return
            }
            setPrevProducts(products)
            setProducts(data)
            console.log(data)
        }).catch(error=>{
            console.log(error)
        })
    }

    const productsView = () => {
        return(
            <Card className="shadow border-0">
                        <Card.Body>
                            {/* {JSON.stringify(selectedProduct)} */}
                            {/* {console.log("This is products:  ", products)} */}
                            <h5 className="text-center mb-3">Products Table</h5>
                            <Form.Group className="mb-3">
                                {/* <Form.Label><strong>Search</strong></Form.Label> */}
                                <InputGroup>
                                    <Form.Control type="text" placeholder="Search products here" 
                                    onChange={(event)=>{
                                        if(event.target.value === ''){
                                            if(prevProducts)
                                                setProducts(prevProducts)
                                        }else{
                                            setSearchQuery(event.target.value)
                                        }
                                    }}/>
                                    <Button variant="primary" onClick={searchProducts}>Search</Button>
                                </InputGroup>
                            </Form.Group>
                        <Table className="text-center" striped bordered hover responsive >
                            <thead>
                                <tr>
                                    <th className="small">SN</th>
                                    <th className="small">Title</th>
                                    <th className="small">Quantity</th>
                                    <th className="small">Price</th>
                                    <th className="small">Discounted Price</th>
                                    <th className="small">Live</th>
                                    <th className="small">Stock</th>
                                    <th className="small">Category</th>
                                    <th className="small">Date</th>
                                    <th className="small">Action</th>

                                </tr>
                            </thead>
                            <tbody>

                                {
                                
                                    products.content.map((product, index)=>{
                                        return <SingleProductView key={index} index={index} product={product}
                                        updateProductRealTime={updateProductRealTime} handleShowView={handleShowView}/>
                                    })

                                }
                            </tbody>
                        </Table>

                        <Container className="d-flex justify-content-end">
                            <Pagination size="sm">
                                <Pagination.Prev/>
                                <Pagination.Item>2</Pagination.Item>
                                <Pagination.Item>3</Pagination.Item>
                                <Pagination.Next/>
                            </Pagination>
                        </Container>

                        </Card.Body>
                    </Card>
        )
    }
    return(
        <div>
            <Container fluid>
                <Row>
                    <Col>
                    
                        {products ? productsView() : ''}
                    
                    </Col>
                </Row>
            </Container>
            {viewProductModal()}
        </div>
    );
}
export default ViewProduct;