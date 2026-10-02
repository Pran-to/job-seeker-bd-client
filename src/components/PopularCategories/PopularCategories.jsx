
import { motion } from "motion/react";
import {
  FaCode,
  FaBriefcase,
  FaChartLine,
  FaBullhorn,
  FaHeartbeat,
  FaGraduationCap,
} from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi2";

const categories = [
  {
    id: 1,
    title: "Software & IT",
    jobs: "1,250+ Jobs",
    icon: <FaCode />,
  },
  {
    id: 2,
    title: "Business & Management",
    jobs: "850+ Jobs",
    icon: <FaBriefcase />,
  },
  {
    id: 3,
    title: "Finance & Accounting",
    jobs: "720+ Jobs",
    icon: <FaChartLine />,
  },
  {
    id: 4,
    title: "Marketing & Sales",
    jobs: "640+ Jobs",
    icon: <FaBullhorn />,
  },
  {
    id: 5,
    title: "Healthcare",
    jobs: "430+ Jobs",
    icon: <FaHeartbeat />,
  },
  {
    id: 6,
    title: "Education",
    jobs: "380+ Jobs",
    icon: <FaGraduationCap />,
  },
];

const PopularCategories = () => {
  return (
    <section className="bg-base-100 py-20 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">

        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>

            <span className="text-sm font-medium">
              Explore Opportunities
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Explore Popular
            <span className="text-primary">
              Job Categories
            </span>
          </h2>

          <p className="mt-4 text-base-content/60 leading-7">
            Find the right career opportunity from thousands of jobs across
            different industries and professional fields.
          </p>
        </motion.div>

        {/* ================= CATEGORY GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -8,
              }}
              className="group"
            >
              <div className="relative p-6 rounded-2xl bg-base-200 border border-base-content/10 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 cursor-pointer">

                {/* Icon */}
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                  }}
                  className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl mb-5"
                >
                  {category.icon}
                </motion.div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>

                  <p className="text-sm text-base-content/50 mt-2">
                    {category.jobs}
                  </p>
                </div>

                {/* Arrow */}
                <motion.div
                  initial={{ opacity: 0, x: -5 }}
                  whileHover={{
                    opacity: 1,
                    x: 0,
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-primary text-primary-content flex items-center justify-center"
                >
                  <HiArrowRight />
                </motion.div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* ================= BOTTOM BUTTON ================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex justify-center mt-10"
        >
          <button className="btn btn-outline btn-primary rounded-xl px-7 gap-2">
            View All Categories
            <HiArrowRight />
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default PopularCategories;

