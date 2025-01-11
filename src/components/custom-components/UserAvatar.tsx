import {Avatar,AvatarImage,AvatarFallback} from "@/components/ui/avatar.tsx";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {User} from "@/types/auth.type.ts";

const UserAvatar=()=>{
    const user=useAuthUser<User>();
    return (
        <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>{user?.username[0]}</AvatarFallback>
        </Avatar>
    )

}

export default UserAvatar;