import Base from "../components/Base";

function Services(){
    return(
        <Base title="Services we provide" description="In this page you will see alll the services provided by us"
                        buttonLink="/" buttonEnabled={true} buttonText="Home" buttonType="warning">
            <h3>This is Services page</h3>
        </Base>
    );
}

export default Services;