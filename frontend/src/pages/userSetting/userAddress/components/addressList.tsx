import { Anchor, Delete, EmojiTransportation, Home, Map, VpnLock } from '@mui/icons-material';
import { Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material';

import ButtonForm from '@app/components/atoms/button';
import { UserAddressResponseType } from '@app/types/user';

const shippingPlace = {
  Private: <VpnLock />,
  Home: <Home />,
  Company: <EmojiTransportation />
};

type addressListPropsType = {
  addressList: UserAddressResponseType[];
  handleDeleteAddress: (addressId: string) => void;
  handleSetDefaultAddress: (addressId: string) => void;
};

const AddressList = ({
  addressList,
  handleDeleteAddress,
  handleSetDefaultAddress
}: addressListPropsType): JSX.Element => {
  return (
    <>
      {addressList.length > 0 &&
        addressList.map((address, idx) => (
          <Stack key={address._id} spacing={4}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography className='px-2 text-white bg-blue-700 rounded-full'>{idx + 1}</Typography>

              <Stack direction={'row'}>
                <Tooltip title='Set default'>
                  <IconButton
                    disabled={address.isSetDefault}
                    className='disabled:text-green-500'
                    color='primary'
                    onClick={() => handleSetDefaultAddress(address._id)}>
                    <Anchor />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Delete address'>
                  <IconButton
                    color='secondary'
                    onClick={() => {
                      handleDeleteAddress(address._id);
                    }}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
            <Stack spacing={4}>
              <Stack direction={'row'} spacing={4} className='text-md' alignItems={'center'}>
                <p className='w-28'>Address</p>
                <p className='font-black'>{address.address_detail}</p>
              </Stack>
              <Stack direction={'row'} spacing={4} className='text-md' alignItems={'center'}>
                <p className='w-28'>City</p>
                <p className='font-black'>{address.address_city.name}</p>
              </Stack>
              <Stack direction={'row'} spacing={4} className='text-md' alignItems={'center'}>
                <p className='w-28'>District</p>
                <p className='font-black'>{address.address_district.name}</p>
              </Stack>
              <Stack direction={'row'} spacing={4} className='text-md' alignItems={'center'}>
                <p className='w-28'>Place</p>
                <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={'flex-start'}>
                  {shippingPlace[address.address_type]}
                  <p className='font-black'>{address.address_type}</p>
                </Stack>
              </Stack>
            </Stack>
            <Stack direction={'row'} justifyContent={'flex-end'}>
              <ButtonForm variant='contained' color='primary' className='px-2'>
                <Stack direction={'row'} spacing={1}>
                  <Map />
                  <p>Check map</p>
                </Stack>
              </ButtonForm>
            </Stack>
            <Divider orientation='horizontal' className='mt-5' />
          </Stack>
        ))}
    </>
  );
};

export default AddressList;
