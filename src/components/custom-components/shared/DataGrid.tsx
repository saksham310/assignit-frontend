import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table.tsx"
import {cn} from "@/lib/utils.ts";
import {Input} from "@/components/ui/input.tsx";
import {useState} from "react";

interface DataTableProps<TData> {
    columns: ColumnDef<any>[]
    data: TData[],
    search?: boolean,
    searchValue?: string
}

export function DataGrid<TData>({
                                    columns,
                                    data,
    search =false, searchValue = ''
                                }: DataTableProps<TData>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        state: {
            columnFilters,
        },
    });

    return (
        <>
            <div className="w-full h-full flex flex-col gap-3  ">
                {search &&
                    ( <Input className={'w-full md:w-[260px] text-xs h-[35px]'}
                             value={(table.getColumn(searchValue)?.getFilterValue() as string) ?? ""}
                             onChange={(event) =>
                                 table.getColumn(searchValue)?.setFilterValue(event.target.value)

                             }
                             placeholder={`Search by ${searchValue}`}
                           />
                    )
                }
                <div className="w-full overflow-auto scrollbar [&::-webkit-scrollbar-track]:mt-[3.5rem]
">
                    <div className="[&_table]:w-full ">
                        <Table>
                            <TableHeader className="bg-secondary sticky top-0 z-10  ">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead
                                                key={header.id}
                                                className={cn('first:rounded-tl-lg last:rounded-tr-lg p-4 text-black')}
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
                                                    className="p-2 text-xs border-b"
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
        </>
    );
}

