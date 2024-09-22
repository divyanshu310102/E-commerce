import CommonForm from "@/components/common/CommonForm";
import { loginFormControls } from "@/config";
import { loginUser } from "@/features/authSlice";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate()

  function onSubmit(event) {
    event.preventDefault();
    
    // Basic validation
    // if (!formData.email || !formData.password) {
    //   toast({
    //     title: "Error",
    //     description: "Email and password are required.",
    //     variant: "destructive",
    //   });
    //   return;
    // }
    
    dispatch(loginUser(formData)).then((data) => {
      // console.log(data)
      if (data?.payload?.success) {
        toast({
          title:"Welcome Back!!",
          description: data?.payload?.message || "Logged in successfully!",
          variant: "success",
        });
        // navigate("/shop/home");
      } else {
        toast({
          title: "Almost there!!",
          description: data?.payload?.message || "Login failed",
          variant: "destructive",
        });
      }
    }).catch((error) => {
      // Handle unexpected errors
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    });
  }
  
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;