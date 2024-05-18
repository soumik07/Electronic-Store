import Base from "../components/Base";

function Contact(){
    return(
        <Base title="Electro store / Contact Us" description={null}
        buttonLink="/" buttonEnabled={true} buttonText="Home" buttonType="warning">
            <div>This is Contact us page</div>
        </Base>
        
    );
}

export default Contact;