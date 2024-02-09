import { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";

type TUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  password: string;
};
const page = "Home";
export const Home = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getUser = async () => {
    try {
      setError(null);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetch("http://localhost:3000/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const fetchedUsers = await response.json();
        setUsers(fetchedUsers);
        setIsPending(false);
      } else {
        const errorMessage = await response.text();
        setIsPending(false);
        setError(errorMessage || "Failed to fetch users");
      }
    } catch (error) {
      setIsPending(false);
      setError("Error during user data fetch");
      console.error("Error during user data fetch:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <Breadcrumb page={page} />
      <div className="content">
        {isPending && <h5>Loading</h5>}
        {error && <h5>{error}</h5>}
        {users.map((user) => (
          <div key={user.id}>
            <h2>Name: {user.name}</h2>
            <h2>Email: {user.email}</h2>
            <h2>Password: {user.password}</h2>
            <h2>Role: {user.role}</h2>
          </div>
        ))}
      </div>
    </>
  );
};
// const urlObject = { url: "http://localhost:3000/users" };
// const { id } = useParams();
// const { data: users, error, isPending } = useFetch(urlObject + id);
// const userEmail = localStorage.getItem("email")
// console.log(users,error,isPending);
