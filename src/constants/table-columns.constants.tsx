import {ColumnDef, Row} from "@tanstack/react-table";
import {MembersData} from "@/types/workspace.type.ts";
import {Button} from "@/components/ui/button.tsx";
import {EllipsisVertical} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {TProjectSummary} from "@/types/dashboard.type.ts";
import {WORKSPACE_ROLES} from "@/constants/roles.constants.ts";
import {useWorkspaceRoleStore} from "@/store/workspace.store.ts";


export const getMembersColumns = (isAdminOwner: boolean, handleEditMember: (id: number, value: string) => void): ColumnDef<MembersData>[] => {
    const currentRole = useWorkspaceRoleStore((state) => state.currentRole);
    return [
        {accessorKey: "name", header: "Name", size: 80},
        {accessorKey: "email", header: "Email", size: 130},
        {accessorKey: "role", header: "Role", size: 85},
        {accessorKey: "joinDate", header: "Joined At", size: 73},
        ...(isAdminOwner
            ? [{
                id: "actions",
                header: "Actions",
                size:20,
                cell: ({row}: { row: Row<MembersData> }) => {
                    const isOwnerOrSameRole = row.original.role === "Owner" || row.original.role == currentRole;
                    return (
                        <div className={'flex justify-center items-center'}>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild disabled={isOwnerOrSameRole}  >
                                    <Button  variant="ghost" size="icon"><EllipsisVertical className="h-4 w-4 "/></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuRadioGroup value={row.original.role}
                                                            onValueChange={(value) => handleEditMember(row.original.id, value)}>
                                        {WORKSPACE_ROLES.map((role) =>
                                            <DropdownMenuRadioItem value={role} disabled={isOwnerOrSameRole}>
                                                {role}
                                            </DropdownMenuRadioItem>
                                        )}
                                        <DropdownMenuRadioItem value="Remove" className={'text-red-700'}>Remove</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu></div>
                    );
                },
            }]
            : [])
    ];
};

export const projectColumns: ColumnDef<TProjectSummary>[] = [
    {accessorKey: "projectName", header: "Name", size: 150},
    {accessorKey: "startDate", header: "Start Date", size: 96},
    {accessorKey: "endDate", header: "End Date", size: 122},
    {accessorKey: "progress", header: "Task Progress"},
];