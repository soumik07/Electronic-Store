import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { addCategory } from "../../services/CategoryService";

function AddCategory(){

    const [category, setCategory] = useState({
        title: '',
        description: '',
        coverImage: ''
    })
    function handleFieldChange(event, property){
        setCategory({
            ...category,
            [property] : event.target.value
        })
    }
    function handleFormSubmit(event)
    {
        event.preventDefault()
        console.log("form submit")
        if(category.title === undefined || category.title.trim() === ''){
            toast.error("Category Title is required !!")
            return
        }
        if(category.description === undefined || category.description.trim() === ''){
            toast.error("Category Description is required !!")
            return
        }

        //validation done, call backed API to add category
        addCategory(category).then(responseData=>{
            toast.success("Category has been added !")
            console.log(responseData)
            clearData()
        }).catch(error=>{
            toast.error("Error creating category !!")
            console.log(error)    
        })

    }
    function clearData(){
        setCategory({
            title: '',
            description: '',
            coverImage: ''
        })
    }

    return(
        <>
            <Container fluid className="mt-0">
                <Card className="shadow mt-0 border-0">
                    <Card.Body>
                        <h5 className="text-center">Add Category here</h5>
                        <Form onSubmit={handleFormSubmit}>
                            {/* {JSON.stringify(category)} */}
                            <Form.Group>
                                <Form.Label>Category Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter category here" value={category.title} onChange={(event)=>handleFieldChange(event, 'title')}/>
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Form.Label>Category Description</Form.Label>
                                <Form.Control as={'textarea'} rows={6} placeholder="Enter category description" value={category.description} onChange={(event)=>handleFieldChange(event, 'description')}/>
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Form.Label>Category Cover Image url</Form.Label>
                                <Form.Control type="text" placeholder="Enter image url" value={category.coverImage} onChange={(event)=>handleFieldChange(event, 'coverImage')}/>
                            </Form.Group>
                            <Container className="text-center mt-3">
                                <Button type="submit" variant="success">Add Category</Button>
                                <Button onClick={clearData} className="ms-2" variant="warning">Clear</Button>
                            </Container>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>   
        </>
    );
}
export default AddCategory;