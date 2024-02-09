import { Login } from "./pages/Login";
import MainLayout from "./MainLayout";
import "./Styles/Dashboard.css";
import { useEffect, useState } from "react";

type TUser = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
};

const PrivateRoute = () => {
  const [isValidUser, setIsValidUser] = useState(false);
  const checkUser = async () => {
    const storedCredentials = localStorage.getItem("userCredentials");

    if (!storedCredentials) {
      alert("User not found");
      return;
    }

    const storedUser = JSON.parse(storedCredentials);

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const users: TUser[] = await response.json();
        const matchingUser = users.find(
          (user) =>
            user.email === storedUser.email &&
            user.password === storedUser.password
        );

        if (matchingUser) {
          setIsValidUser(true);
        } else {
          alert("Invalid Credentials");
        }
      } else {
        alert("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error during user data fetch:", error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return <>{isValidUser ? <MainLayout /> : <Login />}</>;
};

export default PrivateRoute;

// const Credentials = {
//   email: "company@example.com",
//   password: "Delta1122!",
// };

//   const UserCredentials = localStorage.getItem("userCredentials");

//   if (UserCredentials !== JSON.stringify(Credentials)) {
//     alert("Inavalid Credentials");
//   } else {
//     setIsValidUser(true);
//   }
// };

// useEffect(() => {
//   checkUser();
// }, []);
