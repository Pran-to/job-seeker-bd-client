import { Link } from 'react-router';
import jobLogo from "../../assets/jobS.jpg";

const Logo = () => {
    return (
        <Link to={'/'} className=" flex items-center  ">
        <img src={jobLogo} alt="Job Logo" className=" h-7 w-7 md:h-14 md:w-14 rounded-full" />
           <h1 className="absolute ml-5 md:ml-10"><span className="text-primary   md:text-4xl font-bold ">Seeker</span><span className="font-bold">BD</span></h1>
        </Link>
    );
};

export default Logo;