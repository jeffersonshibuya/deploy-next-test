'use client';


import { electionTypes } from '@/data/filesData';
import { FilesDBResponseData } from '@/types';
import { formatBytes } from '@/utils/format-bytes';
import { ColumnDef } from '@tanstack/react-table';

export const filesColumns: ColumnDef<FilesDBResponseData>[] = [
  {
    accessorKey: '#',
    header: '#',
    cell: ({ row }) => {
      return <span>{row.index + 1}</span>;
    }
  },
  {
    accessorKey: 'county',
    header: 'County',
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: 'electionType',
    header: 'Election Type',
    cell: ({ row }) => {
      const electionType = electionTypes.find(
        (type) => type.value === row.getValue('electionType')
      );

      if (!electionType) {
        return null;
      }

      return (
        <div className="flex w-full items-center">
          <span>{electionType.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: 'year',
    header: 'Year',
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },

  // {
  //   accessorKey: 'updated_at',
  //   header: 'Date',
  //   cell: ({ row }) => {
  //     return (
  //       <time dateTime={row.original.updated_at}>
  //         {new Intl.DateTimeFormat('en-US', {
  //           year: 'numeric',
  //           month: '2-digit',
  //           day: '2-digit',
  //           hour: '2-digit',
  //           minute: '2-digit'
  //         }).format(new Date(Date.parse(row.original.updated_at)))}
  //       </time>
  //     );
  //   }
  // },
  {
    accessorKey: 'size',
    header: 'Size',
    cell: ({ row }) => {
      return <span>{formatBytes(row.original.size)}</span>;
    }
  },
];
