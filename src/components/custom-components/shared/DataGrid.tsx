import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.tsx"
import {cn} from "@/lib/utils.ts";

interface DataTableProps<TData> {
    columns: ColumnDef<any>[]
    data: TData[]
}

export function DataGrid<TData>({
                                    columns,
                                    data,
                                }: DataTableProps<TData>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full">
                <div className="[&_table]:w-full">
                    <Table>
                        <TableHeader className="bg-background">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            className={cn('first:rounded-tl-lg last:rounded-tr-lg p-4')}
                                            style={{
                                                minWidth: header.column.columnDef.size,
                                                maxWidth: header.column.columnDef.size,
                                            }}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                    </Table>
                </div>
            </div>
            <div className="flex-grow overflow-y-auto scrollbar">
                <div className="[&_table]:w-full">
                    <Table>
                        <TableBody>
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                className="p-2"
                                                style={{
                                                    minWidth: cell.column.columnDef.size,
                                                    maxWidth: cell.column.columnDef.size,
                                                }}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

