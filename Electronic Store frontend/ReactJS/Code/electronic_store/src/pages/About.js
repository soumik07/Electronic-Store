import Base from "../components/Base";

function About(){
    return(
        <Base title="Electro store / About Us" description={null}
        buttonLink="/" buttonEnabled={true} buttonText="Home" buttonType="warning">
            <div>This is about page</div>
        </Base>
        
    );
}

export default About;