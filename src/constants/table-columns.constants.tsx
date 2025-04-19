import { cn } from "@/lib/utils"
import type { ColumnDef, Row } from "@tanstack/react-table"
import { Check, ChevronDown, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import UserAvatar from "@/components/custom-components/shared/UserAvatar.tsx"
import type { MembersData } from "@/types/workspace.type.ts"
import {PROJECT_ROLES, WORKSPACE_ROLES} from "@/constants/roles.constants.ts";
import {useWorkspaceRoleStore} from "@/store/workspace.store.ts";

export const useGetMembersColumns = (
    isWorkspace: boolean,
    isAdminOwner: boolean,
    handleEditMember: (id: number, value: string) => void,
): ColumnDef<MembersData>[] => {
    const currentRole = useWorkspaceRoleStore((state) => state.currentRole);
    const roles = isWorkspace ? WORKSPACE_ROLES : PROJECT_ROLES;
    return [
        {
            accessorKey: "name",
            header: "Name",
            size: 200,
            cell: ({ row }) => {
                const member = row.original
                return (
                    <div className="flex items-center gap-3">
                        <UserAvatar src={member?.imageUrl} avatarColor={member?.avatarColor} name={member?.name} />
                        <div className="flex flex-col">
                            <span className="font-medium">{member.name}</span>
                            <span className="text-xs text-gray-500">{member.email}</span>
                        </div>
                    </div>
                )
            },
        },
        {
            accessorKey: "role",
            header: "Role",
            size: 150,
            cell: ({ row }) => {
                const role = row.original.role
                const isOwnerOrSameRole = role === "Owner" || role === currentRole
                const canEditRoles = isAdminOwner || role === "Project_Manager"


                // If user can't edit roles, just show a badge
                if (!canEditRoles || isOwnerOrSameRole) {
                    return (
                        <Badge variant="outline" className={`font-medium`}>
                            {role.split("_").join(" ")}
                        </Badge>
                    )
                }

                // Otherwise, show an interactive dropdown
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline"
                                className={cn("h-6 font-medium  text-xs px-2 w-fit py-1 flex items-center gap-1 hover:bg-muted/50")}
                            >
                                <span>{role.split("_").join(" ")}</span>
                                <ChevronDown className="h-3 w-3 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-48">
                            <DropdownMenuRadioGroup value={role} onValueChange={(value) => handleEditMember(row.original.id, value)}>
                                {roles.map((roleOption) => (
                                    <DropdownMenuRadioItem
                                        key={roleOption}
                                        value={roleOption}
                                        disabled={roleOption === "Owner"}
                                        className="cursor-pointer"
                                    >
                                        <div className="flex items-center gap-2">
                                            {roleOption === role && <Check className="h-4 w-4 text-primary" />}
                                            <span className={roleOption === role ? "font-medium" : ""}>{roleOption}</span>
                                        </div>
                                    </DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
        {
            accessorKey: "joinDate",
            header: "Joined At",
            size: 150,
            cell: ({ row }) => {
                const date = new Date(row.original.joinDate)
                return (
                    <span className="text-gray-500">
            {date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            })}
          </span>
                )
            },
        },
        ...(isAdminOwner
            ? [
                {
                    id: "actions",
                    header: "",
                    size: 50,
                    cell: ({ row }: { row: Row<MembersData> }) => {
                        const isOwnerOrSameRole = row.original.role === "Owner" || row.original.role === currentRole
                        const canRemoveUser = isAdminOwner || row.original.role === "Project_Manager"

                        if (!canRemoveUser || isOwnerOrSameRole) return null

                        return (
                            <div className="flex justify-center">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                    onClick={() => handleEditMember(row.original.id, "Remove")}
                                >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Remove member</span>
                                </Button>
                            </div>
                        )
                    },
                },
            ]
            : []),
    ]
}
