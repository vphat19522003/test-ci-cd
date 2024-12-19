import { Checkbox, TableCell, TableRow } from '@mui/material';

import { TData } from '@app/hooks/useTableData';

import { TableFieldType } from './type';

type TableRowItemProps = {
  tableField: TableFieldType[];
  renderActions: (item) => JSX.Element;
  row: TData;
  selection?: boolean;
  selectedList: TData[];
  handleSelectItem: (row) => void;
  uniqueField: string;
  collapsed?: boolean;
  index: number;
  open?: boolean;
};

const TableRowItem = ({
  row,
  tableField,
  renderActions,
  selection,
  selectedList,
  handleSelectItem,
  uniqueField,
  collapsed,
  index,
  open
}: TableRowItemProps): JSX.Element => {
  return (
    <TableRow
      sx={{
        background: row.parent ? '#e6f7ff' : index % 2 === 0 ? '#f8f9fa' : 'inherit',
        // Chỉ định màu nền khác nếu có parent, hoặc áp dụng màu nền cho các hàng chẵn
        visibility: open || !row.parent ? 'visible' : 'collapse'
      }}
      className={'relative'}>
      {collapsed && <TableCell padding='checkbox' className={`${row.parent ? '!pl-10' : ''}`}></TableCell>}
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
          return <TableCell key={item.field + idx}>{item?.customRender?.(row)}</TableCell>;
        }

        return (
          <TableCell key={item.field + idx} align={item?.textAlign}>
            {item.field !== 'action' ? row[item.field] : renderActions(row)}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default TableRowItem;
