import { useState } from "react";

import { useLocation, useNavigate} from "react-router-dom";
import { RegForm } from "./RegForm";
import axios from "axios";
import { isLoggedIn } from "../../utils/isLoggedIn";



const Registration = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    surname: "",
    email: "",
    password: "",
    phone: "",
    role: pathname === "/register" ? "USER" : "ADMIN",
  });

  const user = isLoggedIn();
  
  const handleSubmit = async (event) => {

    event.preventDefault();
  try{
    const request = {...formData}
    await axios.post('http://localhost:8000/user',request);
    navigate("/login")
  }
  catch(err)
  {
    if(err.response)
    {
      // TODO ERROR FLASH
    }
    else{
      console.log(err);
      // TODO ERROR FLASH
     }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  if (pathname === "/admin/register" && user.role === "USER") {
    return <>
      <h1> 403 Unauthorized</h1>
      <a href="/">Home</a>
     </>
  }
  return (
    <RegForm formData={formData} handleSubmit={handleSubmit} handleChange={handleChange } />
  );
 
};

export default Registration;
