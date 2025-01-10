
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
} from "@/components/ui/table"
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
            // <Table className='rounded-lg  table-fixed '>
            //     <TableHeader className=" bg-secondary text-primary-foreground  hover:bg-secondary">
            //         {table.getHeaderGroups().map((headerGroup) => (
            //             <TableRow key={headerGroup.id}>
            //                 {headerGroup.headers.map((header) =>{
            //
            //                       return  <TableHead key={header.id} className={cn(
            //                           'first:rounded-tl-lg last:rounded-tr-lg ')}>
            //                             {header.isPlaceholder
            //                                 ? null
            //                                 : flexRender(
            //                                     header.column.columnDef.header,
            //                                     header.getContext()
            //                                 )}
            //                         </TableHead>
            //
            //                 })}
            //             </TableRow>
            //         ))}
            //     </TableHeader>
            //     <TableBody>
            //         {table.getRowModel().rows?.length ? (
            //             table.getRowModel().rows.map((row) => (
            //                 <TableRow
            //                     key={row.id}
            //                     data-state={row.getIsSelected() && "selected"}
            //                 >
            //                     {row.getVisibleCells().map((cell) => (
            //                         <TableCell key={cell.id} >
            //                             {flexRender(cell.column.columnDef.cell, cell.getContext())}
            //                         </TableCell>
            //                     ))}
            //                 </TableRow>
            //             ))
            //         ) : (
            //             <TableRow>
            //                 <TableCell colSpan={columns.length} className=" text-center">
            //                     No results.
            //                 </TableCell>
            //             </TableRow>
            //         )}
            //     </TableBody>
            // </Table>
        <Table className='rounded-lg table-fixed overflow-y-auto'>
            <TableHeader className=" text-primary-foreground hover:bg-secondary">
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <TableHead key={header.id} className={cn('first:rounded-tl-lg last:rounded-tr-lg')}>
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
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                            className="mb-4"  // Adds margin bottom to each row
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id} className="p-4"> {/* Adds padding inside cells */}
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
    );
}