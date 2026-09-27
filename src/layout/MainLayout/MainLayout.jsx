import { Outlet } from "react-router";
import Home from "../../pages/Home/Home";

const MainLayout = () => {
    return (
        <div>
            <Home />

            <Outlet />
            
        </div>
    );
};

export default MainLayout;