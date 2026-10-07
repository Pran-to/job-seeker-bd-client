import { useContext, useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import {
  FaBriefcase,
  FaBuilding,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaEye,
  FaClipboardList,
} from "react-icons/fa";
import AuthContext from "../../context/AuthContext/AuthContext";

const MyApplications = () => {
  const navigate = useNavigate();
  const {user} = useContext(AuthContext)

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/applications?email=${user.email}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load applications");
        }

        return res.json();
      })
      .then((data) => {
        setApplications(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="min-h-screen bg-base-100 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-base-100 py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-5 md:px-8">

        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
              <FaClipboardList className="text-primary text-xl" />
            </div>

            <span className="text-primary font-semibold">
              Career Dashboard
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold">
            My Applications
          </h1>

          <p className="text-base-content/60 mt-3 max-w-2xl">
            Track all the jobs you have applied for and check your
            application status.
          </p>
        </motion.div>

        {/* ================= EMPTY STATE ================= */}
        {applications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-base-200 border border-base-content/10 rounded-3xl p-10 md:p-16 text-center"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <FaBriefcase className="text-primary text-3xl" />
            </div>

            <h2 className="text-2xl font-bold mt-6">
              No Applications Yet
            </h2>

            <p className="text-base-content/60 mt-3 max-w-md mx-auto">
              You haven't applied for any jobs yet. Explore available jobs
              and start building your career today.
            </p>

            <button
              onClick={() => navigate("/jobs")}
              className="btn btn-primary mt-7 rounded-xl"
            >
              Browse Jobs
            </button>
          </motion.div>
        ) : (
          <>
            {/* ================= APPLICATION COUNT ================= */}
            <div className="mb-6">
              <div className="badge badge-primary badge-lg">
                {applications.length}{" "}
                {applications.length === 1
                  ? "Application"
                  : "Applications"}
              </div>
            </div>

            {/* ================= APPLICATION LIST ================= */}
            <div className="space-y-5">
              {applications.map((application, index) => (
                <motion.div
                  key={application._id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                  }}
                  whileHover={{ y: -3 }}
                  className="bg-base-200 border border-base-content/10 rounded-2xl p-5 md:p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">

                    {/* Company Logo */}
                    <div className="w-16 h-16 rounded-xl bg-base-100 border border-base-content/10 flex items-center justify-center overflow-hidden shrink-0">
                      {application.companyLogo ? (
                        <img
                          src={application.companyLogo}
                          alt={`${application.company} logo`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FaBuilding className="text-primary text-2xl" />
                      )}
                    </div>

                    {/* Job Information */}
                    <div className="flex-1 min-w-0">

                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-xl font-bold">
                          {application.jobTitle}
                        </h2>

                        <StatusBadge status={application.status} />
                      </div>

                      <p className="text-base-content/60 mt-1 flex items-center gap-2">
                        <FaBuilding className="text-primary" />
                        {application.company}
                      </p>

                      {/* Job Details */}
                      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-sm text-base-content/60">

                        {application.location && (
                          <span className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-primary" />
                            {application.location}
                          </span>
                        )}

                        {application.jobType && (
                          <span className="flex items-center gap-2">
                            <FaBriefcase className="text-primary" />
                            {application.jobType}
                          </span>
                        )}

                        {application.salary && (
                          <span className="flex items-center gap-2">
                            <FaMoneyBillWave className="text-primary" />
                            {application.salary}
                          </span>
                        )}

                      </div>
                    </div>

                    {/* Application Date + Button */}
                    <div className="lg:text-right shrink-0">

                      <div className="flex lg:justify-end items-center gap-2 text-sm text-base-content/50">
                        <FaCalendarAlt className="text-primary" />
                        <span>
                          Applied{" "}
                          {application.appliedAt
                            ? new Date(
                                application.appliedAt
                              ).toLocaleDateString("en-BD", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : "Recently"}
                        </span>
                      </div>

                      <button
                        onClick={() =>
                          navigate(`/jobs/${application.jobId}`)
                        }
                        className="btn btn-outline btn-primary btn-sm rounded-lg gap-2 mt-4"
                      >
                        <FaEye />
                        View Job
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

/* ================= STATUS BADGE ================= */

const StatusBadge = ({ status }) => {
  const normalizedStatus = status?.toLowerCase();

  if (normalizedStatus === "accepted") {
    return (
      <span className="badge badge-success gap-1">
        Accepted
      </span>
    );
  }

  if (normalizedStatus === "rejected") {
    return (
      <span className="badge badge-error gap-1">
        Rejected
      </span>
    );
  }

  if (normalizedStatus === "interview") {
    return (
      <span className="badge badge-info gap-1">
        Interview
      </span>
    );
  }

  return (
    <span className="badge badge-warning gap-1">
      Pending
    </span>
  );
};

export default MyApplications;