import { Stack, TableCell, TableRow, Typography } from '@mui/material';

import ViteImg from '@app/assets/vite.svg';
import { TData } from '@app/hooks/useTableData';

import TableRowItem from './TableRowItem';
import TableRowItemCollapse from './TableRowItemCollapse';
import { TableFieldType } from './type';

type TableBodyContentProps = {
  data: TData[];
  selection?: boolean;
  tableField: TableFieldType[];
  renderActions: (item: TData) => JSX.Element;
  handleSelectItem: (row: TData) => void;
  selectedList?: TData[];
  uniqueField: string;
  collapsed?: boolean;
};

const TableBodyContent = ({
  data = [],
  selection = false,
  tableField,
  renderActions,
  handleSelectItem,
  selectedList,
  uniqueField,
  collapsed
}: TableBodyContentProps): JSX.Element => {
  return (
    <>
      {data.length > 0 ? (
        <>
          {data.map((row, index) =>
            // <TableRow
            //   key={index}
            //   sx={{
            //     '&:nth-of-type(even)': {
            //       // Sử dụng :nth-of-type thay vì :nth-child
            //       background: '#f8f9fa'
            //     }
            //   }}
            //   className='relative'>
            //   {selection && (
            //     <TableCell padding='checkbox'>
            //       <Checkbox
            //         onChange={() => {
            //           handleSelectItem(row);
            //         }}
            //         checked={selectedList.some((item) => item[uniqueField] === row[uniqueField])}
            //       />
            //     </TableCell>
            //   )}
            //   {tableField.map((item, idx) => {
            //     if (item?.customRender) {
            //       return <TableCell key={idx}>{item?.customRender?.(row)}</TableCell>;
            //     }

            //     return (
            //       <TableCell key={idx} align={item?.textAlign}>
            //         {item.field !== 'action' ? row[item.field] : renderActions(row)}
            //       </TableCell>
            //     );
            //   })}
            // </TableRow>

            !row.child ? (
              <TableRowItem
                key={row[uniqueField]}
                tableField={tableField}
                renderActions={renderActions}
                row={row}
                handleSelectItem={handleSelectItem}
                selectedList={selectedList || []}
                uniqueField={uniqueField}
                selection={selection}
                collapsed={collapsed}
                index={index}
              />
            ) : (
              <TableRowItemCollapse
                key={row[uniqueField]}
                tableField={tableField}
                renderActions={renderActions}
                row={row}
                handleSelectItem={handleSelectItem}
                selectedList={selectedList || []}
                uniqueField={uniqueField}
                selection={selection}
                collapsed={collapsed}
                index={index}
              />
            )
          )}
        </>
      ) : (
        <TableRow>
          <TableCell colSpan={selection ? tableField.length + 2 : tableField.length + 1}>
            <Stack justifyContent={'center'} alignItems={'center'} className='py-12'>
              <img src={ViteImg} width={60} alt='logo' />
              <Typography sx={{ color: '#6C737F' }}>No Data</Typography>
            </Stack>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default TableBodyContent;
