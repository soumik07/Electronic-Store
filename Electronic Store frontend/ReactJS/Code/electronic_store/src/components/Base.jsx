import { Button, Container } from "react-bootstrap";
import Footer from "./Footer";


function Base({title="Page title", description="This is page description", buttonEnabled=false, 
                buttonLink="./cart" ,buttonText="Shop now", buttonType="primary", children}){

    let styleContainer = {
        height: "200px"
    }
    return(
        <div>
            <Container style={styleContainer} fluid className="bg-dark text-white p-5 text-center d-flex align-items-center justify-content-center">
                <div>
                    <h3 className="text-center">{title}</h3>
                    <p className="text-center">{description}</p>
                    {buttonEnabled && <Button href={buttonLink} variant={buttonType}>{buttonText}</Button>}
                </div>
                
            </Container>
            {children}
            <Footer/>
        </div>
    );
}

export default Base;