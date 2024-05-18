import { Container } from "react-bootstrap";

function Footer(){
    return(
        <Container fluid style={{height: "100px"}} className="bg-dark p-5 text-white text-center d-flex align-items-center justify-content-center">
            <div>
                <h4>We provide best products</h4>
                <p className="">All rights reserved - <b>Substring Technologies</b></p>
            </div>
            
        </Container>

    );
}

export default Footer;