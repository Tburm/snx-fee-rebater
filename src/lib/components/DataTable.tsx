'use client';

import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from '@chakra-ui/react';
import { useReactTable, flexRender, getCoreRowModel, getSortedRowModel, createColumnHelper } from '@tanstack/react-table';
import * as React from 'react';

export type DataTableProps<Data extends object> = {
  data: Data[];
};

export function DataTable<Data extends object>({ data }: DataTableProps<Data>) {
  const columnHelper = createColumnHelper<Data>();

  const columns = [
    columnHelper.accessor('walletAddress', {
      cell: (info) => info.getValue(),
      header: 'Wallet Address',
    }),
    columnHelper.accessor('feesPaid', {
      cell: (info) => info.getValue(),
      header: 'Fees Paid',
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor('estimatedDistribution', {
      cell: (info) => info.getValue(),
      header: 'Estimated Distribution',
      meta: {
        isNumeric: true,
      },
    }),
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <Table size="sm">
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const { meta } = header.column.columnDef;
              return (
                <Th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  isNumeric={meta?.isNumeric}
                  py={3}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  <chakra.span pl="4">
                    {header.column.getIsSorted() ? (
                      header.column.getIsSorted() === 'desc' ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              );
            })}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => {
              const { meta } = cell.column.columnDef;
              return (
                <Td key={cell.id} isNumeric={meta?.isNumeric}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              );
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
