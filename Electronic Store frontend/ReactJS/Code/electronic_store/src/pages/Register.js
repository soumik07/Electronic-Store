import { Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import Base from "../components/Base";
import brand_logo from "../assets/brand_logo.jpg";
import { useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../services/user.service";
import Footer from "../components/Footer";



function Register(){

    let [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        about:''

    });

    const [errorData, setErrorData] = useState({
        iserror: false,
        errordata: null
    });

    const [loading, setLoading ] = useState(false);

    function handlechange(event, property){
        //console.log(event.target.value)
        setData({
            ...data,
            [property]: event.target.value
        }) 
    }
    function clearData(){
        setData({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            gender: '',
            about:''
        });
        //clearing error
        setErrorData({
            iserror: false,
            errordata: null
        })
    }
    function submitForm(event){
        event.preventDefault();     //prevents to refresh the page
        //console.log(data);
        
        //client side validation
        if(data.name == undefined || data.name.trim() == ''){
            toast.error("Name is a required field");
            return
        }
        if(data.email == undefined || data.email.trim() == ''){
            toast.error("Email is a required field");
            return
        }
        if(data.password == undefined || data.password.trim() == ''){
            toast.error("Password is a required field");
            return
        }
        if(data.confirmPassword == undefined || data.confirmPassword.trim() == ''){
            toast.error("Confirm Password is a required field");
            return
        }
        if(data.password != data.confirmPassword){
            toast.error("Password and confirm password does not match!!");
            return
        }
        if(data.about == undefined || data.about.trim() == ''){
            toast.error("About is a required field");
            return
        }

        //loading == true
        setLoading(true);
         

        //All validations are done, calling register funtion to send the data to backend using Axios
        registerUser(data)
            .then(userData=>{
                //success from backend
                console.log(userData)
                toast.success("User created successfully..");
                clearData()
                })
            .catch(error=>{
                //error from backend
                console.log(error)
                toast.error("Error occurred....!!");
                setErrorData({
                    iserror: true,
                    errordata: error
                })
                })
            .finally(
                ()=>setLoading(false)
            )
        
        //setLoading(false)
            
    }
    function resgiterForm(){
        return(
            <div>
            {/*JSON.stringify(data)*/}
            <Container>
                <Row>
                    <Col sm={{span:6 ,offset: 3}} >
                        <Card className="my-3 shadow border-0 p-5 pt-0" style={{position: "relative"}}>
                            <Card.Body>
                                
                                <Container className="text-center">
                                    <img  src={brand_logo} height={100} width={100}></img>
                                </Container>
                                
                                <h3 className="text-center mb-4 text-uppercase">Store Sign Up</h3>
                                <Form onSubmit={submitForm} noValidate>
                                    <Form.Group className="mb-3" controlId="formName">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Enter your name" 
                                            onChange={(event)=>handlechange(event, 'name')}
                                            value={data.name}
                                            isInvalid={errorData.errordata?.response?.data?.name}/>
                                        <Form.Control.Feedback type="invalid">{errorData.errordata?.response?.data?.name}</Form.Control.Feedback>
                                    </Form.Group>
                                    
                                    
                                    <Form.Group className="mb-3" controlId="formEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control 
                                            type="email" placeholder="Enter your email"
                                            onChange={(event)=>handlechange(event, 'email')}
                                            value={data.email}
                                            isInvalid={errorData.errordata?.response?.data?.email}/> 
                                        <Form.Control.Feedback type="invalid">{errorData.errordata?.response?.data?.email}</Form.Control.Feedback>
                                    </Form.Group>

                {/********NEED TO PUT PASSWORD AND ABOUT VALIDATION */}

                                    <Form.Group className="mb-3" controlId="formPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Enter your password" 
                                        onChange={(event)=>handlechange(event, 'password')}
                                        value={data.password}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formConfirmPassword">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type="password" placeholder="Re-enter your Password" 
                                        onChange={(event)=>handlechange(event, 'confirmPassword')}
                                        value={data.confirmPassword}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formGender">
                                        <Form.Label>Gender</Form.Label>
                                        <div>
                                        <Form.Check
                                                inline
                                                name="gender"
                                                label="Male"
                                                type={'radio'}
                                                id={`gender`}
                                                value={'male'}
                                                onChange={(event)=>handlechange(event, 'gender')}
                                                checked={data.gender == 'male'}
                                            />
                                            <Form.Check
                                                inline
                                                name="gender"
                                                label="Female"
                                                type={'radio'}
                                                id={`gender`}
                                                value={'female'}
                                                onChange={(event)=>handlechange(event, 'gender')}
                                                checked={data.gender == 'female'}
                                            />
                                        </div>
                                        
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formAbout">
                                        <Form.Label>About yourself</Form.Label>
                                        <Form.Control as={"textarea"} rows="3" placeholder="Write something about yourself" 
                                        onChange={(event)=>handlechange(event, 'about')}
                                        value={data.about}
                                        isInvalid={errorData.errordata?.response?.data?.about}/>
                                        <Form.Control.Feedback type="invalid">{errorData.errordata?.response?.data?.about}</Form.Control.Feedback>
                                    </Form.Group>
                                
                                    <Container>
                                        <p className="text-center">Already Registered ! <a href="/login">login</a></p>
                                    </Container>
                                    <Container className="text-center">
                                        <Button disabled={loading} type="submit" className="text-uppercase" variant="success">
                                            <Spinner hidden={!loading} animation="border" size="sm" className="me-2"/>
                                            <span hidden={!loading} >Wait..</span>
                                            <span hidden={loading}>Register</span>
                                        </Button>

                                        <Button className="ms-2 text-uppercase" variant="danger" onClick={clearData}>Reset</Button>
                                    </Container>
                                </Form>
                            </Card.Body>
                        </Card>
                        
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
        );
    }
    return(
        //include Base component here if required
        <div >
            {resgiterForm()}
        </div>

    );
}

export default Register;