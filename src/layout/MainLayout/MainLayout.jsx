import { Outlet } from "react-router";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
    return (
        <div  className="max-w-7xl  mx-auto ">
            <Toaster/>
            <Navbar />

            <Outlet  />
            <Footer/>
           
            
        </div>
    );
};

export default MainLayout;