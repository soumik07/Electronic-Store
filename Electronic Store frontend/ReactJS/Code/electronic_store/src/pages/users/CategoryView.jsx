import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";

function CategoryView({category, deleteCat, viewCat, updateCat}){

    const imageStyle={
        height: "100px",
        width: "100px",
        objectfit: 'contain'
    }
    // function deleteCategory(categoryId){
    //      
    // }
    function deleteCategory(categoryId){
        deleteCat(categoryId);
    }
    return(        
        <div>
            <Card className="mb-2 shadow border-0">
                <Card.Body>
                    <Row className="align-items-center">
                        <Col md={2} className="d-flex justify-content-center">
                            <img style={imageStyle} src={category.coverImage ? (category.coverImage.startsWith('http') ? category.coverImage : "https://images.squarespace-cdn.com/content/v1/5ae8bd2f89c1723a6f6f557b/1565794679412-QOSVO1NO2JF104SBAU4R/AdobeStock_237119664.jpeg") : "https://images.squarespace-cdn.com/content/v1/5ae8bd2f89c1723a6f6f557b/1565794679412-QOSVO1NO2JF104SBAU4R/AdobeStock_237119664.jpeg"} alt="samsung phones" />
                        </Col>
                        <Col md={10}>
                            <h5>{category.title}</h5>
                            <p>{category.description}</p>
                            <Container>
                            <Button size="sm" className="me-2" variant="success" onClick={event=>viewCat(category)}>View</Button>
                            <Button size="sm" className="me-2" variant="warning" onClick={event=>updateCat(category)}>Update</Button>
                            <Button size="sm" className="me-2" variant="danger" onClick={(event)=>deleteCategory(category.categoryId)}>Delete</Button>
                            </Container>
                            
                        </Col>
                        {/* <Col md={2} className="text-center">
                            <Button size="sm" className="mb-1" variant="success">View</Button>
                            <Button size="sm" className="mb-1" variant="warning">Update</Button>
                            <Button size="sm" className="mb-1" variant="danger">Delete</Button>
                        </Col> */}
                    </Row>

                    
                </Card.Body>
            </Card>
        </div>

    );
}
export default CategoryView;