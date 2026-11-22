import Banner from "../../components/Banner/Banner";
import EmployerSection from "../../components/EmployerSection/EmployerSection";
import HotJobs from "../../components/HotJobs/HotJobs";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import PopularCategories from "../../components/PopularCategories/PopularCategories";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";

const Home = () => {
    return (
        <div >
            <Banner />
            <PopularCategories />
            <HotJobs />
            <HowItWorks />
            <WhyChooseUs />
            <EmployerSection />
        </div>
    );
};

export default Home;