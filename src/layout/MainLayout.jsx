
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
const MainLayout = () => {
    return (
        <div>

            <div className="">
                <NavBar />
            </div>
            <div className=" mx-auto container min-h-[calc(100vh-246px)]">
                <Outlet />
            </div>
            <div className="">
                <Footer />
            </div>

        </div>
    );
};

export default MainLayout;