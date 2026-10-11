import { useCallback, useContext, useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaUsers,
  FaEdit,
  FaTrash,
  FaEye,
} from "react-icons/fa";
import AuthContext from "../../context/AuthContext/AuthContext";
import toast from "react-hot-toast";

const statusOptions = ["Pending", "Accept", "Reject", "Hire"];

const statusClass = {
  Pending: "badge-warning",
  Accept: "badge-info",
  Reject: "badge-error",
  Hire: "badge-success",
};

const MyPostedJobs = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const email = user?.email?.toLowerCase();

  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState({});
  const [expandedJob, setExpandedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");

  const fetchJobs = useCallback(async () => {
    if (!email) {
      setJobs([]);
      setLoading(false);
      return;
    }

    try {
      setError("");
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/my-jobs?email=${encodeURIComponent(email)}`,
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not load your jobs.");
      }

      setJobs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const loadApplicants = async (jobId) => {
    if (expandedJob === jobId) {
      setExpandedJob(null);
      return;
    }

    setExpandedJob(jobId);

    // Reuse cached results until the user refreshes or changes a status.
    if (applicants[jobId]) return;

    try {
      setBusyId(jobId);

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/jobs/${jobId}/applications?email=${encodeURIComponent(email)}`,
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not load applicants.");
      }

      setApplicants((prev) => ({ ...prev, [jobId]: data }));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId("");
    }
  };

  const deleteJob = async (job) => {
    const confirmed = window.confirm(
      `Delete "${job.title}" and all applications for this job?`,
    );

    if (!confirmed) return;
    if (confirmed) {
      toast.success("Job deleted successfully!");
    }

    try {
      setBusyId(job._id);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/jobs/${job._id}?email=${encodeURIComponent(email)}`,
        { method: "DELETE" },
      );
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Delete failed.");

      setJobs((prev) => prev.filter((item) => item._id !== job._id));
      setApplicants((prev) => {
        const next = { ...prev };
        delete next[job._id];
        return next;
      });
      setExpandedJob(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId("");
    }
  };

  const updateStatus = async (jobId, applicationId, status) => {
    try {
      setBusyId(applicationId);
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/applications/${applicationId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
            ownerEmail: user.email.toLowerCase(),
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update status");
      }

      // Immediately update the applicant list in the UI
      setApplicants((prev) => ({
        ...prev,
        [jobId]: (prev[jobId] || []).map((application) =>
          application._id === applicationId
            ? { ...application, status: result.status }
            : application,
        ),
      }));
    } catch (error) {
      setError(error.message);
    } finally {
      setBusyId("");
    }
  };

  if (!email) {
    return (
      <div className="min-h-[50vh] grid place-items-center px-4">
        <p className="text-center">
          Please sign in with your HR/Admin account to manage job posts.
        </p>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-20">Loading your job posts...</div>;
  }

  return (
    <section className="min-h-screen bg-base-100 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-primary font-semibold mb-2">HR DASHBOARD</p>
            <h1 className="text-3xl sm:text-4xl font-bold">My Posted Jobs</h1>
            <p className="text-base-content/60 mt-2">
              Manage job posts and review candidates.
            </p>
          </div>

          <button
            onClick={() => navigate("/add-job")}
            className="btn btn-primary rounded-xl"
          >
            <FaBriefcase /> Post a New Job
          </button>
        </div>

        {error && (
          <div role="alert" className="alert alert-error mb-6">
            <span>{error}</span>
            <button className="btn btn-sm" onClick={() => setError("")}>
              Dismiss
            </button>
          </div>
        )}

        {jobs.length === 0 ? (
          <div className="bg-base-200 rounded-3xl text-center p-10 sm:p-16">
            <FaBriefcase className="mx-auto text-primary text-4xl mb-4" />
            <h2 className="text-xl font-bold">
              You haven't posted any jobs yet
            </h2>
            <p className="text-base-content/60 mt-2 mb-5">
              Publish your first opportunity to start receiving applications.
            </p>
            <button
              onClick={() => navigate("/add-job")}
              className="btn btn-primary rounded-xl"
            >
              Create Job Post
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {jobs.map((job) => (
              <motion.article
                key={job._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-base-200 border border-base-content/10 rounded-2xl overflow-hidden"
              >
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                    <div className="flex items-start gap-4 min-w-0">
                      <div className="w-14 h-14 rounded-xl bg-base-100 overflow-hidden shrink-0">
                        {job.companyLogo ? (
                          <img
                            src={job.companyLogo}
                            alt={`${job.company} logo`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="grid place-items-center h-full text-primary">
                            <FaBriefcase size={24} />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <h2 className="text-xl font-bold">{job.title}</h2>
                        <p className="text-base-content/60 mt-1">
                          {job.company}
                        </p>
                        <div className="flex flex-wrap gap-3 mt-3 text-sm text-base-content/60">
                          <span className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-primary" />
                            {job.location}
                          </span>
                          <span className="badge badge-primary badge-outline">
                            {job.jobType}
                          </span>
                          <span>{job.salary}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => navigate(`/add-job/${job._id}`)}
                        className="btn btn-sm btn-outline btn-primary rounded-lg"
                      >
                        <FaEdit /> Edit
                      </button>

                      <button
                        onClick={() => deleteJob(job)}
                        disabled={busyId === job._id}
                        className="btn btn-sm btn-outline btn-error rounded-lg"
                      >
                        <FaTrash />
                        {busyId === job._id ? "Deleting..." : "Delete"}
                      </button>

                      <button
                        onClick={() => loadApplicants(job._id)}
                        disabled={busyId === job._id}
                        className="btn btn-sm btn-primary rounded-lg"
                      >
                        <FaUsers />
                        {expandedJob === job._id
                          ? "Hide Applicants"
                          : "Applicants"}
                      </button>
                    </div>
                  </div>
                </div>

                {expandedJob === job._id && (
                  <div className="border-t border-base-content/10 p-5 sm:p-6">
                    <h3 className="font-bold text-xl mb-5 flex items-center gap-2">
                      <FaUsers className="text-primary" />
                      Applicants
                    </h3>

                    {busyId === job._id && !applicants[job._id] ? (
                      <p className="py-6 text-center">Loading applicants...</p>
                    ) : applicants[job._id]?.length ? (
                      <div className="space-y-4">
                        {applicants[job._id].map((application) => (
                          <div
                            key={application._id}
                            className="bg-base-100 border border-base-content/10 rounded-xl p-4 sm:p-5"
                          >
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                              <div>
                                <h4 className="font-bold text-lg">
                                  {application.applicantName}
                                </h4>
                                <p className="text-sm text-base-content/70 mt-1">
                                  {application.applicantEmail}
                                </p>
                                <p className="text-sm text-base-content/70">
                                  {application.applicantPhone}
                                </p>
                                {application.appliedAt && (
                                  <p className="text-xs text-base-content/50 mt-2">
                                    Applied:{" "}
                                    {new Date(
                                      application.appliedAt,
                                    ).toLocaleDateString()}
                                  </p>
                                )}

                                <div className="flex flex-wrap gap-2 mt-3">
                                  {application.resume && (
                                    <a
                                      href={application.resume}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="btn btn-xs btn-outline"
                                    >
                                      View Resume
                                    </a>
                                  )}
                                  {application.portfolio && (
                                    <a
                                      href={application.portfolio}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="btn btn-xs btn-outline"
                                    >
                                      Portfolio
                                    </a>
                                  )}
                                </div>
                              </div>

                              <div className="flex flex-col gap-2 min-w-36">
                                <span
                                  className={`badge ${
                                    statusClass[application.status] ||
                                    "badge-ghost"
                                  }`}
                                >
                                  {application.status || "Pending"}
                                </span>

                                <label className="text-xs text-base-content/60">
                                  Update application status
                                </label>
                                <select
                                  className="select select-bordered select-sm rounded-lg"
                                  value={application.status || "Pending"}
                                  disabled={busyId === application._id}
                                  onChange={(event) =>
                                    updateStatus(
                                      job._id,
                                      application._id,
                                      event.target.value,
                                    )
                                  }
                                >
                                  {["Pending", "Accept", "Reject", "Hire"].map(
                                    (status) => (
                                      <option key={status} value={status}>
                                        {status}
                                      </option>
                                    ),
                                  )}
                                </select>
                              </div>
                            </div>

                            {application.coverLetter && (
                              <div className="mt-4 border-t border-base-content/10 pt-4">
                                <p className="font-semibold text-sm mb-1">
                                  Cover Letter
                                </p>
                                <p className="text-sm text-base-content/70 whitespace-pre-line">
                                  {application.coverLetter}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-base-content/60">
                        <FaEye className="mx-auto text-2xl mb-2" />
                        No applicants yet for this job.
                      </div>
                    )}
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyPostedJobs;
