'use client';
import React from 'react';
import axios from 'axios';
import { Button } from '../ui/button';
import { ArrowDownToLineIcon, CalendarArrowDownIcon, DatabaseIcon } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
const ExportCalendar = ({ project_id }: { project_id: string }) => {
    const handleExportCalendar = async () => {
        try {
            const response = await axios.get(`/api/${project_id}/calendar/sync`, {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `board-${project_id}.ics`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (e) {
            console.error('Download failed', e);
        }
    };
    const handleExportCsv = async () => {
        try {
            const response = await axios.get(`/api/${project_id}/export`, {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `board-${project_id}.csv`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (e) {
            console.error('Download failed', e);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild><Button className="rounded-md h-8" variant="outline">
                <ArrowDownToLineIcon className="mr-2 opacity-60" /> Export
            </Button></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Export as </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer flex items-center gap-2' onClick={handleExportCalendar}><CalendarArrowDownIcon className='h-4 w-4 opacity-60' />Export as ICalendar</DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer flex items-center gap-2' onClick={handleExportCsv}><DatabaseIcon className='h-4 w-4 opacity-60' />Export as CSV</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ExportCalendar;
