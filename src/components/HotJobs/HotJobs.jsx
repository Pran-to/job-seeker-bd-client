import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FaFire } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi2";
import HotJobCard from "./HotjobsCard";

const HotJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/jobs`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load jobs:", error);
        setLoading(false);
      });
  }, []);

  return (
    <section className="bg-base-100 pb-10 md:py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">

        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10"
        >

          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
              <FaFire className="animate-pulse" />

              <span className="text-sm font-medium">
                Trending Opportunities
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Hot Jobs
              <span className="text-primary"> Right Now</span>
            </h2>

            <p className="mt-3 text-base-content/60 max-w-xl">
              Explore the latest and most popular job opportunities from
              leading companies.
            </p>
          </div>

          {/* View All */}
          <button className="btn btn-outline btn-primary rounded-xl gap-2 w-fit">
            View All Jobs
            <HiArrowRight />
          </button>

        </motion.div>

        {/* ================= LOADING ================= */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-64 rounded-2xl bg-base-200 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* ================= JOBS ================= */}
        {!loading && jobs.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {jobs.slice(0, 6).map((job) => (
              <HotJobCard
                key={job._id}
                job={job}
              />
            ))}
          </div>
        )}

        {/* ================= EMPTY ================= */}
        {!loading && jobs.length === 0 && (
          <div className="text-center py-16 bg-base-200 rounded-2xl">
            <h3 className="text-xl font-semibold">
              No jobs available
            </h3>

            <p className="text-base-content/50 mt-2">
              Please check back later for new opportunities.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default HotJobs;
