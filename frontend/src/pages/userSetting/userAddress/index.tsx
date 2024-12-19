import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { Stack } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import { useGetDistricts, useGetProvinces, useGetWards } from '@app/api/hooks/location.hook';
import { useAddAddress, useDeleteAddress, useGetListAddress, useSetDefaultAddress } from '@app/api/hooks/user.hook';
import ConfirmPopup, { IDialogRef } from '@app/components/organisms/confirmPopup';
import PopUp from '@app/components/organisms/popup';
import { IErrorResponse } from '@app/types/common';
import { locationResponseType, UserAddressResponseType } from '@app/types/user';

import AddressAction from './components/addressAction';
import AddressForm from './components/addressForm';
import AddressList from './components/addressList';
import { AddressFormSchemaType } from './components/schemas';

const UserAddress = (): JSX.Element => {
  const [districtList, setDistrictList] = useState<locationResponseType[]>([]);
  const [wardList, setWardList] = useState<locationResponseType[]>([]);

  const dialogRef = useRef<IDialogRef>(null);
  const confirmDialogRef = useRef<IDialogRef>(null);
  const queryClient = useQueryClient();

  const { data: addressList = [], refetch } = useGetListAddress();
  const { data: provincesList = [] } = useGetProvinces();
  const { mutate: getDistricts } = useGetDistricts();
  const { mutate: getWards } = useGetWards();
  const { mutate: deleteAddress } = useDeleteAddress();
  const { mutate: addAddress } = useAddAddress();
  const { mutate: setDefault } = useSetDefaultAddress();

  const handleOpenDialog = () => {
    dialogRef.current?.show();
  };

  const handleOnChangeProvinces = (province_id: string) => {
    if (province_id === '') {
      setDistrictList([]);
      setWardList([]);
      return;
    }
    getDistricts(province_id, {
      onSuccess: (data) => {
        console.log({ districts: data });
        setDistrictList(data);
      },
      onError: (err: IErrorResponse) => {
        toast.error(err.response.data.message);
      }
    });
  };

  const handleOnChangeDistricts = (district_id: string) => {
    if (district_id === '') {
      setWardList([]);
      return;
    }

    getWards(district_id, {
      onSuccess: (data) => {
        console.log({ wards: data });
        setWardList(data);
      },
      onError: (err: IErrorResponse) => {
        toast.error(err.response.data.message);
      }
    });
  };

  const handleAddForm = (value: AddressFormSchemaType) => {
    addAddress(value, {
      onSuccess: (data) => {
        console.log({ data });
        toast.success(data.message);
        dialogRef.current?.hide();
        refetch();
      },
      onError: (err: IErrorResponse) => {
        refetch();
        toast.error(err.response.data.message);
      }
    });
  };
  const handleCloseForm = () => {
    dialogRef.current?.hide();
  };

  const handleDeleteAddress = (addressId: string) => {
    confirmDialogRef.current?.show(() => {
      deleteAddress(addressId, {
        onSuccess: (data) => {
          queryClient.setQueryData(['addressList'], (oldData: UserAddressResponseType[] | undefined) => {
            return oldData?.filter((address) => address._id !== addressId);
          });
          toast.success(data.message);
          dialogRef.current?.hide();
        },
        onError: (err: IErrorResponse) => {
          refetch();
          toast.error(err.response.data.message);
        }
      });
    });
  };

  const handleSetDefaultAddress = (addressId: string) => {
    setDefault(addressId, {
      onSuccess: (data) => {
        refetch();
        toast.success(data.message);
      },
      onError: (err: IErrorResponse) => {
        refetch();
        toast.error(err.response.data.message);
      }
    });
  };

  useEffect(() => {
    console.log({ provincesList });
  }, [provincesList]);

  return (
    <>
      <Stack spacing={8} className='p-5'>
        <AddressAction handleOpenDialog={handleOpenDialog} />
        <AddressList
          addressList={addressList}
          handleDeleteAddress={handleDeleteAddress}
          handleSetDefaultAddress={handleSetDefaultAddress}
        />
      </Stack>
      <PopUp title='Add new address' ref={dialogRef}>
        <AddressForm
          provinceList={provincesList}
          districtList={districtList}
          wardList={wardList}
          handleOnChangeProvinces={handleOnChangeProvinces}
          handleOnChangeDistricts={handleOnChangeDistricts}
          handleAddForm={handleAddForm}
          handleCloseForm={handleCloseForm}
        />
      </PopUp>
      <ConfirmPopup ref={confirmDialogRef} title='Warning'>
        Are you sure to delete this address ?
      </ConfirmPopup>
    </>
  );
};

export default UserAddress;
