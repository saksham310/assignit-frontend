import {useMutation} from "@tanstack/react-query";
import {login, register} from "@/service/authService.ts";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import {toast} from "sonner";



export const useLogin=()=>{
    const signIn = useSignIn();
    return useMutation({
        mutationFn: login,
        onSuccess: (res) => {
            console.log("data",res);
            if (signIn({
                auth: {
                    token: res.token,
                    type: 'Bearer'
                },
                userState: res.user
            })){
                toast.success("Logged in successfully", {
                    duration: 2000,
                });
            }
                }
    })
}

export const useRegister=()=>{
    const signIn = useSignIn();
    return useMutation({
        mutationFn: register,
        onSuccess: (res) => {
            console.log("data",res);
            if (signIn({
                auth: {
                    token: res.token,
                    type: 'Bearer'
                },
                userState: res.user
            })){
                toast.success("Registered successfully", {
                    duration: 2000,
                });
            }
        }
    })
}