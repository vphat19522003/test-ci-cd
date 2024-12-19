import { useState } from 'react';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Checkbox, IconButton, TableCell, TableRow } from '@mui/material';

import { TData } from '@app/hooks/useTableData';

import SubTable from './SubTable';
import { TableFieldType } from './type';

type TableRowItemCollapseProps = {
  tableField: TableFieldType[];
  renderActions: (item) => JSX.Element;
  row: TData;
  selection: boolean;
  selectedList: TData[];
  handleSelectItem: (row) => void;
  uniqueField: string;
  collapsed?: boolean;
  index: number;
  open?: boolean;
};

const TableRowItemCollapse = ({
  row,
  tableField,
  renderActions,
  selection,
  selectedList,
  handleSelectItem,
  uniqueField,
  collapsed,
  index
}: TableRowItemCollapseProps): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        sx={{
          background: row.parent ? '#e6f7ff' : index % 2 === 0 ? '#f8f9fa' : 'inherit',
          visibility: open || !row.parent ? 'visible' : 'collapse'
        }}
        className='relative'>
        {collapsed && (
          <TableCell padding='checkbox' className={`${row.parent ? '!pl-10' : ''}`}>
            {row.child && row.child.length > 0 && (
              <IconButton onClick={() => setOpen((prev) => !prev)}>
                {open ? <ExpandLess className='text-pink-500' /> : <ExpandMore className='text-pink-500' />}
              </IconButton>
            )}
          </TableCell>
        )}
        {selection && (
          <TableCell padding='checkbox' className={`${row.parent ? '!pl-10' : ''}`}>
            <Checkbox
              onChange={() => {
                handleSelectItem(row);
              }}
              checked={selectedList.some((item) => item[uniqueField] === row[uniqueField])}
            />
          </TableCell>
        )}
        {tableField.map((item, idx) => {
          if (item?.customRender) {
            return <TableCell key={idx}>{item?.customRender?.(row)}</TableCell>;
          }

          return (
            <TableCell key={idx} align={item?.textAlign}>
              {item.field !== 'action' ? row[item.field] : renderActions(row)}
            </TableCell>
          );
        })}
      </TableRow>

      {row.child && row.child.length > 0 && (
        <TableRow className={`${open ? 'visible' : 'hidden'}`}>
          <TableCell colSpan={selection || collapsed ? tableField.length + 1 : tableField.length}>
            <SubTable
              data={[...row.child]}
              open={open}
              renderActions={renderActions}
              uniqueField={uniqueField}
              tableField={tableField}
              collapsed={collapsed}
            />
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default TableRowItemCollapse;
