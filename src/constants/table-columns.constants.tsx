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
import {WORKSPACE_ROLES} from "@/constants/roles.constants.ts";
import {useWorkspaceRoleStore} from "@/store/workspace.store.ts";


export const getMembersColumns = (isAdminOwner: boolean, handleEditMember: (id: number, value: string) => void): ColumnDef<MembersData>[] => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const currentRole = useWorkspaceRoleStore((state) => state.currentRole);
    return [
        {accessorKey: "name", header: "Name", size: 80},
        {accessorKey: "email", header: "Email", size: 130},
        {accessorKey: "role", header: "Role", size: 75},
        {accessorKey: "joinDate", header: "Joined At", size: 63},
        ...(isAdminOwner
            ? [{
                id: "actions",
                header: "Actions",
                size: 30,
                cell: ({row}: { row: Row<MembersData> }) => {
                    const isOwnerOrSameRole = row.original.role === "Owner" || row.original.role == currentRole;
                    return (
                        <div className={'flex justify-center items-center'}>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild disabled={isOwnerOrSameRole}>
                                    <Button variant="ghost" size="icon"><EllipsisVertical
                                        className="h-4 w-4 "/></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuRadioGroup value={row.original.role}
                                                            onValueChange={(value) => handleEditMember(row.original.id, value)}>
                                        {WORKSPACE_ROLES.map((role) =>
                                            <DropdownMenuRadioItem value={role} disabled={isOwnerOrSameRole}
                                                                   className={'text-xs'} key={role}>
                                                {role}
                                            </DropdownMenuRadioItem>
                                        )}
                                        <DropdownMenuRadioItem value="Remove"
                                                               className={'text-red-700 text-xs'}>Remove</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu></div>
                    );
                },
            }]
            : [])
    ];
};
