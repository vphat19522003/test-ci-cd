import React, { useCallback, useMemo } from 'react';

import { Delete, Edit } from '@mui/icons-material';
import { IconButton, Stack, Table, TableBody, TableContainer, TableHead, Tooltip } from '@mui/material';

import { DEFAULT_DATA_LENGTH, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@app/constants/table';
import { ResultOfUseTableData, TData } from '@app/hooks/useTableData';

import TableBodyContent from './TableBodyContent';
import TableHeadContent from './TableHeadContent';
import TablePaginationContent from './TablePaginationContent';
import { TableFieldType } from './type';

type CustomTableProps<TFilterFormData, TFilterData> = {
  data: TData[];
  tableField: TableFieldType[];
  selection?: boolean;
  CustomAction?: React.ElementType;
  handleDelete?: (item: TData) => void;
  handleEdit?: (item: TData) => void;
  pagination?: boolean;
  maxPage?: number;
  uniqueField: string;
  tableData?: ResultOfUseTableData<TFilterFormData, TFilterData>;
  collapsed?: boolean;
} & (
  | { selection: true; collapsed?: false }
  | { collapsed: true; selection?: false }
  | { selection?: false; collapsed?: false }
);

const CustomTable = <TFilterFormData, TFilterData>({
  data = [],
  tableField,
  selection,
  CustomAction,
  handleDelete,
  handleEdit,
  pagination = false,
  collapsed = false,
  tableData,
  uniqueField
}: CustomTableProps<TFilterFormData, TFilterData>): JSX.Element => {
  const currentPage = tableData?.currentPage || DEFAULT_PAGE;
  const pageSize = tableData?.pageSize || DEFAULT_PAGE_SIZE;
  const totalDataLength = tableData?.totalDataLength || DEFAULT_DATA_LENGTH;

  const renderData = useMemo((): TData[] => {
    if (!!pagination) {
      return data.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
    } else {
      return data;
    }
  }, [data, currentPage, pageSize, pagination]);

  const handleSelectItem = useCallback(
    (row: TData) => {
      if (tableData?.selectedList.some((item) => item[uniqueField] === row[uniqueField])) {
        const newList = tableData.selectedList.filter((item) => item[uniqueField] !== row[uniqueField]);
        tableData.handleSelectRow?.(newList || []);
      } else {
        tableData?.handleSelectRow([...tableData.selectedList, row]);
      }
    },
    [tableData?.selectedList]
  );

  const notSelectedData = useMemo(() => {
    const listNotSelectedRow = [] as TData[];

    renderData.forEach((row) => {
      if (!tableData?.selectedList.some((selectedRow) => selectedRow[uniqueField] === row[uniqueField])) {
        listNotSelectedRow.push(row);
      }
    });

    return listNotSelectedRow;
  }, [renderData, tableData?.selectedList]);

  const handleSelectAllRow = useCallback(() => {
    if (notSelectedData.length > 0) {
      tableData?.handleSelectRow([...tableData.selectedList, ...notSelectedData]);
    } else {
      tableData?.handleSelectRow(
        tableData?.selectedList?.filter(
          (item) => renderData.findIndex((subItem) => subItem?.[uniqueField] === item[uniqueField]) === -1
        )
      );
    }
  }, [tableData?.selectedList, data, notSelectedData]);

  const handleSelected = (type: 'add' | 'clear') => {
    if (type === 'add') {
      tableData?.handleSelectRow(data);
    } else if (type === 'clear') {
      tableData?.handleSelectRow([]);
    }
  };

  const handleEditDefault = (item: TData) => {
    console.log('You are editing: ', item);
  };

  const handleDeleteDefault = (item: TData) => {
    console.log('You are deleting: ', item);
  };

  const renderAction = useCallback(
    (item: TData): JSX.Element =>
      !CustomAction ? (
        <Stack direction={'row'} justifyContent={'center'}>
          <Tooltip title='Edit'>
            <IconButton
              aria-label='edit'
              className='text-blue-700'
              onClick={() => {
                handleEdit ? handleEdit(item) : handleEditDefault(item);
              }}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete'>
            <IconButton
              aria-label='delete'
              className='text-pink-500'
              onClick={() => {
                handleDelete ? handleDelete(item) : handleDeleteDefault(item);
              }}>
              <Delete />
            </IconButton>
          </Tooltip>
        </Stack>
      ) : (
        <CustomAction {...item} />
      ),
    []
  );

  return (
    <React.Fragment>
      <TableContainer>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableHeadContent
              tableField={tableField}
              selection={!!selection}
              totalSelected={tableData?.selectedList.length}
              dataLength={totalDataLength}
              isSelectedAll={notSelectedData.length === 0}
              handleSelectAllRow={handleSelectAllRow}
              handleSelected={handleSelected}
              collapsed
            />
          </TableHead>
          <TableBody>
            <TableBodyContent
              data={renderData}
              selection={!!selection}
              tableField={tableField}
              renderActions={renderAction}
              handleSelectItem={handleSelectItem}
              selectedList={tableData?.selectedList || []}
              uniqueField={uniqueField}
              collapsed={collapsed}
            />
          </TableBody>
        </Table>
      </TableContainer>
      {!!pagination && !!tableData && <TablePaginationContent dataLength={data.length} tableData={tableData} />}
    </React.Fragment>
  );
};

export default CustomTable;
