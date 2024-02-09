import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import { Link, useNavigate } from "react-router-dom";

interface IFormInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
 
  const navigate = useNavigate();

  const getCharacterValidationError = (str: string) => {
    return `Your password must have at least 1 ${str} character`;
  };

  const schema = yup
    .object({
      name: yup
        .string()
        .required("required")
        .max(20, "Username can not be longer than 20 charater"),
      email: yup.string().email().required("required"),
      password: yup
        .string()
        .required("required")
        .min(8, "Password must have at least 8 characters")
        .matches(/[0-9]/, getCharacterValidationError("digit"))
        .matches(/[a-z]/, getCharacterValidationError("lowercase"))
        .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
      confirmPassword: yup
        .string()
        .required("required")
        .oneOf([yup.ref("password")], "Passwords must match"),
    })
    .required();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data:IFormInput, event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    console.log(data);
    const name =data.name
    const email = data.email
    const password =data.password
    const role = "user"
    const users = { name, email, password, role};
    

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(users),
    }).then(() => {
      console.log("new User Registered");
      navigate("/login");
    });
  };

  return (
    <section className="login-page">
      <div className="login-form-wrapper">
        <div className="card">
          <h1 className="heading">Register Form</h1>
          <div className="login-form"></div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-field">
              <Controller
                name="name"
                control={control}
                render={({ field }) => <input {...field} placeholder="Name" />}
              />
              <span className="error">{errors.name?.message}</span>
            </div>
            <div className="input-field">
              <Controller
                name="email"
                control={control}
                render={({ field }) => <input {...field} placeholder="Email" />}
              />
              <span className="error">{errors.email?.message}</span>
            </div>
            <div className="input-field">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input {...field} placeholder="Password" />
                )}
              />
              <span className="error">{errors.password?.message}</span>
            </div>
            <div className="input-field">
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <input {...field} placeholder="Confirm Password" />
                )}
              />
              <span className="error">{errors.confirmPassword?.message}</span>
            </div>
            <input type="submit" value="Register Now" />
          </form>
          <DevTool control={control} />
        </div>
        <div className="register">
          <Link to="/login">Login</Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
