import React from 'react'
import { Card, Container } from 'react-bootstrap'
import { getProductImageUrl } from '../../services/helper.service'


function SingleProductCard({product}) {
  return (
    <Card className='shadow border-0'>
        <Card.Body >
            <Container className="text-center">
                <img src={getProductImageUrl(product.productId)} style={{width: "200px"}} alt=''/>
            </Container>
            <h6>{product.title}</h6>
            <p>Sort description <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda, deserunt!</span></p>
        </Card.Body>
    </Card>
  )
}

export default SingleProductCard