import { AddCircleOutline } from '@mui/icons-material';
import { Divider, Stack, Typography } from '@mui/material';

import ButtonForm from '@app/components/atoms/button';

type AddressActionPropsType = {
  handleOpenDialog: () => void;
};

const AddressAction = ({ handleOpenDialog }: AddressActionPropsType): JSX.Element => {
  const handleCreateAddress = () => {
    handleOpenDialog();
  };
  return (
    <Stack>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} className='pb-4'>
        <Typography variant='h5'>Address</Typography>
        <ButtonForm variant='contained' onClick={handleCreateAddress} color='primary' className='px-2'>
          <Stack direction={'row'} spacing={1}>
            <AddCircleOutline />
            <p>Add address</p>
          </Stack>
        </ButtonForm>
      </Stack>

      <Typography variant='caption' className='text-md text-gray-400'>
        Manage purchase and delivery addresses for physical products
      </Typography>
      <Divider orientation='horizontal' className='mt-5' />
    </Stack>
  );
};

export default AddressAction;
