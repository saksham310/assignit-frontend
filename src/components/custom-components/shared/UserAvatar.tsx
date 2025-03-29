import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar.tsx";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {User} from "@/types/auth.type.ts";
import {cn} from "@/lib/utils.ts";

interface UserAvatarProps {
    className?: string;
    src?: string;
    name?: string;
    avatarColor?: string | null;
}

const UserAvatar = ({className, src, name,avatarColor}: UserAvatarProps) => {
    const user = useAuthUser<User>();
    const image = src ? src : user?.image ? user?.image : '';
    const username = name ? name : user?.username ? user?.username : ''
    const color = avatarColor ? avatarColor : ''
    return (

        <Avatar className={cn(className ? className : "")}>
            <AvatarImage src={image}/>
            <AvatarFallback
            style={{background:color}}
            >{username[0].toUpperCase()}</AvatarFallback>
        </Avatar>

    )

}

export default UserAvatar;