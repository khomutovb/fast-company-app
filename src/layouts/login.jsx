import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );
    const toogleFormType = () => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };
    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {formType === "register" ? (
                        <>
                            <h3 className="mb-4">Регистрация</h3>
                            <RegisterForm />
                            <p className="mt-4">
                                Already have account?{" "}
                                <button className="mx-2 btn btn-primary" role="button" onClick={toogleFormType}>
                                    Sign In
                                </button>
                            </p>
                        </>
                    ) : (
                        <>
                            <h3 className="mb-4">Логин</h3>
                            <LoginForm />
                            <p className="mt-4">
                                Dont have account?{" "}
                                <button className="mx-2 btn btn-primary" role="button" onClick={toogleFormType}>
                                    Sign Up
                                </button>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
