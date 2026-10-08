import  { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { useSearchParams } from "react-router";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaFilter,
  FaBriefcase,
  FaTimes,
} from "react-icons/fa";

import JobCard from "../../components/JobCard/JobCard";

const FindJob = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get search values from URL
  const initialKeyword = searchParams.get("keyword") || "";
  const initialLocation = searchParams.get("location") || "";
  const initialCategory = searchParams.get("category") || "All Categories";

  const [keyword, setKeyword] = useState(initialKeyword);
  const [location, setLocation] = useState(initialLocation);
  const [category, setCategory] = useState(initialCategory);

  // Fetch all jobs
  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/jobs`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load jobs");
        }

        return res.json();
      })
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // Keep input synced with URL
  useEffect(() => {
    setKeyword(searchParams.get("keyword") || "");
    setLocation(searchParams.get("location") || "");
    setCategory(
      searchParams.get("category") || "All Categories"
    );
  }, [searchParams]);

  // Categories
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(jobs.map((job) => job.category)),
    ];

    return ["All Categories", ...uniqueCategories];
  }, [jobs]);

  // Filter jobs
  const filteredJobs = useMemo(() => {
    const keywordValue = keyword.toLowerCase().trim();
    const locationValue = location.toLowerCase().trim();

    return jobs.filter((job) => {
      const matchesKeyword =
        !keywordValue ||
        job.title?.toLowerCase().includes(keywordValue) ||
        job.company?.toLowerCase().includes(keywordValue) ||
        job.category?.toLowerCase().includes(keywordValue) ||
        job.description?.toLowerCase().includes(keywordValue);

      const matchesLocation =
        !locationValue ||
        job.location?.toLowerCase().includes(locationValue);

      const matchesCategory =
        category === "All Categories" ||
        job.category === category;

      return (
        matchesKeyword &&
        matchesLocation &&
        matchesCategory
      );
    });
  }, [jobs, keyword, location, category]);

  // Search
  const handleSearch = (e) => {
    e.preventDefault();

    const params = {};

    if (keyword.trim()) {
      params.keyword = keyword.trim();
    }

    if (location.trim()) {
      params.location = location.trim();
    }

    if (category !== "All Categories") {
      params.category = category;
    }

    setSearchParams(params);
  };

  // Clear filters
  const clearFilters = () => {
    setKeyword("");
    setLocation("");
    setCategory("All Categories");
    setSearchParams({});
  };

  return (
    <section className="min-h-screen bg-base-100 py-12 md:py-16">

      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">

        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <FaBriefcase />
            Explore Opportunities
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mt-5">
            Find Your{" "}
            <span className="text-primary isometra-regular">
              Dream Job
            </span>
          </h1>

          <p className="text-base-content/60 max-w-2xl mx-auto mt-4">
            Search thousands of opportunities and find a job
            that matches your skills, experience, and career goals.
          </p>
        </motion.div>

        {/* ================= SEARCH BOX ================= */}
        <motion.form
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSearch}
          className="bg-base-200 border border-base-content/10 rounded-2xl p-3 shadow-xl"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">

            {/* Keyword */}
            <div className="flex items-center gap-3 px-4 bg-base-100 rounded-xl">
              <FaSearch className="text-primary shrink-0" />

              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Job title, keywords..."
                className="input input-ghost w-full focus:outline-none"
              />
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 px-4 bg-base-100 rounded-xl">
              <FaMapMarkerAlt className="text-primary shrink-0" />

              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="input input-ghost w-full focus:outline-none"
              />
            </div>

            {/* Category */}
            <div className="flex items-center gap-3 px-4 bg-base-100 rounded-xl">
              <FaFilter className="text-primary shrink-0" />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="select select-ghost w-full focus:outline-none"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                type="submit"
                className="btn btn-primary flex-1 rounded-xl gap-2"
              >
                <FaSearch />
                Search Jobs
              </button>

              {(keyword || location || category !== "All Categories") && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="btn btn-ghost btn-square rounded-xl"
                  title="Clear filters"
                >
                  <FaTimes />
                </button>
              )}
            </div>

          </div>
        </motion.form>

        {/* ================= RESULTS HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-10 mb-6">

          <div>
            <h2 className="text-2xl font-bold">
              Available Jobs
            </h2>

            <p className="text-sm text-base-content/50 mt-1">
              {loading
                ? "Finding jobs..."
                : `${filteredJobs.length} jobs found`}
            </p>
          </div>

          {(keyword || location || category !== "All Categories") && (
            <button
              onClick={clearFilters}
              className="btn btn-ghost btn-sm rounded-lg gap-2"
            >
              <FaTimes />
              Clear Filters
            </button>
          )}

        </div>

        {/* ================= LOADING ================= */}
        {loading && (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        )}

        {/* ================= EMPTY ================= */}
        {!loading && filteredJobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-base-200 border border-base-content/10 rounded-3xl text-center py-16 px-6"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <FaSearch className="text-primary text-3xl" />
            </div>

            <h3 className="text-2xl font-bold mt-6">
              No Jobs Found
            </h3>

            <p className="text-base-content/60 max-w-md mx-auto mt-3">
              We couldn't find any jobs matching your search.
              Try different keywords, categories, or locations.
            </p>

            <button
              onClick={clearFilters}
              className="btn btn-primary mt-6 rounded-xl"
            >
              View All Jobs
            </button>
          </motion.div>
        )}

        {/* ================= JOB GRID ================= */}
        {!loading && filteredJobs.length > 0 && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
              >
                <JobCard job={job} />
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default FindJob;