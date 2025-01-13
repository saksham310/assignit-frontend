import {Avatar,AvatarImage,AvatarFallback} from "@/components/ui/avatar.tsx";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {User} from "@/types/auth.type.ts";
import {cn} from "@/lib/utils.ts";

interface UserAvatarProps {
    className?: string;
    src?:string;
}
const UserAvatar=({className,src}:UserAvatarProps)=>{
    const user=useAuthUser<User>();
    return (

            <Avatar className={cn(className?className:"")}>
                <AvatarImage src={src ? src : ''} />
                <AvatarFallback >{user?.username[0]}</AvatarFallback>
            </Avatar>

    )

}

export default UserAvatar;