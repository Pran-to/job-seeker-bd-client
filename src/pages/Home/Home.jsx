import Banner from "../../components/Banner/Banner";
import EmployerSection from "../../components/EmployerSection/EmployerSection";
import HotJobs from "../../components/HotJobs/HotJobs";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import PopularCategories from "../../components/PopularCategories/PopularCategories";

const Home = () => {
    return (
        <div >
            <Banner />
            <PopularCategories />
            <HotJobs />
            <HowItWorks />
            <EmployerSection />
        </div>
    );
};

export default Home;