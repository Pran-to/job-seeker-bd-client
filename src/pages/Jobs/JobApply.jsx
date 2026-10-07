import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNavigate, useParams } from "react-router";
import {
  FaArrowLeft,
  FaBriefcase,
  FaBuilding,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaPaperPlane,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaFileAlt,
  FaLink,
} from "react-icons/fa";

const JobApply = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
    portfolio: "",
    coverLetter: "",
  });

  // Get job information
  useEffect(() => {
    fetch(`http://localhost:3000/jobs/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Job not found");
        }

        return res.json();
      })
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Submit application
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    const applicationData = {
      jobId: job._id,
      jobTitle: job.title,
      company: job.company,

      applicantName: formData.name,
      applicantEmail: formData.email,
      applicantPhone: formData.phone,

      resume: formData.resume,
      portfolio: formData.portfolio,
      coverLetter: formData.coverLetter,

      status: "Pending",
      appliedAt: new Date(),
    };

    try {
      const response = await fetch("http://localhost:3000/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Application submitted successfully!");

        navigate(`/jobs/${id}`);
      } else {
        alert(data.message || "Failed to submit application.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Job not found
  if (!job) {
    return (
      <section className="min-h-screen bg-base-100 flex items-center justify-center px-5">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Job Not Found</h2>

          <p className="text-base-content/60 mt-3">
            The job you are trying to apply for does not exist.
          </p>

          <button
            onClick={() => navigate("/")}
            className="btn btn-primary mt-6 rounded-xl"
          >
            Back to Home
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-base-100 py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-5 md:px-8">

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="btn btn-ghost gap-2 mb-8"
        >
          <FaArrowLeft />
          Back to Job Details
        </motion.button>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="text-primary font-semibold mb-2">
            Job Application
          </p>

          <h1 className="text-3xl md:text-4xl font-bold">
            Apply for this position
          </h1>

          <p className="text-base-content/60 mt-3">
            Complete the form below to submit your application.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* =========================
              JOB INFORMATION
          ========================== */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-base-200 border border-base-content/10 rounded-3xl p-6 sticky top-24">

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-base-100 border border-base-content/10 overflow-hidden">
                  <img
                    src={job.companyLogo}
                    alt={`${job.company} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h2 className="font-bold text-lg">
                    {job.title}
                  </h2>

                  <p className="text-sm text-base-content/60">
                    {job.company}
                  </p>
                </div>
              </div>

              <div className="space-y-4">

                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-primary" />

                  <div>
                    <p className="text-xs text-base-content/50">
                      Location
                    </p>

                    <p className="font-medium">
                      {job.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaBriefcase className="text-primary" />

                  <div>
                    <p className="text-xs text-base-content/50">
                      Job Type
                    </p>

                    <p className="font-medium">
                      {job.jobType}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaMoneyBillWave className="text-primary" />

                  <div>
                    <p className="text-xs text-base-content/50">
                      Salary
                    </p>

                    <p className="font-medium">
                      {job.salary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaBuilding className="text-primary" />

                  <div>
                    <p className="text-xs text-base-content/50">
                      Category
                    </p>

                    <p className="font-medium">
                      {job.category}
                    </p>
                  </div>
                </div>

              </div>

              <div className="divider"></div>

              <div className="bg-primary/10 rounded-xl p-4">
                <p className="text-sm text-base-content/70">
                  Application Deadline
                </p>

                <p className="text-primary font-bold mt-1">
                  {job.deadline}
                </p>
              </div>

            </div>
          </motion.div>

          {/* =========================
              APPLICATION FORM
          ========================== */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-base-200 border border-base-content/10 rounded-3xl p-6 md:p-8"
            >

              <div className="mb-8">
                <h2 className="text-2xl font-bold">
                  Personal Information
                </h2>

                <p className="text-sm text-base-content/60 mt-2">
                  Tell the employer a little about yourself.
                </p>
              </div>

              {/* Name + Email */}
              <div className="grid md:grid-cols-2 gap-5">

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Full Name
                    </span>
                  </label>

                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="input input-bordered w-full pl-11 rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Email Address
                    </span>
                  </label>

                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@gmail.com"
                      className="input input-bordered w-full pl-11 rounded-xl"
                      required
                    />
                  </div>
                </div>

              </div>

              {/* Phone */}
              <div className="form-control mt-5">
                <label className="label">
                  <span className="label-text font-medium">
                    Phone Number
                  </span>
                </label>

                <div className="relative">
                  <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+880 1XXXXXXXXX"
                    className="input input-bordered w-full pl-11 rounded-xl"
                    required
                  />
                </div>
              </div>

              {/* Resume + Portfolio */}
              <div className="grid md:grid-cols-2 gap-5 mt-5">

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Resume / CV Link
                    </span>
                  </label>

                  <div className="relative">
                    <FaFileAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />

                    <input
                      type="url"
                      name="resume"
                      value={formData.resume}
                      onChange={handleChange}
                      placeholder="https://drive.google.com/..."
                      className="input input-bordered w-full pl-11 rounded-xl"
                      required
                    />
                  </div>

                  <label className="label">
                    <span className="label-text-alt text-base-content/50">
                      Google Drive / Dropbox / CV URL
                    </span>
                  </label>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Portfolio URL
                    </span>
                  </label>

                  <div className="relative">
                    <FaLink className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />

                    <input
                      type="url"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleChange}
                      placeholder="https://yourportfolio.com"
                      className="input input-bordered w-full pl-11 rounded-xl"
                    />
                  </div>

                  <label className="label">
                    <span className="label-text-alt text-base-content/50">
                      Optional
                    </span>
                  </label>
                </div>

              </div>

              {/* Cover Letter */}
              <div className="form-control mt-2">

                <label className="label">
                  <span className="label-text font-medium">
                    Cover Letter
                  </span>
                </label>

                <div className="relative">
                  <FaFileAlt className="absolute left-4 top-4 text-base-content/40" />

                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    placeholder="Tell the employer why you are a good fit for this position..."
                    className="textarea textarea-bordered w-full min-h-48 pl-11 pt-4 rounded-xl resize-none"
                    required
                  ></textarea>
                </div>

              </div>

              {/* Agreement */}
              <div className="form-control mt-6">

                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    required
                  />

                  <span className="text-sm text-base-content/70">
                    I confirm that the information provided in this
                    application is accurate and complete.
                  </span>
                </label>

              </div>

              {/* Submit */}
              <div className="border-t border-base-content/10 mt-6 pt-6">

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary w-full rounded-xl text-base gap-2"
                >
                  {submitting ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Submit Application
                    </>
                  )}
                </button>

              </div>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default JobApply;