import { cn } from "@/lib/utils"

import type { ColumnDef, Row } from "@tanstack/react-table"
import { EllipsisVertical, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import UserAvatar from "@/components/custom-components/shared/UserAvatar.tsx";
import {MembersData} from "@/types/workspace.type.ts";



export const getMembersColumns = (
    isWorkspace: boolean,
    isAdminOwner: boolean,
    handleEditMember: (id: number, value: string) => void,
): ColumnDef<MembersData>[] => {
    const roles = isWorkspace ? ["Owner", "Admin", "Member"] : ["Owner", "Editor", "Viewer"]

    return [
        {
            accessorKey: "name",
            header: "Name",
            size: 200,
            cell: ({ row }) => {
                const member = row.original
                return (
                    <div className="flex items-center gap-3">
                       <UserAvatar src={member?.imageUrl} avatarColor={member?.avatarColor}  name={member?.name} />
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

                let color = "bg-primary"
                if (role === "Owner") color = "bg-primary/10 text-primary"
                else if (role === "Admin" || role === "Editor") color = "bg-blue-500/10 text-blue-500"

                return (
                    <Badge variant="outline" className={`${color} font-medium`}>
                        {role.split("_").join(" ")}
                    </Badge>
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
                    header: "Actions",
                    size: 70,
                    cell: ({ row }: { row: Row<MembersData> }) => {
                        const isOwnerOrSameRole = row.original.role === "Owner" || row.original.role === "currentRole"

                        return (
                            <div className="flex justify-end">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild disabled={isOwnerOrSameRole}>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className={cn(
                                                            "h-8 w-8 p-0",
                                                            isOwnerOrSameRole ? "opacity-50 cursor-not-allowed" : "hover:bg-muted",
                                                        )}
                                                    >
                                                        <EllipsisVertical className="h-4 w-4" />
                                                        <span className="sr-only">Open menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-56">
                                                    <DropdownMenuRadioGroup
                                                        value={row.original.role}
                                                        onValueChange={(value) => handleEditMember(row.original.id, value)}
                                                    >
                                                        {roles.map((role) => (
                                                            <DropdownMenuRadioItem
                                                                key={role}
                                                                value={role}
                                                                disabled={isOwnerOrSameRole}
                                                                className="cursor-pointer"
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    {role === row.original.role && <Check className="h-4 w-4 text-primary" />}
                                                                    <span className={role === row.original.role ? "font-medium" : ""}>{role}</span>
                                                                </div>
                                                            </DropdownMenuRadioItem>
                                                        ))}
                                                    </DropdownMenuRadioGroup>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        onClick={() => handleEditMember(row.original.id, "Remove")}
                                                        disabled={isOwnerOrSameRole}
                                                        className="text-destructive focus:text-destructive cursor-pointer"
                                                    >
                                                        Remove member
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TooltipTrigger>
                                        <TooltipContent side="left">
                                            <p>Manage member</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        )
                    },
                },
            ]
            : []),
    ]
}
