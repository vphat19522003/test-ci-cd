import { UseFormReset } from 'react-hook-form';

import { Check } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';

import ButtonForm from '@app/components/atoms/button';

import { AddNewProductFormType } from './schemas';

type AddNewProductActionProps = {
  reset: UseFormReset<AddNewProductFormType>;
  setProductType: React.Dispatch<React.SetStateAction<string>>;
  setSubProducType: React.Dispatch<React.SetStateAction<string>>;
  isAddNewProductPending: boolean;
};

const AddNewProductAction = ({
  reset,
  isAddNewProductPending,
  setProductType,
  setSubProducType
}: AddNewProductActionProps): JSX.Element => {
  return (
    <Stack direction={'row'} spacing={2}>
      <Button
        color='primary'
        onClick={() => {
          reset();
          setProductType('');
          setSubProducType('');
        }}
        disabled={isAddNewProductPending}>
        Reset
      </Button>

      <ButtonForm variant='contained' type='submit' disabled={isAddNewProductPending}>
        <Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'center'}>
          <Check />
          <p className='my-0 '>Publish</p>
        </Stack>
      </ButtonForm>
    </Stack>
  );
};

export default AddNewProductAction;
