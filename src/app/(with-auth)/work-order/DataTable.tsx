"use client";

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import type { Table as TabelType } from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, Cog, EllipsisVertical, Eye, Pencil } from "lucide-react";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import FilterForm from "./FilterForm";
import { WorkOrder } from "@/lib/entities/models/work-order.model";
import {
    format,
    isAfter,
    isBefore,
    isWithinInterval,
    parseISO,
} from "date-fns";
import { UserRole } from "@/lib/entities/models/user.model";
import useRoleCheck from "@/hooks/use-role-check";

const columnsList: ColumnDef<WorkOrder, any>[] = [
    {
        accessorKey: "wo_num",
        header: "No. Work Order",
    },
    {
        accessorKey: "product_name",
        header: "Product name",
    },
    {
        accessorKey: "quantity",
        header: "Quantity",
    },
    {
        id: "result_quantity",
        accessorKey: "result_quantity",
        header: "Result Quantity",
    },
    {
        id: "deadline",
        accessorKey: "deadline",
        header: "Deadline",
        cell: (props) => {
            return format(props.row.original.deadline, "EEEE, d MMMM yyyy");
        },
        filterFn: (
            row,
            columnId,
            filterValue: { startDate?: string; endDate?: string }
        ) => {
            const rawValue = row.original.deadline;
            if (!rawValue) return false;

            const rowDate = rawValue;
            const { startDate, endDate } = filterValue;

            if (!startDate && !endDate) return true;

            if (startDate && !endDate) {
                return (
                    isAfter(rowDate, parseISO(startDate)) ||
                    rowDate.getTime() === parseISO(startDate).getTime()
                );
            }

            if (!startDate && endDate) {
                return (
                    isBefore(rowDate, parseISO(endDate)) ||
                    rowDate.getTime() === parseISO(endDate).getTime()
                );
            }

            if (startDate && endDate) {
                return isWithinInterval(rowDate, {
                    start: parseISO(startDate),
                    end: parseISO(endDate),
                });
            } else {
                return true;
            }
        },
    },
    {
        id: "assigned_to",
        accessorKey: "assigned_to.name",
        header: "Assigned to",
        filterFn: (row, columnId, filterValue?: string) => {
            const asignmentId = row.original.assigned_to.id;
            if (!filterValue) {
                return true;
            }
            return asignmentId === filterValue;
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: (props) => {
            return (
                <span
                    className={`px-2 py-1 rounded-full text-xs uppercase ${
                        props.row.original.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : props.row.original.status === "IN_PROGRESS"
                            ? "bg-blue-100 text-blue-800"
                            : props.row.original.status === "COMPLETED"
                            ? "bg-green-100 text-green-800"
                            : props.row.original.status === "CANCELED"
                            ? "bg-red-100 text-red-800"
                            : ""
                    }`}
                >
                    {props.row.original.status}
                </span>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: (props) => {
            const isProductionMager = useRoleCheck(UserRole.PRODUCTION_MANAGER);
            const isOperator = useRoleCheck(UserRole.OPERATOR);
            return (
                <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm" asChild>
                        <Link
                            href={`/work-order/${props.row.original.id}/view`}
                        >
                            <Eye />
                            View
                        </Link>
                    </Button>
                    {isProductionMager && (
                        <Button variant="default" size="sm" asChild>
                            <Link
                                href={`/work-order/${props.row.original.id}/edit`}
                            >
                                <Pencil /> Edit
                            </Link>
                        </Button>
                    )}
                    {isOperator && (
                        <Button variant="primary" size="sm" asChild>
                            <Link
                                href={`/work-order/${props.row.original.id}/process`}
                            >
                                <Cog /> Process
                            </Link>
                        </Button>
                    )}
                </div>
            );
        },
    },
];

interface DataTableProps {
    data: WorkOrder[];
}

export type TableFilterType = {
    start_date?: string;
    end_date?: string;
    assigned_to?: string;
};

function TableActionHeader({
    table,
    onFilterChange,
}: {
    table: TabelType<WorkOrder>;
    onFilterChange: (filter: TableFilterType) => void;
}) {
    const isProductionMager = useRoleCheck(UserRole.PRODUCTION_MANAGER);
    const isOperator = useRoleCheck(UserRole.OPERATOR);

    return (
        <div className="flex items-center justify-between py-4">
            <Input
                placeholder="Find work order number"
                value={
                    (table.getColumn("wo_num")?.getFilterValue() as string) ??
                    ""
                }
                onChange={(event) =>
                    table
                        .getColumn("wo_num")
                        ?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
            />
            <div className="flex items-center gap-2">
                <FilterForm onFilterChange={onFilterChange} />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            Columns <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <EllipsisVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {isProductionMager && (
                            <>
                                <DropdownMenuItem asChild>
                                    <Link href="/work-order/create">
                                        Create work Order
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    Management Report
                                </DropdownMenuItem>
                            </>
                        )}
                        {isOperator && (
                            <DropdownMenuItem>Operator Report</DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}

export default function DataTable({ data }: DataTableProps) {
    const [sorting, setSorting] = useState<SortingState>([]);

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
        result_quantity: false,
    });
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data,
        columns: columnsList,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    const onFilterChange = (filter: TableFilterType) => {
        table.getColumn("deadline")?.setFilterValue({
            startDate: filter.start_date,
            endDate: filter.end_date,
        });
        table.getColumn("assigned_to")?.setFilterValue(filter.assigned_to);
    };

    return (
        <div className="w-full">
            <TableActionHeader table={table} onFilterChange={onFilterChange} />
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columnsList.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
