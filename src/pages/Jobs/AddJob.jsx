import { useContext, useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNavigate, useParams } from "react-router";
import { FaBriefcase, FaSave } from "react-icons/fa";
import AuthContext from "../../context/AuthContext/AuthContext";
import toast from "react-hot-toast";


const initialForm = {
  title: "",
  company: "",
  companyLogo: "",
  location: "",
  jobType: "Full Time",
  salary: "",
  deadline: "",
  category: "Software & IT",
  description: "",
};

const AddJob = () => {
    const { user } = useContext(AuthContext)
  const { id } = useParams();
  const navigate = useNavigate();
  const email = user?.email;

  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(Boolean(id));
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id || !email) {
      setFetching(false);
      return;
    }

    const loadJob = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/jobs/${id}`);
        if (!response.ok) throw new Error("Could not load this job.");

        const job = await response.json();

        if (job.postedByEmail !== email.toLowerCase()) {
          throw new Error("You cannot edit another HR user's job.");
        }

        const { _id, postedByEmail, createdAt, updatedAt, ...editableFields } = job;
        setFormData({ ...initialForm, ...editableFields });
      } catch (err) {
        setError(err.message);
      } finally {
        setFetching(false);
      }
    };

    loadJob();
  }, [id, email]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!email) {
      setError("Please sign in before posting a job.");
      return;
    }

    setLoading(true);

    try {
      const url = id ? `${import.meta.env.VITE_SERVER_URL}/jobs/${id}` : `${import.meta.env.VITE_SERVER_URL}/jobs`;
      const method = id ? "PATCH" : "POST";

      const payload = {
        ...formData,
        postedByEmail: email.toLowerCase(),
        ...(id ? { ownerEmail: email.toLowerCase() } : {}),
      };

      const token = await user.getIdToken();
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to save the job.");
      }
       toast.success(id ? "Job updated successfully!" : "Job posted successfully!");
      // After posting or updating, go to My Posted Jobs.
      navigate("/dashboard/my-posted-jobs");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="text-center py-20">Loading job details...</div>;
  }

  const inputClass =
    "input input-bordered w-full rounded-xl focus:outline-primary";
  const selectClass =
    "select select-bordered w-full rounded-xl focus:outline-primary";

  return (
    <section className="min-h-screen bg-base-100 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-base-200 border border-base-content/10 rounded-3xl p-5 sm:p-8 lg:p-10"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-primary/10 text-primary rounded-2xl p-4">
              <FaBriefcase size={26} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                {id ? "Update Job Post" : "Post a New Job"}
              </h1>
              <p className="text-base-content/60 mt-1">
                Share an opportunity with the right candidates.
              </p>
            </div>
          </div>

          {error && (
            <div role="alert" className="alert alert-error mb-6">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-5">
              <label className="form-control">
                <span className="label-text font-semibold mb-2">Job Title *</span>
                <input
                  className={inputClass}
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. MERN Stack Developer"
                  required
                />
              </label>

              <label className="form-control">
                <span className="label-text font-semibold mb-2">Company Name *</span>
                <input
                  className={inputClass}
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company name"
                  required
                />
              </label>

              <label className="form-control">
                <span className="label-text font-semibold mb-2">Company Logo URL</span>
                <input
                  className={inputClass}
                  type="url"
                  name="companyLogo"
                  value={formData.companyLogo}
                  onChange={handleChange}
                  placeholder="https://example.com/logo.png"
                />
              </label>

              <label className="form-control">
                <span className="label-text font-semibold mb-2">Location *</span>
                <input
                  className={inputClass}
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Dhaka, Bangladesh / Remote"
                  required
                />
              </label>

              <label className="form-control">
                <span className="label-text font-semibold mb-2">Job Type *</span>
                <select
                  className={selectClass}
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  required
                >
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>Remote</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </label>

              <label className="form-control">
                <span className="label-text font-semibold mb-2">Salary *</span>
                <input
                  className={inputClass}
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="৳40K - ৳60K"
                  required
                />
              </label>

              <label className="form-control">
                <span className="label-text font-semibold mb-2">Category *</span>
                <select
                  className={selectClass}
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option>Software & IT</option>
                  <option>Design & Creative</option>
                  <option>Marketing</option>
                  <option>Business & Management</option>
                  <option>Finance & Accounting</option>
                  <option>Human Resources</option>
                  <option>Sales</option>
                  <option>Customer Support</option>
                  <option>Writing & Content</option>
                  <option>Data & Analytics</option>
                  <option>Cyber Security</option>
                  <option>Other</option>
                </select>
              </label>

              <label className="form-control">
                <span className="label-text font-semibold mb-2">Application Deadline *</span>
                <input
                  className={inputClass}
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <label className="form-control">
              <span className="label-text font-semibold mb-2">
                Job Description *
              </span>
              <textarea
                className="textarea textarea-bordered w-full min-h-40 rounded-xl focus:outline-primary"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the role, responsibilities, and requirements..."
                required
              />
            </label>

            <button
              type="submit"
              disabled={loading || !email}
              className="btn btn-primary rounded-xl w-full sm:w-auto px-8"
            >
              <FaSave />
              {loading
                ? "Saving..."
                : id
                  ? "Update Job"
                  : "Publish Job"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default AddJob;