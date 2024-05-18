import { useEffect, useState } from "react";
import CategoryView from "../users/CategoryView";
import { deleteCategory, getCategories, updateCategory } from "../../services/CategoryService";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import { Button, Container, Form, Modal } from "react-bootstrap";

function ViewCategory(){
    
    const [categories, setCategories] = useState({
        content: []
    })
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        getCategories().then(responseData=>{
            //console.log("bug")
            //  console.log(responseData)
            setCategories(responseData)
        }).catch(error=>{
            console.log(error)
            toast.error("Error loading category from server !!")
        })
    },[] )
    
    function deleteCategoryMain(categoryId){
        
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                deleteCategory(categoryId).then(responseData=>{
                    Swal.fire({              
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });
                      const newArray = categories.content.filter((c) => {
                        return c.categoryId != categoryId
                      })
                      setCategories({
                        ...categories,
                        content: newArray
                      })
                }).catch(error=>{
                    toast.error("error deleting category!!");
                })
            }
          });
    }

    const handleChange = (event, property) =>{
        setSelectedCategory({
            ...selectedCategory,
            [property] : event.target.value
        })
    }
    const updateCategoryClicked = (event) => {
        event.preventDefault();
        if(selectedCategory.title === undefined || selectedCategory.title.trim() === ''){
            toast.error("title cant be empty !!")
            return
        }
        updateCategory(selectedCategory).then(responseData => {
            toast.success("Changes have been saved successfully !!")

            const newCategories = categories.content.map(cat => {
                if(cat.categoryId === selectedCategory.categoryId){
                    cat.title = responseData.title
                    cat.description = responseData.description 
                    cat.coverImage = responseData.coverImage
                }
                return cat;
            })
            setCategories({
                ...categories,
                content: newCategories
            });

            handleCloseUpdate()

        }).catch(error => {
            toast.error("Error while saving the updated category !!")
        })
    }

    //Modal for: View and update Button:
    //state view (modal)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //state update (modal)
    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    
    

    const modalView = () => {
        return(
            <>
                {/* <Button variant="primary" onClick={handleShow}>
                    Launch demo modal
                </Button> */}

                <Modal show={show} onHide={handleClose}>
                    
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedCategory.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container className="mb-5">
                            <img style={{width: "100%", height: "250px", objectFit: 'contain'}} src={selectedCategory.coverImage}/>
                        </Container>
                        {selectedCategory.description}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        {/* <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button> */}
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    const modalUpdate= () => {
        return(
            <>
                {/* <Button variant="primary" onClick={handleShow}>
                    Launch demo modal
                </Button> */}

                <Modal show={showUpdate} onHide={handleCloseUpdate}>
                    
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedCategory.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Category Name</Form.Label>
                                <Form.Control type="text" value={selectedCategory.title} onChange={event=>{handleChange(event, 'title')}}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Category Description</Form.Label>
                                <Form.Control as={"textarea"} rows={"6"} value={selectedCategory.description} onChange={event=>{handleChange(event, 'description')}}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Image url</Form.Label>
                                <Form.Control type="text" onChange={event=>{handleChange(event, 'coverImage')}}/>
                            </Form.Group>
                        </Form>    
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseUpdate}>
                            Close
                        </Button>
                        <Button onClick={updateCategoryClicked} variant="primary">
                            Save Changes
                        </Button>
                        {/* {JSON.stringify(selectedCategory)} */}
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    //handle View button with Modal
    const handleView = (category) => {
        setSelectedCategory(category);
        handleShow();
        
    }

    //handle Update button with Modal
    const handleUpdate = (category) => {
        //console.log("handle update")
        setSelectedCategory(category);
        handleShowUpdate();
    }


    return categories.content.length>0 ? (
        <div>
            {
                categories.content.map(category=>{
                    return(<CategoryView viewCat={handleView} updateCat={handleUpdate} deleteCat={deleteCategoryMain} category={category} key={category.categoryId}/>)
                })
            }
            {selectedCategory ? modalView() : ''}
            {selectedCategory ? modalUpdate() : ''}
        </div>
        
    ) : <h5 className="text-center">No Categories Present</h5>
}
export default ViewCategory;