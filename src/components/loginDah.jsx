import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function LoginDash() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post("https://e-commerce-backend-zymt.onrender.com/login/user", {
      userName,
      password
    }, {
      withCredentials: true
    })
    .then((res) => {
      if (res.data.error) {
        alert("Incorrect password or username");
      } else {
        alert("Success login");
        localStorage.setItem("admin", JSON.stringify(res.data));
        navigate("/dash"); // ✅ redirect only if success
      }
    })
    .catch((err) => {
      console.error(err);
      alert("Login failed");
    });
  };

  return (
    <div className="flex justify-center">
      <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleLogin} className="space-y-5 bg-blue-400 w-[600px] h-[400px] rounded-lg p-28">
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-[380px] text-2xl h-10 rounded-md pl-4 py-4"
            type="text"
            placeholder="Enter User Name"
          />
          <br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[380px] text-2xl h-10 rounded-md pl-4 py-4"
            type="password"
            placeholder="Enter User Password"
          />
          <br />
          <button
            type="submit"
            className="bg-white text-2xl font-semibold text-black w-32 h-10 mt-8 ml-32 rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginDash;
