import { Link } from "react-router-dom";
import { Button } from "../../Components/Button/Index";
import { Input } from "../../Components/Input/index";
const Register = () => {
  const onSubmit = (event) => {
    event.preventDefault();
    console.log("data", event);
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen">
      <div className="w-full max-w-lg">
        <form
          onSubmit={onSubmit}
          className="border border-gray-300 bg-slate-100 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h3 className=" text-center text-2xl mb-5">Register</h3>
          <div className="mb-4">
            <Input label="Firstname" name="firstname" id="firstname" />
          </div>
          <div className="mb-4">
            <Input label="Lastname" name="lastname" id="lastname" />
          </div>
          <div className="mb-4">
            <Input label="Username" name="username" id="username" />
          </div>
          <div className="mb-6">
            <Input label="Password" name="password" id="password" />
          </div>
          <div className="flex items-center justify-between">
            <Button
              type="submit"
              size="large"
              className="w-full"
              variant="primary"
            >
              Register
            </Button>
          </div>
          <p className="text-center mt-3">
            If you already have an account?{" "}
            <Link className="underline text-sky-600" to={"/"}>
              Login
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};
export default Register;
