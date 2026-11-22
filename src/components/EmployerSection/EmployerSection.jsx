
import { Link } from "react-router";

const EmployerSection = () => {
  const features = [
    "Post job opportunities easily",
    "Manage all your posted jobs",
    "View applicants for each job",
    "Review and update application status",
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 to-indigo-950 text-white">
          <div className="absolute w-72 h-72 bg-white/10 rounded-full -top-28 -right-20"></div>
          <div className="absolute w-60 h-60 bg-white/10 rounded-full -bottom-32 -left-20"></div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center p-8 md:p-16">
            <div>
              <span className="badge badge-outline border-white/50 text-white mb-5 py-3">
                FOR EMPLOYERS & HR
              </span>

              <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                Find the Right Talent for Your Company
              </h2>

              <p className="text-blue-100 leading-relaxed mb-8">
                Connect with talented candidates, publish job
                opportunities, and manage your recruitment process
                from one simple platform.
              </p>

              <Link
                to="/register"
                className="btn bg-white text-blue-800 hover:bg-blue-100 border-none"
              >
                Join as an Employer
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-7 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">
                Everything You Need
              </h3>

              <div className="space-y-5">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-green-400 text-blue-950 flex items-center justify-center font-bold">
                      ✓
                    </span>
                    <p className="text-blue-50">{feature}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-sm text-blue-100">
                  Build your team with Job Seeker BD.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployerSection;
