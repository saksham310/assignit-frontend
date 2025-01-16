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
    // const image=user?.image ? user?.image : src ? src:'';
    const image=src ? src : user?.image ? user?.image : '';
    return (

            <Avatar className={cn(className?className:"")}>
                <AvatarImage src={image} />
                <AvatarFallback >{user?.username[0]}</AvatarFallback>
            </Avatar>

    )

}

export default UserAvatar;