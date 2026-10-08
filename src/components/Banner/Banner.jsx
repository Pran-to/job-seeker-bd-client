import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { FaSearch, FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { useNavigate } from "react-router";

const Banner = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const animatedTexts = [
    "Builds Your Future.",
    "Matches Your Skills.",
    "Grows Your Career.",
    "Dreams Into Reality.",
  ];
  const [currentText, setCurrentText] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % animatedTexts.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [animatedTexts.length]);

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (keyword.trim()) {
      params.set("keyword", keyword.trim());
    }

    if (location.trim()) {
      params.set("location", location.trim());
    }

    navigate(`/find-jobs?${params.toString()}`);
  };
  return (
    <section className="relative overflow-hidden bg-base-100 min-h-[620px] flex items-center">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#422ad5]/20 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -25, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-[#422ad5]/10 blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* ================= LEFT CONTENT ================= */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#422ad5]/10 border border-[#422ad5]/20 text-[#8d7bea] mb-6"
            >
              <HiSparkles className="text-lg" />

              <span className="text-sm font-medium">
                Find Your Next Opportunity
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight "
            >
              Find a <span className="text-primary isometra-regular">Job</span>{" "}
              That <br />
              <span className="text-primary inline-block min-w-[300px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={animatedTexts[currentText]}
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="inline-block"
                  >
                    {animatedTexts[currentText]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="mt-6 text-base md:text-lg text-base-content/60 max-w-xl leading-8"
            >
              Discover thousands of job opportunities from trusted companies.
              Create your profile, find the right position, and take the next
              step in your career.
            </motion.p>

            {/* Search Box */}
            <motion.form
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              onSubmit={handleSearch}
              className="mt-8 p-2 bg-base-200 rounded-2xl shadow-xl border border-base-content/10"
            >
              <div className="flex flex-col md:flex-row gap-2">
                {/* Job Search */}
                <div className="flex items-center gap-3 flex-1 px-4">
                  <FaSearch className="text-primary" />

                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Job title, keywords..."
                    className="input input-ghost w-full focus:outline-none"
                  />
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 flex-1 px-4">
                  <FaMapMarkerAlt className="text-primary" />

                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location"
                    className="input input-ghost w-full focus:outline-none"
                  />
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="btn bg-primary hover:bg-primary/90 text-black border-none rounded-xl px-7"
                >
                  <FaSearch />
                  Search Jobs
                </button>
              </div>
            </motion.form>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-wrap gap-8 mt-8"
            >
              <div>
                <h3 className="text-2xl font-bold">10K+</h3>
                <p className="text-sm text-base-content/50">Active Jobs</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold">5K+</h3>
                <p className="text-sm text-base-content/50">Companies</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold">25K+</h3>
                <p className="text-sm text-base-content/50">Job Seekers</p>
              </div>
            </motion.div>
          </motion.div>

          {/* ================= RIGHT VISUAL ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 60 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="relative hidden md:flex justify-center"
          >
            {/* Main Circle */}
            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-[360px] h-[360px] lg:w-[430px] lg:h-[430px] rounded-full bg-[#422ad5]/10 flex items-center justify-center"
            >
              {/* Inner Circle */}
              <div className="w-[280px] h-[280px] lg:w-[340px] lg:h-[340px] rounded-full bg-[#422ad5]/10 flex items-center justify-center">
                <div className="w-[200px] h-[200px] lg:w-[250px] lg:h-[250px] rounded-full bg-[#422ad5] flex items-center justify-center shadow-2xl shadow-[#422ad5]/40">
                  <FaBriefcase className="text-white text-7xl lg:text-8xl" />
                </div>
              </div>

              {/* Floating Job Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-2 right-0 bg-base-200 border border-base-content/10 shadow-xl rounded-2xl p-4 w-52"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#422ad5]/15 flex items-center justify-center">
                    <FaBriefcase className="text-primary" />
                  </div>

                  <div>
                    <p className="font-semibold text-sm">New Job Posted</p>

                    <p className="text-xs text-base-content/50">
                      Software Engineer
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Location Card */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-8 -left-6 bg-base-200 border border-base-content/10 shadow-xl rounded-2xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#422ad5]/15 flex items-center justify-center">
                    <FaMapMarkerAlt className="text-primary" />
                  </div>

                  <div>
                    <p className="font-semibold text-sm">Dhaka, Bangladesh</p>

                    <p className="text-xs text-base-content/50">1,200+ Jobs</p>
                  </div>
                </div>
              </motion.div>

              {/* Small Decorative Dot */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute top-20 left-5 w-4 h-4 rounded-full bg-[#422ad5]"
              />

              <motion.div
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
                className="absolute bottom-24 right-2 w-3 h-3 rounded-full bg-[#422ad5]"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
