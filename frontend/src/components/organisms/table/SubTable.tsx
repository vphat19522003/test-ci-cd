import React, { useState } from 'react';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

import { TData } from '@app/hooks/useTableData';

import { TableFieldType } from './type';

type SubTableProps = {
  data: TData[];
  tableField: TableFieldType[];
  renderActions: (item: TData) => JSX.Element;
  uniqueField: string;
  collapsed?: boolean;
  open: boolean;
};
const SubTable = ({ data, tableField, renderActions, uniqueField, collapsed, open }: SubTableProps): JSX.Element => {
  const [openSubRow, setOpenSubRow] = useState(false);
  return (
    <Collapse in={open} timeout='auto' unmountOnExit>
      <TableContainer>
        <Table sx={{ minWidth: 800 }}>
          <TableBody>
            {data.map((row) => {
              return (
                <React.Fragment key={row[uniqueField]}>
                  <TableRow className='bg-slate-50 '>
                    {row.child && row.child.length > 0 ? (
                      <TableCell padding='checkbox' className={`${row.parent ? '!pl-10' : ''}`}>
                        <IconButton onClick={() => setOpenSubRow((prev) => !prev)}>
                          {openSubRow ? (
                            <ExpandLess className='text-pink-500' />
                          ) : (
                            <ExpandMore className='text-pink-500' />
                          )}
                        </IconButton>
                      </TableCell>
                    ) : (
                      <TableCell padding='checkbox' className={`${row.parent ? '!pl-10' : ''}`}></TableCell>
                    )}
                    {tableField.map((field, index) => {
                      if (field?.customRender) {
                        return <TableCell key={index}>{field?.customRender?.(row)}</TableCell>;
                      }
                      return (
                        <TableCell key={field.field + index} align={field?.textAlign}>
                          {field.field !== 'action' ? row[field.field] : renderActions(row)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  {row.child && row.child.length > 0 && (
                    <TableRow className={`${openSubRow ? 'visible' : 'hidden'}`}>
                      <TableCell colSpan={collapsed ? tableField.length + 1 : tableField.length}>
                        <SubTable
                          data={[...row.child]}
                          open={openSubRow}
                          renderActions={renderActions}
                          uniqueField={uniqueField}
                          tableField={tableField}
                          collapsed={collapsed}
                        />
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Collapse>
  );
};

export default SubTable;
