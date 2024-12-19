import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { AddCircleOutline } from '@mui/icons-material';
import { CircularProgress, Stack } from '@mui/material';

import {
  useCreateCategory,
  useDeleteCategory,
  useEditCategory,
  useGetListCategory
} from '@app/api/hooks/category.hook';
import ButtonForm from '@app/components/atoms/button';
import PageTitle from '@app/components/molecules/admin/pageTitle';
import ConfirmPopup, { IDialogRef } from '@app/components/organisms/confirmPopup';
import PopUp from '@app/components/organisms/popup';
import CustomTable from '@app/components/organisms/table';
import { TableFieldType } from '@app/components/organisms/table/type';
import useTableData from '@app/hooks/useTableData';
import { disableIsPending, setIsPending } from '@app/redux/uiSlice';
import { CustomCategoryResponseType } from '@app/types/category';
import { IErrorResponse } from '@app/types/common';

import CategoryActions from './components/CategoryActions';
import CategoryForm from './components/CategoryForm';
import { AddNewCategoryFormCustom } from './components/schemas';

const initialData: CustomCategoryResponseType = {
  name: '',
  description: '',
  categoryImg: {
    category_img_public_id: '',
    category_img_url: ''
  },
  _id: '',
  parent: '',
  createdAt: '',
  child: []
};

const CategoryPage = (): JSX.Element => {
  const [parentCategory, setParentCategory] = useState<CustomCategoryResponseType | null>();
  const [editData, setEditData] = useState<CustomCategoryResponseType>(initialData);

  const addDialogRef = useRef<IDialogRef>(null);
  const deleteDialogRef = useRef<IDialogRef>(null);
  const addSubDialogRef = useRef<IDialogRef>(null);
  const editDialogRef = useRef<IDialogRef>(null);

  const { data: listCategory = [], isLoading, refetch } = useGetListCategory();
  const { mutate: addCategory, isPending } = useCreateCategory();
  const { mutate: deleteCategory } = useDeleteCategory();
  const { mutate: editCategory } = useEditCategory();

  const dispatch = useDispatch();

  const tableData = useTableData({ pageSize: 10 });

  const fieldTable: TableFieldType[] = [
    { field: 'name', label: 'Name', textAlign: 'center' },
    { field: 'description', label: 'Description', textAlign: 'center' },
    { field: 'createdAt', label: 'Created At', textAlign: 'center' },
    { field: 'action', label: 'Action' }
  ];

  const handleOpenDialog = () => {
    addDialogRef.current?.show();
  };

  const handleOpenAddSubDialog = (category: CustomCategoryResponseType) => {
    setParentCategory(category);
    addSubDialogRef.current?.show();
  };

  const handleOpenEditDialog = (category: CustomCategoryResponseType) => {
    setEditData(category);
    editDialogRef.current?.show();
  };

  const handleCloseDialog = () => {
    addDialogRef.current?.hide();
    setParentCategory(null);
  };

  const handleCloseSubCategoryDialog = () => {
    addSubDialogRef.current?.hide();
  };

  const handleCloseEditCategoryDialog = () => {
    setEditData(initialData);
    editDialogRef.current?.hide();
  };

  const handleAddMainCategory = (categoryData: AddNewCategoryFormCustom) => {
    console.log('Add new Main Category ', categoryData);
    dispatch(setIsPending());
    addCategory(categoryData, {
      onSuccess: (data) => {
        dispatch(disableIsPending());
        setParentCategory(null);
        toast.success(data.message);
        addDialogRef.current?.hide();
        refetch();
      },
      onError: (err: IErrorResponse) => {
        console.log(err);
        dispatch(disableIsPending());
        toast.error(err.response.data.message as string);
      }
    });
  };

  const handleAddSubCategory = (category: AddNewCategoryFormCustom) => {
    console.log('Add new Sub Category ', category);
    dispatch(setIsPending());
    const newCategoryData = { ...category, parent: parentCategory?._id };

    addCategory(newCategoryData, {
      onSuccess: (data) => {
        dispatch(disableIsPending());
        toast.success(data.message);
        addSubDialogRef.current?.hide();
        refetch();
      },
      onError: (err: IErrorResponse) => {
        console.log(err);
        dispatch(disableIsPending());
        toast.error(err.response.data.message as string);
      }
    });
  };

  const handleEditCategory = (category: AddNewCategoryFormCustom) => {
    dispatch(setIsPending());
    const editCategoryData = { ...category, category_id: editData._id };

    editCategory(editCategoryData, {
      onSuccess: (data) => {
        dispatch(disableIsPending());
        toast.success(data.message);
        editDialogRef.current?.hide();
        refetch();
      },
      onError: (err: IErrorResponse) => {
        console.log(err);
        dispatch(disableIsPending());
        toast.error(err.response.data.message as string);
      }
    });
  };

  const handleDeleteCategory = (category: CustomCategoryResponseType) => {
    deleteDialogRef.current?.show(() => {
      dispatch(setIsPending());
      deleteCategory(category._id, {
        onSuccess: (data) => {
          dispatch(disableIsPending());
          toast.success(data.message);
          refetch();
        },
        onError: (error: IErrorResponse) => {
          console.log('Delete catgory', error);
          dispatch(disableIsPending());
          toast.error(error.response.data.message as string);
        }
      });
    });
  };

  useEffect(() => {
    console.log({ parentCategory });
  }, [parentCategory]);
  return (
    <>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} className='mb-4'>
        <PageTitle />
        <ButtonForm variant='contained' type='submit' disabled={false} onClick={handleOpenDialog}>
          <Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'center'}>
            <AddCircleOutline />
            <p className='my-0 '>Create Category</p>
          </Stack>
        </ButtonForm>
      </Stack>
      <div className='grid grid-cols-1'>
        {isLoading ? (
          <Stack justifyContent='center' alignItems='center' className='h-96'>
            <CircularProgress />
          </Stack>
        ) : (
          <CustomTable
            data={listCategory}
            tableData={tableData}
            tableField={fieldTable}
            pagination
            uniqueField='_id'
            collapsed
            CustomAction={CategoryActions({ handleOpenAddSubDialog, handleOpenEditDialog, handleDeleteCategory })}
          />
        )}
      </div>
      <PopUp title='Create Category' ref={addDialogRef} size='xl'>
        <CategoryForm
          handleAddMainCategory={handleAddMainCategory}
          handleCloseDialog={handleCloseDialog}
          isPending={isPending}
          {...initialData}
          mode='Add'
        />
      </PopUp>

      <PopUp title='Create Sub Category' ref={addSubDialogRef} size='xl'>
        <CategoryForm
          handleAddMainCategory={handleAddSubCategory}
          handleCloseDialog={handleCloseSubCategoryDialog}
          isPending={isPending}
          {...initialData}
          mode='Add'
        />
      </PopUp>

      <PopUp title='Edit Category' ref={editDialogRef} size='xl'>
        <CategoryForm
          handleAddMainCategory={handleEditCategory}
          handleCloseDialog={handleCloseEditCategoryDialog}
          isPending={isPending}
          {...editData}
          mode='Edit'
        />
      </PopUp>

      <ConfirmPopup title='Warning' ref={deleteDialogRef}>
        Do you want to delete this category ?
      </ConfirmPopup>
    </>
  );
};

export default CategoryPage;
