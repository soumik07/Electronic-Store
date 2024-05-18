import { Alert, Button, Card, Col, Container, Form, InputGroup, Modal, Row, Spinner, Table } from "react-bootstrap";
import UserProfileView from "../../components/users/UserProfileView";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { getUser, updateUser, updateUserProfilePicture } from "../../services/user.service";
import { toast } from "react-toastify";
import {  useParams } from "react-router-dom";
import defaultImage from "../../assets/brand_logo.jpg"

function Profile(){

    //user state
    const userContext = useContext(UserContext);
    const [user, setUser] = useState(null);
    const {userId} = useParams();

    //Modal state
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShowModal = () => setShow(true);

    //loading button state
    const [updateLoading, setUpdateLoading] = useState(false)

    //State for image
    const [image, setImage] = useState({
        placeholder: defaultImage,
        file: null
    })

    //handelling the file
    const handleProfileImageChange = (event) =>{
        // console.log(event.target.files[0])
        // if(event.target.files[0] === null){
        //     setImage({
        //         ...image,
        //         file: null
        //     })
        // }
        if(event.target.files[0].type === "image/jpeg" || event.target.files[0].type === "image/jpg" || event.target.files[0].type === "image/png"){
            const reader = new FileReader()
            reader.onload = (r)=>{
               setImage({
                placeholder: r.target.result,
                file: event.target.files[0]
               })
            }
            reader.readAsDataURL(event.target.files[0])
        }else{
            toast.error("Invalid File type!!")
            image.file = null
        }
        
    }

    useEffect(()=>{
        // console.log(userId)
        getUserDataFromServer()
        
    }, [])

    const getUserDataFromServer = ()=>{
        //API call to get user by userID
        // const userId = userContext.userData.user.userId;
        getUser(userId).then(data=>{
            console.log(data);
            setUser(data);
        }).catch(error=>{
            console.log(error)
            setUser(null)
            toast.error("Error from server side !!");
        });
    }

    //updateFieldhandler
    function updateFieldHandler(event, property){
        setUser({
            ...user,
            [property] : event.target.value
        })
    }
    //update user data in server
    const updateUserData = () => {
        if(user.name === undefined || user.name.trim() === ''){
            toast.error("Name required..")
            return
        }
        setUpdateLoading(true)
        updateUser(user).then(updatedUser=>{
            console.log(updatedUser)
            toast.success("Profile details updated successfully")
            handleClose()
            //update image
            if(image.file == null){
                // toast.error("image.file == null")
                setUpdateLoading(false)
                handleClose()
                return;
                
            }
            console.log(image.file)
                updateUserProfilePicture(image.file, user.userId).then(data=>{
                    console.log(data)
                    // toast.success(data.message)
                    handleClose()
                }).catch(error=>{
                    console.log(error)
                    toast.error("Image not uploaded..!!")
                }).finally(()=>{
                    setUpdateLoading(false)
                })
    
            
            
        }).catch(error=>{
            console.log(error)
            toast.error("Error creating user !!")
            setUpdateLoading(false)
        })
    }

    //clearimage methode
    const clearImage = (event) => {
        setImage({
            placeholder: defaultImage,
            file: null
        })
    }

    //modal to update the profile values
    const updateViewModal = () => {
        return(
            <div>
                <Modal centered size="lg" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <   Modal.Title>Update profile data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Card>
                        <Card.Body>
                        <Table className='text-center' responsive striped bordered hover  variant=''>
                                        <tbody>
                                            <tr>
                                                <td className='fw-bold '>Profile Image</td>
                                                <td>
                                                    <img src={image.placeholder} style={{height: "150px", width: "150px", borderRadius: "50%", objectFit: 'cover'}} alt=""/>
                                                                                                        
                                                        <InputGroup className="mt-2">
                                                            <Form.Control  type="file" onChange={handleProfileImageChange}  />
                                                            <Button variant="warning" onClick={clearImage}>Clear</Button>
                                                        </InputGroup>                                                
                                                    
                                                    <p className="mt-2 text-muted ">Select squre size picture for better UI.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='fw-bold'>Name</td>
                                                <td>
                                                    <Form.Control onChange={(event)=>updateFieldHandler(event, 'name')} className="text-center" type="text" value={user.name}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='fw-bold'>Email ID</td>
                                                <td>{user.email}</td>
                                            </tr>
                                            <tr>
                                                <td className='fw-bold'>Gender</td>
                                                <td>{user.gender}</td>
                                            </tr>
                                            <tr>
                                                <td className='fw-bold'>New Password</td>
                                                <td><Form.Control onChange={(event)=>updateFieldHandler(event, 'password')} className="text-center" type="password" placeholder="Leave this fiels blank for same password"/></td>
                                            </tr>
                                            <tr>
                                                <td className='fw-bold'>About</td>
                                                <td><Form.Control onChange={(event)=>updateFieldHandler(event, 'about')} className="text-center" as="textarea" rows={1} value={user.about}/></td>
                                            </tr>
                                            <tr>
                                                <td className='fw-bold'>Role</td>
                                                <td>{user.roles.map(role=>role.roleName + ' ')}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                        </Card.Body>
                    </Card>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                         Close
                    </Button>
                    <Button disabled={updateLoading} variant="primary" onClick={updateUserData}>
                        <Spinner hidden={!updateLoading} className="me-2" size="sm"/>
                        <span hidden={!updateLoading}>Updating</span>
                        <span hidden={updateLoading}>Save changes</span>
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

    return(
        <div>
            <Container className="mt-5">
                <Row>
                    <Col md={{span:8, offset:2}}>
                        {(user ? 
                        <>
                            <UserProfileView
                                    user={user}
                                    handleShowModal = {handleShowModal}
                            />
                            {updateViewModal()}
                        </>
                         
                        : <Alert className="text-center m-5 text-uppercase" variant="warning"><h3>Some error occurred .....</h3></Alert>)}
                        {/* {userContext.userData.user.userId} */}
                    </Col>
                </Row>
                </Container>
            
        </div>
    );
}

export default Profile;