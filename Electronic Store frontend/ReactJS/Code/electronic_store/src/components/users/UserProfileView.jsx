import {Button, Card, Container, Table} from 'react-bootstrap';
import profileImage from './../../assets/default_image.jpg';
import { BASE_URL } from '../../services/helper.service';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';
function UserProfileView({user = null, handleShowModal}){

    const {userData, isLogin} = useContext(UserContext)         //deconstruct: taking only the required values from usercontext. and it returns object{}. not array[].

    return(
        <>
            {
                user && <Card className='m-3 shadow border-0' >
                            <Card.Body>
                                <Container className='text-center my-3'>
                                    <img className='border border-dark' src={user.imageName ? BASE_URL + '/users/image/' + user.userId + '?'+new Date().getTime() : profileImage} alt='default image' style={{height: "150px", width: "150px", borderRadius: "50%", objectFit: 'cover'}}></img>
                                </Container>
                                
                                <h2 className='text-center text-uppercase fw-bold text-primary'>{(user.name) ? user.name : 'soumik poddar'}</h2>
                                <div className='mt-3'>
                                    <Table className='text-center' responsive striped bordered hover  variant=''>
                                        <tbody>
                                            <tr>
                                                <td className='fw-bold'>Name</td>
                                                <td>{user.name}</td>
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
                                                <td className='fw-bold'>About</td>
                                                <td>{user.about}</td>
                                            </tr>
                                            <tr>
                                                <td className='fw-bold'>Role</td>
                                                <td>{user.roles.map(role=>role.roleName + ' ')}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>

                            </Card.Body>
                            
                            {
                                (isLogin && userData.user.userId === user.userId) ? <Container className='text-center m-3'>
                                                <Button className='me-2' variant='success' onClick={handleShowModal}>Update</Button>
                                                <Button href="/users/orders" variant='warning'>Orders</Button>
                                            </Container> : ''
                            }
                            
                        </Card>
            }
            
        </>
    );
}
export default UserProfileView;