'use client'

import { useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from '@tanstack/react-table'
import { ChevronUp, ChevronDown, Search, Database } from 'lucide-react'

export type StakingRecord = {
  id: string
  user: string
  amount: number
  action: 'Stake' | 'Withdraw'
  timestamp: string
  txHash: string
}

const STATIC_MOCK_DATA: StakingRecord[] = [
  { id: '1', user: '0x7a9b...3c2d', amount: 5000, action: 'Stake', timestamp: '04/23/2026, 10:30 AM', txHash: '0x1234567...abc' },
  { id: '2', user: '0x3f1e...8a4b', amount: 3200, action: 'Stake', timestamp: '04/23/2026, 09:15 AM', txHash: '0x2345678...def' },
  { id: '3', user: '0x9c2d...1e5f', amount: 15000, action: 'Withdraw', timestamp: '04/22/2026, 11:45 PM', txHash: '0x3456789...ghi' },
  { id: '4', user: '0xb4a6...7d8e', amount: 800, action: 'Stake', timestamp: '04/22/2026, 08:20 PM', txHash: '0x4567890...jkl' },
  { id: '5', user: '0x2e8f...6c1a', amount: 4200, action: 'Withdraw', timestamp: '04/22/2026, 03:10 PM', txHash: '0x5678901...mno' },
  { id: '6', user: '0x5d3b...9f7c', amount: 11000, action: 'Stake', timestamp: '04/21/2026, 07:30 AM', txHash: '0x6789012...pqr' },
  { id: '7', user: '0x1a7e...4b2d', amount: 600, action: 'Stake', timestamp: '04/20/2026, 01:45 PM', txHash: '0x7890123...stu' },
  { id: '8', user: '0x8f6c...3e9a', amount: 9500, action: 'Withdraw', timestamp: '04/19/2026, 09:00 AM', txHash: '0x8901234...vwx' },
  { id: '9', user: '0xc2d1...5b8f', amount: 2300, action: 'Stake', timestamp: '04/18/2026, 05:20 PM', txHash: '0x9012345...yza' },
  { id: '10', user: '0xe4a7...2c6b', amount: 6700, action: 'Withdraw', timestamp: '04/17/2026, 12:10 AM', txHash: '0x0123456...bcd' },
]

const columns: ColumnDef<StakingRecord>[] = [
  {
    accessorKey: 'user',
    header: 'User',
    cell: ({ row }) => (
      <span className="font-mono text-xs text-slate-300" title={row.original.user}>
        {row.original.user}
      </span>
    ),
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      const action = row.original.action
      return (
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            action === 'Stake'
              ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-400 border border-amber-400/20'
              : 'bg-gradient-to-r from-rose-500/20 to-rose-600/20 text-rose-400 border border-rose-400/20'
          }`}
        >
          {action}
        </span>
      )
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Amount
        {column.getIsSorted() === 'asc' && <ChevronUp className="w-4 h-4" />}
        {column.getIsSorted() === 'desc' && <ChevronDown className="w-4 h-4" />}
      </button>
    ),
    cell: ({ row }) => <span className="font-mono text-slate-200">{row.original.amount.toLocaleString()}</span>,
  },
  {
    accessorKey: 'timestamp',
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Time
        {column.getIsSorted() === 'asc' && <ChevronUp className="w-4 h-4" />}
        {column.getIsSorted() === 'desc' && <ChevronDown className="w-4 h-4" />}
      </button>
    ),
    cell: ({ row }) => <span className="text-xs text-slate-300 whitespace-nowrap">{row.original.timestamp}</span>,
  },
  {
    accessorKey: 'txHash',
    header: 'Transaction',
    cell: ({ row }) => (
      <a
        href={`https://etherscan.io/tx/${row.original.txHash}`}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-xs text-amber-400 hover:text-amber-300 hover:underline transition-colors"
        title={row.original.txHash}
      >
        {row.original.txHash}
      </a>
    ),
  },
]

export function StakingHistoryTable() {
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: STATIC_MOCK_DATA,
    columns,
    state: { globalFilter, columnFilters, sorting },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  })

  return (
    <div className="card">
      {/* Header + Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h3
          className="text-lg font-semibold text-white"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Staking History
        </h3>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search address or amount..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all"
            aria-label="Search staking history"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-white/5">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-white/5">
                {headerGroup.headers.map((header) => {
                  const headerContent = header.column.columnDef.header
                  const renderedHeader =
                    typeof headerContent === 'function'
                      ? headerContent(header.getContext())
                      : headerContent
                  return (
                    <th key={header.id} className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      {header.isPlaceholder ? null : renderedHeader}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <Database className="w-12 h-12 text-slate-600" />
                    <div className="space-y-1">
                      <p className="text-slate-400 text-sm font-medium">No records found.</p>
                      <p className="text-slate-600 text-xs">
                        {globalFilter
                          ? 'Try adjusting your search or filters.'
                          : 'Staking activity will appear here once transactions occur.'}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`border-b border-white/5 transition-colors ${
                    index % 2 === 0 ? 'bg-white/[0.01]' : 'bg-white/[0.03]'
                  } hover:bg-amber-500/[0.04]`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
        <span className="text-xs text-slate-500">
          Showing {table.getRowModel().rows.length} of {STATIC_MOCK_DATA.length} records
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-amber-400 hover:border-amber-400/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {'<<'}
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-4 py-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-amber-400 hover:border-amber-400/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Previous
          </button>
          <span className="text-sm text-slate-300 px-2">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-4 py-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-amber-400 hover:border-amber-400/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Next
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-amber-400 hover:border-amber-400/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {'>>'}
          </button>
        </div>
      </div>
    </div>
  )
}
