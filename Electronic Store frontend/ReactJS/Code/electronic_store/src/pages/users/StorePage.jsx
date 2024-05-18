import React, { useEffect, useState } from 'react'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import { getCategories } from '../../services/CategoryService'
import { getAllProducts } from '../../services/ProductService'
import SingleProductCard from '../../components/users/SingleProductCard'

function StorePage() {

    const [categories, setCategories] = useState(null)
    const [products, setProducts] = useState(null)

    useEffect(()=>{
        loadCategories()
        loadProducts(0,10,'addedDate','asc')
    },[])

    const loadCategories = () => {
        getCategories().then(data=>{
            setCategories({...data})
            console.log(data)
        }).catch(error=>{
            console.log(error)
        })
    }
    const loadProducts = (pageNumber,pageSize,sortBy,sortDir) => {
        getAllProducts(pageNumber,pageSize,sortBy,sortDir).then(data=>{
            setProducts({...data})
            console.log(data)
        }).catch(error=>{
            console.log(error)
        })
    }

    
    const categoryView = () => {
        return(
            <ListGroup variant='flush' className='shadow' style={
                {
                    position: "sticky",
                    top: "60px"
                }}>
                
                <ListGroup.Item variant='secondary' action>
                    <img className='rounded-circle' src='https://d3pbdh1dmixop.cloudfront.net/readdle/Blog/scanner-flashlight-update/icon-pages.png' alt='' style={{width: "35px"}}/>
                    <span className='ms-2'>All Products</span>
                </ListGroup.Item>
                {categories.content.map(cat=>{
                    return <ListGroup.Item variant='secondary' key={cat.categoryId} action>
                                <img className='rounded-circle' src={cat.coverImage} alt='' style={{width: "35px",objectFit:'contain'}}/>
                                <span className='ms-2'>{cat.title}</span>
                            </ListGroup.Item>
                })}
            </ListGroup>
        )
    }

    const productView = () => {
        return(
            <>
                <Container>
                   <Row>
                        {products.content.map(product=>{
                            return(
                                <Col md={4} className='mb-3' key={product.productId}>
                                    <SingleProductCard product={product}/>
                                </Col>
                            )
                        })} 
                   </Row> 
                </Container>
            </>
        )
    }

  return (
    <>
        <Container className='mt-5 '>
            <Row>
                <Col md={2}>
                    {categories && categoryView()}
                </Col>
                <Col md={10} >
                    {products && productView()}
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default StorePage