"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TableComponentProps<T> = {
  data: T[];
  columns: ColumnDef<T, unknown>[];
};

export default function TableComponent<T>({
  data,
  columns,
}: TableComponentProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      {/* Table with Fixed Header */}
      <Table className="w-full border-collapse">
        {/* Sticky Header */}
        <TableHeader className="hidden sm:table-header-group bg-primary sticky top-0 -z-1">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-primary">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  style={{ width: header.getSize() }}
                  className="text-white h-[35px] px-3 py-1 bg-primary"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
      </Table>

      {/* Scrollable Table Body */}
      <div className="max-h-[80vh] overflow-auto">
        <Table className="w-full border-collapse">
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="block sm:table-row border-b border-gray-200 rounded-lg md:border-1 bg-white my-10"
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                      className="block sm:table-cell px-3 py-2  before:block sm:before:hidden before:mb-1 min-w-[100%] sm:min-w-0"
                    >
                      <>
                        <span className="font-semibold block sm:hidden border-b border-gray-200 mb-2 pb-2">
                          {cell.column.columnDef.header?.toString()}
                        </span>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
