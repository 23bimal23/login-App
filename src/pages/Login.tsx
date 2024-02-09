import "../Styles/Login.css";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { useState } from "react";

interface IFormInput {
  email: string;
  password: string;
}

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`;
};

const schema = yup
  .object({
    email: yup.string().email().required("required"),
    password: yup
      .string()
      .required("required")
      .min(8, "Password must have at least 8 characters")
      .matches(/[0-9]/, getCharacterValidationError("digit"))
      .matches(/[a-z]/, getCharacterValidationError("lowercase"))
      .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
  })
  .required();

export const Login = () => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data, event) => {

    event?.preventDefault();
    setType("password");
    const userCredentials = {
      email: data.email,
      password: data.password,
    };

    localStorage.setItem("userCredentials", JSON.stringify(userCredentials));

    navigate("/");
  };

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };
  // const login =()=>{
  //   localStorage.setItem("email", watch('email'));
  //   if(watch('email')==="company@example.com"){
  //     navigate("/home");
  //   }
  // }

  return (
    <section className="login-page">
      <div className="login-form-wrapper">
        <div className="card">
          <h1 className="heading">Login Form</h1>
          <div className="login-form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-field">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="email"
                      autoComplete="example@gmail.com"
                    />
                  )}
                />
                <i className="fa-solid fa-envelope"></i>
                <span className="error">{errors.email?.message}</span>
              </div>
              <div className="input-field">
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="password"
                      autoComplete="password"
                      type={type}
                    />
                  )}
                />
                <span onClick={handleToggle} className="eyeIcon">
                  <Icon className="absolute mr-10" icon={icon} size={15} />
                </span>
                <i className="fa-solid fa-key"></i>
                <span className="error">{errors.password?.message}</span>
              </div>
              <div className="submit-input">
                <button type="submit">Login</button>
                {/* onClick={()=>login()} */}
                <a href="">forgot Password ?</a>
              </div>
            </form>
            <DevTool control={control} />
          </div>
        </div>
        <div className="register">
          <Link to="/register">Register</Link>
        </div>
      </div>
    </section>
  );
};
