import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar.tsx";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {User} from "@/types/auth.type.ts";
import {cn} from "@/lib/utils.ts";

interface UserAvatarProps {
    className?: string;
    src?: string;
    name?: string;
}

const UserAvatar = ({className, src, name}: UserAvatarProps) => {
    const user = useAuthUser<User>();
    const image = src ? src : user?.image ? user?.image : '';
    const username = name ? name : user?.username ? user?.username : ''
    return (

        <Avatar className={cn(className ? className : "")}>
            <AvatarImage src={image}/>
            <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
        </Avatar>

    )

}

export default UserAvatar;