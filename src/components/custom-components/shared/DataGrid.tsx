import { useState } from "react"
import {
    type ColumnDef,
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
} from "@tanstack/react-table"
import { Search } from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import UserProfileAnalytics from "@/pages/UserProfileAnalytics.tsx";
import {useDialogStore} from "@/store/dialog.store.ts";

interface DataTableProps<TData> {
    columns: ColumnDef<any>[]
    data: TData[]
    search?: boolean
    searchValue?: string
    dbClick?:boolean
}

export function DataGrid<TData>({ columns, data, search = false, searchValue = "" ,dbClick = false}: DataTableProps<TData>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [sorting, setSorting] = useState<SortingState>([])
    const setOpen = useDialogStore(state => state.openDialog)
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        state: {
            columnFilters,
            sorting,
        },
    })
    const handleDbClick = (value:number) =>{
        if(!dbClick) return;
        setOpen(()=>UserProfileAnalytics(value))
    }
    return (
        <div className="w-full h-full flex flex-col gap-3">
            {search && (
                <div className="relative w-full md:w-[260px] mb-4">
                    <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                        className="w-full md:w-[260px] text-xs h-[35px] pl-8"
                        value={(table.getColumn(searchValue)?.getFilterValue() as string) ?? ""}
                        onChange={(event) => table.getColumn(searchValue)?.setFilterValue(event.target.value)}
                        placeholder={`Search by ${searchValue}`}
                    />
                </div>
            )}
            <div className="w-full overflow-auto scrollbar [&::-webkit-scrollbar-track]:mt-[3.5rem]">
                <div className="[&_table]:w-full">
                    <Table>
                        <TableHeader className="bg-[#F5F3FF]  sticky top-0 z-10">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            className={cn(
                                                "first:rounded-tl-lg last:rounded-tr-lg p-4 text-gray-800 text-xs font-medium",
                                                header.column.getCanSort() && "cursor-pointer select-none",
                                            )}
                                            onClick={header.column.getToggleSortingHandler()}
                                            style={{
                                                minWidth: header.column.columnDef.size,
                                                maxWidth: header.column.columnDef.size,
                                            }}
                                        >
                                            <div className="flex items-center gap-1">
                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                                {header.column.getCanSort() && (
                                                    <span className="ml-1 text-xs opacity-70">
                            {header.column.getIsSorted() === "asc"
                                ? "↑"
                                : header.column.getIsSorted() === "desc"
                                    ? "↓"
                                    : ""}
                          </span>
                                                )}
                                            </div>
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        className="hover:bg-muted/30 transition-colors"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                className="p-2 text-xs border-b"
                                                style={{
                                                    minWidth: cell.column.columnDef.size,
                                                    maxWidth: cell.column.columnDef.size,
                                                }}
                                                onDoubleClick={() => handleDbClick(cell.row.original.id)}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="text-center text-xs py-6">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
