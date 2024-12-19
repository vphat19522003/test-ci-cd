import { Controller, useForm } from 'react-hook-form';

import { Search } from '@mui/icons-material';
import { Divider, Stack } from '@mui/material';

import ButtonForm from '@app/components/atoms/button';
import CustomComboBox from '@app/components/atoms/comboBox';
import InputField from '@app/components/atoms/inputField';

import { TableFilterPropsType } from './type';

const TableFilter = <TData,>({
  filterField,
  isLoading,
  onSubmit,
  canClear = true,
  initialFilterData
}: TableFilterPropsType<TData>): JSX.Element => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  return (
    <>
      <div className='grid grid-cols-2 gap-4 my-4 xl:grid-cols-3 max-w-4xl'>
        {filterField?.map((field) => {
          if (field.type === 'input') {
            return (
              <Controller
                control={control}
                name={field.id}
                key={field.id}
                render={({ field: { value, onChange } }) => (
                  <InputField
                    variant='outlined'
                    backgroundColor='transparent'
                    size='medium'
                    hideHelperText
                    label={field.label}
                    value={value ? value : ''}
                    onChange={onChange}
                  />
                )}
              />
            );
          }
          if (field.type === 'combobox') {
            return (
              <Controller
                control={control}
                name={field.id}
                key={field.id}
                render={({ field: { value, onChange } }) => (
                  <CustomComboBox
                    data={field.data}
                    size='medium'
                    label={field.label}
                    onChange={onChange}
                    value={value ? value : ''}
                  />
                )}
              />
            );
          }
          //   if (field.type === 'date-picker') {
          //     return <DatePicker key={field.id} />;
          //   }
          //   if (field.type === 'date-range-picker') {
          //     return <></>;
          //   }
        })}

        <Stack direction={'row'} spacing={2} alignItems={'center'}>
          {canClear && (
            <ButtonForm
              className='max-h-10'
              color='secondary'
              disabled={isLoading}
              onClick={() => {
                if (initialFilterData) {
                  reset(initialFilterData);
                } else {
                  reset();
                }
              }}>
              Reset
            </ButtonForm>
          )}
          <ButtonForm variant='contained' className='max-h-10 px-3' onClick={handleSubmit(onSubmit)}>
            <Stack direction={'row'} alignItems={'center'}>
              <Search />
              <p>Search</p>
            </Stack>
          </ButtonForm>
        </Stack>
      </div>
      <Divider />
    </>
  );
};

export default TableFilter;
