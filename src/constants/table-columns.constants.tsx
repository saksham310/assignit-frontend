import { cn } from "@/lib/utils"
import type { ColumnDef, Row } from "@tanstack/react-table"
import {
    AlertTriangle,
    Calendar,
    CheckCircle2,
    ChevronDown,
    CircleDashed,
    Clock,
    Edit,
    Eye,
    MoreHorizontal,
    Target,
    ThumbsUp,
    Trash2
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem, DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import UserAvatar from "@/components/custom-components/shared/UserAvatar.tsx"
import type { MembersData } from "@/types/workspace.type.ts"
import {PROJECT_ROLES, WORKSPACE_ROLES} from "@/constants/roles.constants.ts";
import {useWorkspaceRoleStore} from "@/store/workspace.store.ts";
import {Progress} from "@/components/ui/progress.tsx";
import { Card } from "@/components/ui/card"

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
            header: () => <span className={'pl-4'}>Name</span>,
            size: 255,
            cell: ({ row }) => {
                const member = row.original
                return (
                    <div className="flex items-center gap-3 pl-4">
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


                // If user can't edit roles, just show a badge
                if (!isAdminOwner || isOwnerOrSameRole) {
                    return (
                        <Badge variant="outline" className={`font-medium text-gray-500`}>
                            {role.split("_").join(" ")}
                        </Badge>
                    )
                }

                // Otherwise, show an interactive dropdown
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline"
                                className={cn("h-6 font-medium text-gray-500 text-xs px-2 w-fit py-1 flex items-center gap-1 hover:bg-muted/50")}
                            >
                                <span>{role.split("_").join(" ")}</span>
                                <ChevronDown className="h-3 w-3 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-48">
                            <DropdownMenuRadioGroup value={role.split('_').join(' ')} onValueChange={(value) => handleEditMember(row.original.id, value)}>
                                {roles.map((roleOption) => (
                                    <DropdownMenuRadioItem
                                        key={roleOption}
                                        value={roleOption}
                                        disabled={roleOption === "Owner"}
                                        className="cursor-pointer"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className={roleOption === role.split('_').join(' ') ? "font-medium" : ""}>{roleOption}</span>
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
            header: "Joined On",
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
interface ProjectColumnOptions {
    onView: (id: string) => void
    onEdit: (id: string) => void
}

export const useProjectColumns = (options: ProjectColumnOptions): ColumnDef<any>[] => {
    return [
        {
            accessorKey: "name",
            header: () => <span className="pl-4">Project Name</span>,
            size: 250,
            cell: ({ row }) => {
                const project = row.original
                const progress = Math.round((project.completed / project.tasks) * 100) || 0

                return (
                    <div className="flex items-center gap-3 pl-4">
                        <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary`}
                        >
                            <span className="font-semibold text-lg ">{project.name.charAt(0)}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium">{project.name}</span>
                            <div className="flex items-center gap-1 mt-1">
                                <Progress value={progress} className="h-1.5 w-24" />
                                <span className="text-xs text-muted-foreground">{progress}%</span>
                            </div>
                        </div>
                    </div>
                )
            },
        },
        {
            accessorKey: "completed",
            header: "Completed",
            size: 120,
            cell: ({ row }) => {
                const completed = row.original.completed

                return (
                    <div className="flex items-center gap-2">
                        <Badge
                            variant="outline"
                            className="bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1"
                        >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>{completed}</span>
                        </Badge>
                    </div>
                )
            },
        },
        {
            accessorKey: "inProgress",
            header: "In Progress",
            size: 120,
            cell: ({ row }) => {
                const inProgress = row.original.inProgress

                return (
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{inProgress}</span>
                        </Badge>
                    </div>
                )
            },
        },
        {
            accessorKey: "toDo",
            header: "To Do",
            size: 120,
            cell: ({ row }) => {
                const toDo = row.original.toDo

                return (
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-50 text-gray-700 border-gray-200 flex items-center gap-1">
                            <CircleDashed className="h-3.5 w-3.5" />
                            <span>{toDo}</span>
                        </Badge>
                    </div>
                )
            },
        },
        {
            accessorKey: "dueDate",
            header: "Due Date",
            size: 150,
            cell: ({ row }) => {
                const dueDate = new Date(row.original.dueDate)
                const now = new Date()
                const isPastDue = dueDate < now

                return (
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 " />
                        <span className={isPastDue ? "text-rose-600 font-medium" : "text-gray-600"}>
              {dueDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
              })}
            </span>
                    </div>
                )
            },
        },
        {
            id: "actions",
            header: "",
            size: 70,
            cell: ({ row }) => {
                const isPm = row.original.role === 'Project_Manager'
                return (
                    <div className="flex justify-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => options.onView(row.original.id)}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    <span>View Details</span>
                                </DropdownMenuItem>
                                {isPm && (
                                    <>
                                        <DropdownMenuItem onClick={() => options.onEdit(row.original.id)}>
                                            <Edit className="mr-2 h-4 w-4" />
                                            <span>Edit Project</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                    </>
                                )}

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )
            },
        },
    ]
}
export const useGetRetrospectiveColumns = (): ColumnDef<any>[] => {
    return [
      
        {
            accessorKey: "wentWell",
            header: ({ table }) => (
                <div className="w-full flex justify-between gap-1">
                    <span className="font-medium">What Went Well</span>
                    <span className="text-xs text-muted-foreground">
                        {table.getFilteredRowModel().rows.length} responses
                    </span>
                </div>
            ),
            cell: ({ row }) => (
                <div className="p-4">
                    <p className="text-sm text-gray-700">{row.original.wentWell}</p>
                </div>
            ),
        },
        {
            accessorKey: "toImprove",
            header: ({ table }) => (
                <div className="w-full flex justify-between gap-1">
                    <span className="font-medium">To Improve</span>
                    <span className="text-xs text-muted-foreground">
                        {table.getFilteredRowModel().rows.length} responses
                    </span>
                </div>
            ),
            cell: ({ row }) => (
                <div className="p-4 border-x">
                    <p className="text-sm text-gray-700">{row.original.toImprove}</p>
                </div>
            ),
        },
        {
            accessorKey: "actionItems",
            header: ({ table }) => (
                <div className="w-full flex justify-between gap-1">
                    <span className="font-medium">Action Items</span>
                    <span className="text-xs text-muted-foreground">
                        {table.getFilteredRowModel().rows.length} responses
                    </span>
                </div>
            ),
            cell: ({ row }) => (
                <div className="p-4">
                    <p className="text-sm text-gray-700">{row.original.actionItems}</p>
                </div>
            ),
        },
    ]
}