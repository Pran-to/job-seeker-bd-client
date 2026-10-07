
import { motion } from "motion/react";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaClock,
  FaMoneyBillWave,
} from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi2";
import { Link } from "react-router";

const HotJobCard = ({ job }) => {
  const {
    _id,
    title,
    company,
    companyLogo,
    location,
    jobType,
    salary,
    deadline,
    category,
  } = job;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group"
    >
      <div className="h-full bg-base-200 border border-base-content/10 rounded-2xl p-5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">

        {/* Top */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">

            {/* Company Logo */}
            <div className="w-14 h-14 rounded-xl bg-base-100 border border-base-content/10 flex items-center justify-center overflow-hidden shrink-0">
              <img
                src={companyLogo}
                alt={`${company} logo`}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                {title}
              </h3>

              <p className="text-sm text-base-content/60 mt-1">
                {company}
              </p>
            </div>
          </div>

          {/* Hot Badge */}
          <span className="badge badge-primary gap-1 shrink-0">
            🔥 Hot
          </span>
        </div>

        {/* Category */}
        <div className="mt-5">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            {category}
          </span>
        </div>

        {/* Job Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">

          <div className="flex items-center gap-2 text-sm text-base-content/60">
            <FaMapMarkerAlt className="text-primary" />
            <span>{location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-base-content/60">
            <FaBriefcase className="text-primary" />
            <span>{jobType}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-base-content/60">
            <FaMoneyBillWave className="text-primary" />
            <span>{salary}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-base-content/60">
            <FaClock className="text-primary" />
            <span>Deadline: {deadline}</span>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-base-content/10 mt-5 pt-5 flex items-center justify-between">

          <span className="text-xs text-base-content/40">
            Posted recently
          </span>

          <Link to={`/jobs/${_id}`} className="btn btn-primary btn-sm rounded-lg gap-2">
            View Details
            <HiArrowRight />
          </Link>

        </div>

      </div>
    </motion.div>
  );
};

export default HotJobCard;

