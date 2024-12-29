import {useMutation} from "@tanstack/react-query";
import {login, register} from "@/service/authService.ts";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";
import {AuthHookConfig, AuthResponse, LoginInput, RegisterInput} from "@/types/auth.type.ts";



const useAuth=<T extends LoginInput|RegisterInput>({mutationFn,successMessage}:AuthHookConfig<T>)=>{
    const navigate=useNavigate();
    const signIn = useSignIn();
    const handleSuccess=(res:AuthResponse)=>{
        {
            if (signIn({
                auth: {
                    token: res.token,
                    type: 'Bearer'
                },
                userState: res.user
            })){
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