import Banner from "../../components/Banner/Banner";
import HotJobs from "../../components/HotJobs/HotJobs";
import PopularCategories from "../../components/PopularCategories/PopularCategories";

const Home = () => {
    return (
        <div >
            <Banner />
            <PopularCategories />
            <HotJobs />
            
        </div>
    );
};

export default Home;