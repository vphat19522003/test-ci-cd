import { Checkbox, Stack, styled, TableCell, TableRow } from '@mui/material';

import { TableFieldType } from './type';

type TableHeadContentProps = {
  tableField: TableFieldType[];
  selection?: boolean;
  totalSelected?: number;
  dataLength: number;
  isSelectedAll?: boolean;
  handleSelectAllRow?: () => void;
  handleSelected?: (type: 'add' | 'clear') => void;
  collapsed?: boolean;
};

export const HeadCell = styled(TableCell)(() => ({
  fontWeight: 'bold'
}));

const TableHeadContent = ({
  tableField,
  selection = false,
  totalSelected,
  dataLength,
  isSelectedAll,
  handleSelectAllRow,
  handleSelected,
  collapsed
}: TableHeadContentProps): JSX.Element => {
  return (
    <>
      {selection && !!totalSelected && (
        <TableRow>
          <TableCell
            padding='none'
            align='justify'
            key={'tbh-selection'}
            colSpan={tableField?.length + 1}
            className='!bg-[#f8f9fa] !px-4 !py-5'>
            <Stack direction={'row'} alignItems={'flex-end'} justifyContent={'space-between'}>
              <Stack direction={'row'} alignItems={'flex-end'} className='font-medium'>
                <span className='mr-1'>Selected:</span> <span className='text-lg font-semibold '>{totalSelected}</span>{' '}
                <span>/ {dataLength}</span>
              </Stack>
              <Stack direction={'row'}>
                <span
                  className='font-light cursor-pointer text-blue-950 hover:text-blue-700 hover:underline hover:font-semibold !pr-2'
                  onClick={() => handleSelected?.('add')}>
                  select all {dataLength}
                </span>
                |
                <span
                  className='cursor-pointer text-blue-950 hover:text-blue-700 hover:underline hover:font-semibold !pl-2'
                  onClick={() => handleSelected?.('clear')}>
                  Clear all
                </span>
              </Stack>
            </Stack>
          </TableCell>
        </TableRow>
      )}
      <TableRow>
        {collapsed && <HeadCell padding='checkbox'></HeadCell>}
        {selection && (
          <HeadCell padding='checkbox' key={'tbh-selection'}>
            <Checkbox checked={isSelectedAll && dataLength > 0} onChange={handleSelectAllRow} />
          </HeadCell>
        )}
        {tableField?.map((item) =>
          item.field === 'action' ? (
            <HeadCell padding='normal' key={item.field} align={item.headerTextAlign || 'center'} width={120}>
              {item.label}
            </HeadCell>
          ) : (
            <HeadCell padding='normal' key={item.field} align={item.headerTextAlign || 'center'} width={item.width}>
              {item.label}
            </HeadCell>
          )
        )}
      </TableRow>
    </>
  );
};

export default TableHeadContent;
