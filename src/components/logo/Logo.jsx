import { Link } from 'react-router';
import jobLogo from "../../assets/jobS.jpg";

const Logo = () => {
    return (
        <Link to={'/'} className=" flex items-center">
        <img src={jobLogo} alt="Job Logo" className="h-14 w-14 rounded-full" />
           <h1 className="absolute ml-10"><span className="text-primary text-4xl font-bold ">Seeker</span><span className="font-bold">BD</span></h1>
        </Link>
    );
};

export default Logo;