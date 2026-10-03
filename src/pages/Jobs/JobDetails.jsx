import { motion } from "motion/react";
import { useLoaderData, useNavigate} from "react-router";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaClock,
  FaMoneyBillWave,
  FaBuilding,
  FaArrowLeft,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const JobDetails = () => {
    const job = useLoaderData();
 const navigate = useNavigate();

  // Job not found
  if (!job) {
    return (
      <section className="min-h-screen bg-base-100 flex items-center justify-center px-5">
        <div className="text-center">
          <h2 className="text-3xl font-bold">
            Job Not Found
          </h2>

          <p className="text-base-content/60 mt-3">
            The job you are looking for doesn't exist or has been removed.
          </p>

          <button
            onClick={() => navigate("/")}
            className="btn btn-primary mt-6"
          >
            Back to Home
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-base-100 min-h-screen py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-5 md:px-8">

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="btn btn-ghost gap-2 mb-8"
        >
          <FaArrowLeft />
          Back
        </motion.button>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-base-200 border border-base-content/10 rounded-3xl overflow-hidden"
        >

          {/* Header */}
          <div className="p-6 md:p-10 border-b border-base-content/10">

            <div className="flex flex-col md:flex-row md:items-center gap-6">

              {/* Logo */}
              <div className="w-24 h-24 rounded-2xl bg-base-100 border border-base-content/10 overflow-hidden shrink-0">
                <img
                  src={job.companyLogo}
                  alt={`${job.company} logo`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title */}
              <div className="flex-1">

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="badge badge-primary">
                    🔥 Hot Job
                  </span>

                  <span className="badge badge-outline">
                    {job.category}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold">
                  {job.title}
                </h1>

                <p className="text-lg text-base-content/60 mt-2 flex items-center gap-2">
                  <FaBuilding className="text-primary" />
                  {job.company}
                </p>

              </div>

              {/* Apply */}
              <button className="btn btn-primary rounded-xl px-8">
                Apply Now
              </button>

            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-10">

            <div className="grid lg:grid-cols-3 gap-10">

              {/* Left */}
              <div className="lg:col-span-2">

                <h2 className="text-2xl font-bold mb-4">
                  Job Description
                </h2>

                <p className="text-base-content/70 leading-8">
                  {job.description}
                </p>

                {/* Job Overview */}
                <h2 className="text-2xl font-bold mt-10 mb-5">
                  Job Overview
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">

                  <div className="p-5 rounded-2xl bg-base-100 border border-base-content/10">
                    <FaMapMarkerAlt className="text-primary text-xl mb-3" />

                    <p className="text-sm text-base-content/50">
                      Location
                    </p>

                    <p className="font-semibold mt-1">
                      {job.location}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-base-100 border border-base-content/10">
                    <FaBriefcase className="text-primary text-xl mb-3" />

                    <p className="text-sm text-base-content/50">
                      Job Type
                    </p>

                    <p className="font-semibold mt-1">
                      {job.jobType}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-base-100 border border-base-content/10">
                    <FaMoneyBillWave className="text-primary text-xl mb-3" />

                    <p className="text-sm text-base-content/50">
                      Salary
                    </p>

                    <p className="font-semibold mt-1">
                      {job.salary}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-base-100 border border-base-content/10">
                    <FaClock className="text-primary text-xl mb-3" />

                    <p className="text-sm text-base-content/50">
                      Application Deadline
                    </p>

                    <p className="font-semibold mt-1">
                      {job.deadline}
                    </p>
                  </div>

                </div>
              </div>

              {/* Right Sidebar */}
              <aside>

                <div className="bg-base-100 border border-base-content/10 rounded-2xl p-6 sticky top-24">

                  <h3 className="text-xl font-bold mb-5">
                    Job Summary
                  </h3>

                  <div className="space-y-5">

                    <div>
                      <p className="text-sm text-base-content/50">
                        Company
                      </p>
                      <p className="font-semibold mt-1">
                        {job.company}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-base-content/50">
                        Category
                      </p>
                      <p className="font-semibold mt-1">
                        {job.category}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-base-content/50">
                        Location
                      </p>
                      <p className="font-semibold mt-1">
                        {job.location}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-base-content/50">
                        Salary
                      </p>
                      <p className="font-semibold mt-1">
                        {job.salary}
                      </p>
                    </div>

                  </div>

                  <button className="btn btn-primary w-full mt-7 rounded-xl">
                    <HiOutlineMail className="text-lg" />
                    Apply for this Job
                  </button>

                </div>

              </aside>

            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default JobDetails;
