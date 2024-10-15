import CommonForm from "@/components/common/CommonForm.jsx";
import { registerFormControls } from "@/config/index.js";
import { registerUser } from "@/features/authSlice/index.jsx";
import {  useToast } from "@/hooks/use-toast";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  // console.log(formData)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
  
    dispatch(registerUser(formData)).then((data) => {
      console.log(data);
  
      if (data?.payload?.success) {
        // Success toast
        toast({
          title: "Congratulations!!",
          description: data?.payload?.message || "Account created successfully!",
          variant: "success",
        });
        navigate("/auth/login");
      } else {
        // Handle errors
        const errorMessage = data?.payload?.message || "Registration failed";
        toast({
          title: "O... Oh!!",
          description: errorMessage,
          variant: "destructive",
        });
      }
    }).catch((error) => {
      // Handle any potential promise rejections
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    });
  }
  

  // console.log(formData);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;