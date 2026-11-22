
const benefits = [
  {
    icon: "🎯",
    title: "Find the Right Job",
    description:
      "Discover job opportunities that match your skills, experience, and career goals.",
  },
  {
    icon: "⚡",
    title: "Easy Application Process",
    description:
      "Apply for your favorite jobs quickly and track your application status in one place.",
  },
  {
    icon: "🔒",
    title: "Secure & Trusted",
    description:
      "Enjoy a secure platform where applicants and employers can connect with confidence.",
  },
  {
    icon: "📊",
    title: "Track Your Progress",
    description:
      "Monitor your applications and stay updated as employers review your profile.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 md:py-24 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold uppercase tracking-wider">
            Why Choose Us
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Your Career Journey Starts Here
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto mt-4">
            We make job searching and recruitment easier with useful tools
            for both job seekers and employers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-md hover:shadow-xl
              hover:-translate-y-2 transition-all duration-300"
            >
              <div className="card-body items-center text-center">
                <div className="text-4xl mb-3">
                  {benefit.icon}
                </div>
                <h3 className="card-title text-lg">
                  {benefit.title}
                </h3>
                <p className="text-base-content/70 text-sm">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
