import { Outlet } from "react-router";
import Navbar from "../../components/navbar/Navbar";

const MainLayout = () => {
    return (
        <div  className="max-w-7xl mx-auto ">
            <Navbar />

            <Outlet  />
            
        </div>
    );
};

export default MainLayout;