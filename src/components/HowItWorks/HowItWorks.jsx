
const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: "🔍",
      title: "Find Your Dream Job",
      description:
        "Explore thousands of job opportunities and find the perfect position that matches your skills and career goals.",
    },
    {
      number: "02",
      icon: "📄",
      title: "Apply With Confidence",
      description:
        "Submit your application easily and share your qualifications with employers looking for talented people.",
    },
    {
      number: "03",
      icon: "🚀",
      title: "Get Hired",
      description:
        "Track your application status and take the next step toward building your professional career.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-base-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-primary font-semibold uppercase tracking-widest mb-3">
            Simple Process
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Your dream career is just three simple steps away.
            Start exploring opportunities and move closer to success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-base-300"
            >
              <div className="card-body items-center text-center p-8">
                <span className="text-primary font-bold text-sm">
                  STEP {step.number}
                </span>

                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-4xl my-3">
                  {step.icon}
                </div>

                <h3 className="text-xl font-bold">
                  {step.title}
                </h3>

                <p className="text-base-content/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
