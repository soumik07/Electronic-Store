import { useEffect, useRef, useState } from "react";
import { Form, Row, Col, Card, Container, Button, InputGroup } from "react-bootstrap";
import {toast} from "react-toastify";
import defaultImage from "../../assets/brand_logo.jpg";
import { addProductImage, createProductInCategory, createProductWithoutCategory } from "../../services/ProductService";
import { getCategories } from "../../services/CategoryService";
import { Editor } from '@tinymce/tinymce-react';

function AddProduct(){

    const [categories, setCategories] = useState(undefined)
    const [selectedCategory, setSelectedCategory] = useState("None")
    const editorRef = useRef();

    useEffect(()=>{
        getCategories().then(data => {
            console.log(data)
            setCategories(data)
            
        }).catch(error => {
            console.log(error)
        })
    },[])

    const[product, setProduct] = useState({
        title: '',
        description: '',
        price: 0,
        discountedPrice: 0,
        quantity: 1,
        live: false,
        stock: true,
        image: undefined,
        imagePreview: undefined
    })
    const handleOnChange = (event, property) => {
        setProduct({
            ...product,
            [property]: event.target.value
        })
    }

    const handleFileChange = (event) => {
        if(event.target.files[0].type === "image/jpeg" || event.target.files[0].type === "image/jpg" || event.target.files[0].type === "image/png"){
            const reader = new FileReader()
            reader.onload = (r)=>{
               setProduct({
                ...product,
                imagePreview: r.target.result,
                image: event.target.files[0]
               })
            }
            reader.readAsDataURL(event.target.files[0])
        }else{
            toast.error("Invalid File type!!")
            setProduct({
                ...product,
                image: undefined,
                imagePreview: undefined
            })
        }
    }

    //Clearing the form and state
    function clearData(){
        
        editorRef.current.setContent("");
        setProduct({

            title: '',
            description: '',
            price: 0,
            discountedPrice: 0,
            quantity: 1,
            live: false,
            stock: true,
            image: undefined,
            imagePreview: undefined
        })
        
    }

    //submit the form
    const submitAddproductForm = (event) => {
        event.preventDefault()
        if(product.title === undefined || product.title.trim() === ''){
            toast.error("Title is required !!")
            return
        }
        if(product.description === undefined || product.description.trim() === ''){
            toast.error("Description is required !!")
            return
        }
        if(product.price <= 0){
            toast.error("Invalid price !!")
            return
        }
        if(product.discountedPrice <= 0){
            toast.error("Invalid discounted price !!")
            return
        }
        if(product.discountedPrice >= product.price){
            toast.error("Discounted price cant be greater than actual price !!")
            return
        }
        if(product.quantity <= 0){
            toast.error("Invalid price !!")
            return
        }

        if(selectedCategory === "None"){
        createProductWithoutCategory(product).then(data=>{
            console.log(data)
            toast.success("Product has been created !!")

            //image upload
            if(!product.image){
                clearData();
                return
            }
            addProductImage(product.image, data.productId).then(data1=>{
                console.log(data)
                toast.success("Image uploaded !!");
                clearData()
                editorRef.current.setContent("");
            }).catch(error=>{
                console.log(error)
                toast.error("Error uploading Imgae !!");    
            })
            
        }).catch(error=>{
            console.log(error)
            toast.error("Error in creating product !!");
        }).finally(()=>{
            clearData()
            
        })
        }else{
            createProductInCategory(product, selectedCategory).then(data=>{
                console.log(data)
                toast.success("Product has been created !!")
                
                //image upload
                if(!product.image){
                    clearData();
                    return
                }
                addProductImage(product.image, data.productId).then(data1=>{
                    console.log(data)
                    toast.success("Image uploaded !!");
                    clearData()
                    
                }).catch(error=>{
                    console.log(error)
                    toast.error("Error uploading Imgae !!");    
                })
                
            }).catch(error=>{
                console.log(error)
                toast.error("Error in creating product !!");
            }).finally(()=>{
                clearData()
                
            })
        }
    }


    const formView = () => {
        return(
            <>
                <Card className="shadow border-0">
                    {/* {JSON.stringify(product)} */}
                    <Card.Body>
                    <h5 className="text-center">Add Products Here</h5> 
                    {/* {JSON.stringify(categories.content)}  */}
                <Form onSubmit={submitAddproductForm}>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter here" onChange={(event)=>handleOnChange(event, 'title')} value={product.title}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Description</Form.Label>
                        {/* <Form.Control as={"textarea"} rows={"3"} placeholder="Enter here" value={product.description} onChange={(event)=>handleOnChange(event, 'description')}/> */}
                        <Editor apiKey='jipnwmnfu7rusp9cyoxp71wne9a3x0bpt5ztff5pan256xxw'
                        onInit={(evt,editor)=>editorRef.current = editor}
                        init={{
                            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                            tinycomments_mode: 'embedded',
                            tinycomments_author: 'Author name',
                            mergetags_list: [
                              { value: 'First.Name', title: 'First Name' },
                              { value: 'Email', title: 'Email' },
                            ],
                            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                          }}
                          initialValue=""
                          onEditorChange={()=>setProduct({
                            ...product,
                            description: editorRef.current.getContent()
                          })}/>
                    </Form.Group>
                    <Row className="mb-3">
                        <Col>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" value={product.price} onChange={(event)=>handleOnChange(event, 'price')}/>
                        </Col>
                        <Col>
                        
                            <Form.Label>Discounted Price</Form.Label>
                            <Form.Control type="number" value={product.discountedPrice}
                             onChange={(event)=>{
                                
                                // if(event.target.value > product.price){
                                    
                                //     toast.error("Discounted price is higher than the nowmal price")
                                //     return
                                // }
                                setProduct({
                                    ...product,
                                    discountedPrice: event.target.value
                                })
                             }
                                
                             }/>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Quantity</Form.Label>
                        <Form.Control type="number" placeholder="Enter here" value={product.quantity} onChange={(event)=>handleOnChange(event, 'quantity')}/>
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Check // prettier-ignore
                            type="switch"
                            id="custom-switch"
                            checked={product.live}
                            onChange={(event)=>{
                                setProduct({
                                    ...product,
                                    live: !product.live
                                })
                            }}
                            label="Live"/>
                            
                        </Col>
                        <Col>
                            <Form.Check // prettier-ignore
                            type="switch"
                            id="custom-switch"
                            checked={product.stock}
                            onChange={(event)=>{
                                setProduct({
                                    ...product,
                                    stock: !product.stock
                                })
                            }}
                            label="Stock"/>
                        </Col>
                    </Row>
                    
                    <Container hidden={!product.imagePreview} className="mt-3 text-center border p-3">
                        <p className="text-muted">Image Preview</p>
                        <img className="img-fluid" src={product.imagePreview}
                        style={{height: "250px", width: "250px", objectFit: 'cover'}}/>
                    </Container>

                    <Form.Group className="mt-3">
                        <Form.Label>Select Product Image</Form.Label>
                        <InputGroup>
                            <Form.Control type="file" onChange={(event) => handleFileChange(event)}/>
                            <Button onClick={(event) => {
                                setProduct({
                                    ...product,
                                    image: undefined,
                                    imagePreview: undefined
                                })
                            }}>Clear</Button>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Select category</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={(event)=>{
                            setSelectedCategory(event.target.value)
                        }}>
                            <option>None</option>
                            {categories && categories.content.map(cat => <>
                                <option key={cat.categoryId} value={cat.categoryId}>{cat.title}</option>
                            </>)}
                        </Form.Select>
                        {/* {JSON.stringify(selectedCategory)} */}
                    </Form.Group>
                    <Container className="text-center mt-3">
                        <Button variant="success" size="sm" type="submit">Add Product</Button>
                        <Button variant="danger" size="sm" className="ms-2" onClick={()=>{clearData()}}>Clear Data</Button>
                    </Container>
                </Form>
                </Card.Body>
                </Card>
            </>
        )
    }

    return(
        <>
            {formView()}
        </>
    )
}
export default AddProduct;