"use client"

import { Table } from "@tanstack/react-table"
import { KanbanIcon, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"

import { statuses } from "./data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { NewTask } from "@/components/kanban/new-task"
import Link from "next/link"
import { useParams } from "next/navigation"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const { project_id } = useParams()

  return (
    <div className="flex items-center gap-2 justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("tags") && (
          <DataTableFacetedFilter
            column={table.getColumn("tags")}
            title="Tags"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
        <Link href={`/dashboard/project/${project_id}`}>
          <Button variant="outline" size="sm" className="h-8 border-dashed">
            <KanbanIcon /> Kanban view
          </Button>
        </Link>
      </div>
      {//@ts-ignore 
        <NewTask inTableView />
      }
      <DataTableViewOptions table={table} />
    </div>
  )
}
