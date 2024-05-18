import { Button, Card, Col, Container, Form, NavLink, Row, Spinner } from "react-bootstrap";
import Base from "../components/Base";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../services/user.service";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

function Login(){

    const redirect = useNavigate()
    const userContext = useContext(UserContext)


    let [data, setData] = useState({
        email: '',
        password: ''
    })
    let [errorData, setErrorData] = useState({
        isError: false,
        errordata: null 
    })
    let [loading, setLoading] = useState(false)

    function handleChange(event, property){
        
        setData({
            ...data,
            [property] : event.target.value
        })
    }
    function cleardata(){
        setData({
            email: '',
            password: ''
        })
        setErrorData({
            isError: false,
            errordata: null
        })
    }
    function submitForm(event){
        event.preventDefault();
        //console.log("LOGIN CLICKED")
        //client side validation
        if(data.email == undefined || data.email.trim() == ''){
            toast.error("Email field can't be empty!!")
            return
        }
        if(data.password == undefined || data.password.trim() == ''){
            toast.error("Password field can't be empty!!")
            return
        }
        setLoading(true)

        //calling login function tosend the data to backend via axios
        loginUser(data).then((responseData)=>{
            console.log(responseData)
            toast.success("Login successful !!")
            cleardata()

            //Login successful, hence set the isLogin & userData to UserContext
            // userContext.setIsLogin(true)
            // userContext.setUserData(responseData)
            userContext.login(responseData);
            

            //Redirect to user homepage users/homepage
            redirect("/users/home")
            

        })
        .catch((responseError)=>{ 
            console.log(responseError)
            toast.error(responseError.response.data.message)
            setErrorData({
                isError: true,
                errordata: responseError
            })
        }).finally(()=>{
            setLoading(false)}
        )
    }

    function loginForm(){
        return(
            <Container>
                {/**JSON.stringify(data)*/}
                <Row>
                    <Col sm={{span:6 ,offset: 3}}>
                        <Card className="my-3 border-0 shadow" style={{position: "relative", top: -50}}>
                            <Card.Body>
                                {/* {JSON.stringify(userContext)} */}
                                <h3 className="text-center mb-3">Login Here</h3>
                                <Form noValidate onSubmit={submitForm}>
                                    <Form.Group className="mb-3" controlId="forUserName">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control 
                                            type="email" 
                                            placeholder="Enter your email"
                                            onChange={(event)=>handleChange(event, 'email')}
                                            value={data.email} />
                                    </Form.Group>

                                    <Form.Group className="mb-4" controlId="forPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            placeholder="Enter your password"
                                            onChange={(event)=>handleChange(event, 'password')} 
                                            value={data.password}/>
                                    </Form.Group>

                                    <Container className="text-center">
                                        <p>Forgot password ! <a href="#">Click here</a></p>
                                        <p>Not registerred ! <a as={NavLink} to="/signup" href="/signup">Click here</a></p>
                                    </Container>
                                    <Container className="text-center">
                                        <Button disabled={loading} type="submit" className="me-2" variant="success"en>
                                            <Spinner hidden={!loading} animation="border" size="sm" className="me-2"/>
                                            <span hidden={!loading} >Wait..</span>
                                            <span hidden={loading}>Login</span>
                                        </Button>
                                        <Button onClick={cleardata} variant="danger"en>Reset</Button>
                                        
                                    </Container>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
    return(
        <Base title="Login Page" description="Get in and start shopping">
            
            {loginForm()}
        </Base>

    );
}

export default Login;