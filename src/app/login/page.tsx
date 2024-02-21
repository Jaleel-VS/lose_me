"use client";
import SubmitButton from "@/components/Button";
import InputField from "@/components/InputField";
import { BALLOT_ROUTE, REGISTER_ROUTE } from "@/constants/routes";
import Link from "next/link";
import {auth} from '@/util/firebase';
import { loginValidation } from "@/validationSchema/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { login } from "../_auth/auth-handler";
import { useState } from "react";

const Login = () => {
    const [loading, setLoading] = useState(false);
    
    const { handleSubmit, register, formState:{errors}} = loginValidation();
    const router = useRouter();
    const submitForm = (values:any) => {
        login(values.email, values.password).then((user) => {
            router.push(BALLOT_ROUTE);
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="w-1/2 rounded-md bg-white/30 shadow-lg flex justify-between flex-col">
                <div className="h-28 w-full justify-center flex items-center">
                    <span className="text-3xl rounded-lg">Please sign in to cast your vote</span>
                </div>
                <form onSubmit={handleSubmit(submitForm)} className="h-full w-1/2 mx-auto ">
                    <InputField
                        register={register}
                        error={errors.email}
                        type="text"
                        placeholder="Enter Your Email Here..."
                        name="email"
                        label="Email"
                    />
                    <InputField
                        register={register}
                        error={errors.password}
                        type="password"
                        placeholder="Enter Your Password Here..."
                        name="password"
                        label="Password"
                    />
                    <SubmitButton label="Submit" />
                </form>
                <div className="h-20 mx-auto">
                    <span className="text-sm text-gray-600">Dont have an account?  
                        <Link href={REGISTER_ROUTE}><span className="text-blue-500 text-md">Register here to vote</span></Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Login;