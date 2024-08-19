import React from "react";
import Navbar from "../navbar/Navbar.tsx";
import "../../css/HomePage.css"
import Carousel from "../../decoretor/Carousel.tsx";
import CategoryList from "./CategoryList.tsx";



const images = [
    'https://www.merosecondhand.com/oc-content/plugins/slider/images/5ad36b33d829b.png',
    'https://www.merosecondhand.com/oc-content/plugins/slider/images/5aaf86010e90f.png',
    'https://www.merosecondhand.com/oc-content/plugins/slider/images/5af2c043f0ad3.jpg',
    'https://images.pexels.com/photos/4068322/pexels-photo-4068322.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];
const HomePage: React.FC = () => {

    return(
        <>
            <div className={"navbar-div"}>
                <Navbar/>
            </div>

            <div className={"menu-page-div"}>


                <div className={"d-main-content"}>

                    <div className={"slide-images-div"}>
                        <Carousel images={images}/>
                    </div>

                    <div className={"item-contents"}>
                        <CategoryList/>


                    </div>
                    <div className={"info"}>
                        <h1>
                            Buy And Sell Any Things
                        </h1>

                    </div>

                </div>






            </div>
        </>

    );

};
export default HomePage;