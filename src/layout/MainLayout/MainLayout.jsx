import { Outlet } from "react-router";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const MainLayout = () => {
    return (
        <div  className="max-w-7xl  mx-auto ">
            <Navbar />

            <Outlet  />
            <Footer/>
           
            
        </div>
    );
};

export default MainLayout;