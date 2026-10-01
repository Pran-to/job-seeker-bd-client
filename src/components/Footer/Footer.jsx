import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import Logo from "../logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-base-100 text-white">

      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          <div>
            
              <div className="mb-5 ">
                <Logo />
              </div>
            

            <p className="text-purple-100 leading-7 mb-6">
              Find your dream job and build your career with Job Seeker BD.
              Discover thousands of opportunities from trusted companies.
            </p>

            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-[#422ad5] flex items-center justify-center transition duration-300"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-[#422ad5] flex items-center justify-center transition duration-300"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-[#422ad5] flex items-center justify-center transition duration-300"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-[#422ad5] flex items-center justify-center transition duration-300"
              >
                <FaInstagram />
              </a>
            </div>
          </div>


          <div>
            <h3 className="text-lg font-semibold mb-5">For Job Seekers</h3>

            <ul className="space-y-3 text-purple-100">
              <li>
                <a href="#" className="hover:text-white transition">
                  Browse Jobs
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Create Resume
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Career Advice
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Job Alerts
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Saved Jobs
                </a>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="text-lg font-semibold mb-5">For Employers</h3>

            <ul className="space-y-3 text-purple-100">
              <li>
                <a href="#" className="hover:text-white transition">
                  Post a Job
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Find Candidates
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Employer Dashboard
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Pricing
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Resources
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Contact Us</h3>

            <div className="space-y-4 text-purple-100">

              <div className="flex items-start gap-3">
                <MdLocationOn className="text-xl mt-1 shrink-0" />
                <p>Dhaka, Bangladesh</p>
              </div>

              <div className="flex items-center gap-3">
                <MdEmail className="text-xl shrink-0" />
                <a
                  href="mailto:info@jobseekerbd.com"
                  className="hover:text-white transition"
                >
                  info@jobseekerbd.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <MdPhone className="text-xl shrink-0" />
                <a
                  href="tel:+8801234567890"
                  className="hover:text-white transition"
                >
                  +880 1234-567890
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>
              <h3 className="text-xl font-semibold">
                Get the latest job opportunities
              </h3>
              <p className="text-purple-100 mt-1">
                Subscribe and receive new job alerts directly in your inbox.
              </p>
            </div>

            <div className="flex w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input bg-white text-gray-800 border-none rounded-r-none w-full lg:w-72 focus:outline-none"
              />

              <button className="btn bg-primary hover:bg-purple-700 text-black  border-none rounded-l-none px-6">
                Subscribe
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-purple-100">

          <p>
            © {new Date().getFullYear()} Job Seeker BD. All rights reserved.
          </p>

          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-white transition">
              Terms & Conditions
            </a>

            <a href="#" className="hover:text-white transition">
              Help Center
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;