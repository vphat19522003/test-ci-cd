import { useEffect } from 'react';

import { TablePagination } from '@mui/material';

import { DEFAULT_DATA_LENGTH, DEFAULT_MAX_PAGE } from '@app/constants/table';
import { ResultOfUseTableData } from '@app/hooks/useTableData';

type TablePaginationProps<TFilterFormData, TFilterData> = {
  tableData: ResultOfUseTableData<TFilterFormData, TFilterData>;
  dataLength: number;
};
const TablePaginationContent = <TFilterFormData, TFilterData>({
  dataLength,
  tableData
}: TablePaginationProps<TFilterFormData, TFilterData>): JSX.Element => {
  //Set total data length
  useEffect(() => {
    if (tableData.totalDataLength !== dataLength) {
      tableData.handlePagination?.({
        totalDataLength: dataLength || DEFAULT_DATA_LENGTH
      });
    }
  }, [dataLength, tableData.totalDataLength, tableData.pageSize]);

  //Set max page number when change page size
  useEffect(() => {
    tableData.handleChangeMaxPage?.(dataLength ? Math.ceil(dataLength / (tableData.pageSize || 0)) : DEFAULT_MAX_PAGE);
  }, [tableData.pageSize, dataLength]);

  return (
    <TablePagination
      component='div'
      labelRowsPerPage={'Rows:'}
      count={dataLength}
      page={tableData.currentPage as number}
      onPageChange={tableData.handleChangePage}
      onRowsPerPageChange={tableData.handleChangePageSize}
      rowsPerPage={tableData.pageSize as number}
      showFirstButton
      showLastButton
      labelDisplayedRows={({ page }) => `${page + 1} of ${tableData.maxPageNumber}`}
      rowsPerPageOptions={tableData.itemPerPage}
      sx={{ mt: 2 }}
    />
  );
};

export default TablePaginationContent;
