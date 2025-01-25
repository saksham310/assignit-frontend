import {useMutation, useQueryClient} from "@tanstack/react-query";
import {login, register, sendOTP, verifyOTP} from "@/service/auth.service.ts";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";
import {AuthHookConfig, AuthResponse, LoginInput, RegisterInput} from "@/types/auth.type.ts";
import {setHeader} from "@/service/api.client.ts";



const useAuth=<T extends LoginInput|RegisterInput>({mutationFn,successMessage}:AuthHookConfig<T>)=>{
    const navigate=useNavigate();
    const queryClient = useQueryClient();
    const signIn = useSignIn();
    const handleSuccess=(res:AuthResponse)=>{
        {
            queryClient.invalidateQueries({queryKey:['workspaces','workspace analytics']});
            if (signIn({
                auth: {
                    token: res.token,
                    type: 'Bearer'
                },
                userState: res.user
            })){
                setHeader(`Bearer ${res.token}`);
                toast.success(successMessage, {
                    duration: 2000,
                });
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            }
        }
    }
    return useMutation({mutationFn,onSuccess:handleSuccess});
}
export const useLogin=()=>{
    return useAuth<LoginInput>({
        mutationFn:login,
        successMessage:"Logged in Successfully"
    });
}

export const useRegister=()=>{
    return useAuth<RegisterInput>({
        mutationFn:register,
        successMessage:"Registered successfully"
    });
}

export  const useGetOTP=()=>{
    return useMutation({
        mutationFn:sendOTP

    })
}

export const useVerifyOTP=()=>{
    return useMutation({
        mutationFn:verifyOTP,
    })
}