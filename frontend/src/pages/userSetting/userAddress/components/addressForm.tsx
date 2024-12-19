import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack } from '@mui/material';

import ButtonForm from '@app/components/atoms/button';
import CustomComboBox from '@app/components/atoms/comboBox';
import InputField from '@app/components/atoms/inputField';
import { locationResponseType } from '@app/types/user';
import { mapLocationData } from '@app/utils/mapLocationData';

import { AddressFormSchema, AddressFormSchemaType } from './schemas';

type AddressFormPropsType = {
  provinceList: locationResponseType[];
  districtList: locationResponseType[];
  wardList: locationResponseType[];
  handleOnChangeDistricts: (province_id: string) => void;
  handleOnChangeProvinces: (district_id: string) => void;
  handleAddForm: (formValue: AddressFormSchemaType) => void;
  handleCloseForm: () => void;
};

const AddressForm = ({
  districtList,
  provinceList,
  wardList,
  handleOnChangeDistricts,
  handleOnChangeProvinces,
  handleAddForm,
  handleCloseForm
}: AddressFormPropsType): JSX.Element => {
  const {
    control,
    setValue,
    formState: { errors },
    handleSubmit
  } = useForm<AddressFormSchemaType>({
    resolver: zodResolver(AddressFormSchema),
    defaultValues: {
      province: '',
      district: '',
      ward: '',
      street: '',
      type: ''
    }
  });

  const submitForm = (formValue: AddressFormSchemaType) => {
    handleAddForm(formValue);
  };

  return (
    <form className='w-full' onSubmit={handleSubmit(submitForm)}>
      <Stack spacing={4}>
        <Controller
          control={control}
          name='province'
          render={({ field: { onChange, value } }) => (
            <CustomComboBox
              value={value}
              label='City'
              data={mapLocationData(provinceList)}
              size='small'
              error={errors.province}
              onChange={(e) => {
                setValue('district', '');
                setValue('ward', '');
                handleOnChangeProvinces(e.target.value as string);
                onChange(e.target.value as string);
              }}
            />
          )}
        />
        <Controller
          control={control}
          name='district'
          render={({ field: { onChange, value } }) => (
            <CustomComboBox
              value={value}
              label='District'
              data={mapLocationData(districtList)}
              size='small'
              error={errors.district}
              onChange={(e) => {
                setValue('ward', '');
                handleOnChangeDistricts(e.target.value as string);
                onChange(e.target.value as string);
              }}
            />
          )}
        />
        <Stack direction={'row'} spacing={2} alignItems={'center'} className='w-full '>
          <Controller
            control={control}
            name='ward'
            render={({ field: { onChange, value } }) => (
              <CustomComboBox
                value={value}
                label='Ward'
                data={mapLocationData(wardList)}
                size='small'
                error={errors.ward}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name='type'
            render={({ field: { onChange, value } }) => (
              <CustomComboBox
                label='Place'
                value={value}
                data={[
                  { label: 'Home', value: 'Home', name: 'Home' },
                  { label: 'Company', value: 'Company', name: 'Company' },
                  { label: 'Private', value: 'Private', name: 'Private' }
                ]}
                size='small'
                error={errors.type}
                onChange={onChange}
              />
            )}
          />
        </Stack>
        <Controller
          control={control}
          name='street'
          render={({ field: { onChange, value } }) => (
            <InputField
              variant='outlined'
              backgroundColor='transparent'
              placeholder='Your home number, street name'
              value={value}
              error={errors.street}
              onChange={onChange}
            />
          )}
        />
        <Stack direction={'row'} justifyContent={'flex-end'}>
          <Button color='secondary' onClick={() => handleCloseForm()}>
            Cancel
          </Button>

          <ButtonForm variant='contained' type='submit'>
            Add
          </ButtonForm>
        </Stack>
      </Stack>
    </form>
  );
};

export default AddressForm;
