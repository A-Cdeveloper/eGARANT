import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "../ui/skeleton";

export default function TableSkeleton({ n }: { n: number }) {
  return (
    <>
      {/* Table with Fixed Header */}
      <Table className="w-full border-collapse">
        {/* Sticky Header */}
        <TableHeader className="hidden sm:table-header-group">
          <TableRow>
            {Array.from({ length: n }).map((_, index) => (
              <TableHead key={index} className="h-[35px] px-3 py-1 bg-white">
                <Skeleton className="w-[100px] h-[20px] rounded-md bg-gray-200" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
      </Table>

      {/* Scrollable Table Body */}
      <div>
        <Table className="w-full border-collapse">
          <TableBody className="bg-white">
            {Array.from({ length: n }).map((_, index) => (
              <TableRow
                key={index}
                className="block sm:table-row border-b border-gray-200 rounded-lg md:border-1"
              >
                <TableCell className="block sm:table-cell px-3 py-2 before:block sm:before:hidden before:mb-1 min-w-[100%] sm:min-w-0">
                  <Skeleton className="w-full h-[20px] bg-gray-200 rounded-md" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
