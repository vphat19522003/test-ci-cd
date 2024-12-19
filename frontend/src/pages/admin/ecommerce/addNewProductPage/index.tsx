import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { useGetMainCategory } from '@app/api/hooks/category.hook';
import { useCreateProduct } from '@app/api/hooks/product.hook';
import { disableIsPending, setIsPending } from '@app/redux/uiSlice';
import { RootState } from '@app/store';
import { IErrorResponse } from '@app/types/common';

import AddNewProductForm from './components/addNewProductForm';
import { AddNewProductFormCustom } from './components/schemas';

const AddNewProductPage = (): JSX.Element => {
  const { data: mainCategory = [] } = useGetMainCategory();
  const { mutate: addNewProduct, isPending: isAddNewProductPending } = useCreateProduct();
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const handleAddNewProduct = (value: AddNewProductFormCustom) => {
    console.log('Add new Product ', value);
    dispatch(setIsPending());
    addNewProduct(
      { ...value, createdBy: user?._id },
      {
        onSuccess: (data) => {
          dispatch(disableIsPending());
          toast.success(data.message);
        },
        onError: (err: IErrorResponse) => {
          console.log(err);
          dispatch(disableIsPending());
          toast.error(err.response.data.message as string);
        }
      }
    );
  };
  return (
    <AddNewProductForm
      mainCategory={mainCategory}
      handleAddNewProduct={handleAddNewProduct}
      isAddNewProductPending={isAddNewProductPending}
    />
  );
};

export default AddNewProductPage;
