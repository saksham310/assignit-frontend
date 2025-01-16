import {useMutation} from "@tanstack/react-query";
import {updateProfile} from "@/service/user.service.ts";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import {toast} from "sonner";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {User} from "@/types/auth.type.ts";


export const useUpdateProfile=()=>{
    const auth=useAuthHeader();
    const user=useAuthUser<User>();
    const signIn=useSignIn();
    return useMutation({
        mutationFn:updateProfile,
        onSuccess:(data)=>{
            const updatedUser = {...user,...(data) };
            signIn({
                auth: {
                    token: auth ? auth.split(' ')[1] : '',
                    type: 'Bearer'
                },
                userState: updatedUser
            })
            toast.success("Profile updated successfully",{
                duration: 2000,
            });

        }
    })
}