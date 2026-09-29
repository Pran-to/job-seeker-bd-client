import { Lottie } from "lottie-react";
import lottieData from "../../assets/lottie/register.json";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";

const Register = () => {
  const { createUser }= useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!/^(?=.*[A-Z])(?=.*[a-z]).{6,}$/.test(password)) {
      alert(
        "Password must be at least 6 characters and contain one uppercase and one lowercase letter.",
      );
      return;
    }

    createUser(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
      e.target.reset();
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center  w-1/2 md:w-96 ">
          <Lottie src={lottieData} autoplay loop></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="text-5xl font-bold mx-auto">
            <span className="text-primary">Register</span> now!
          </h1>

          <form className="card-body" onSubmit={handleSubmit}>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
              />
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                className="input"
                placeholder="Password"
              />      
              <button className="btn btn-neutral mt-4">Register</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
