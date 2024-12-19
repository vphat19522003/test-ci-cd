import { Delete, Edit, LibraryAdd } from '@mui/icons-material';
import { IconButton, Stack, Tooltip } from '@mui/material';

import { CustomCategoryResponseType } from '@app/types/category';

type CategoryActionsProps = {
  handleOpenAddSubDialog: (category: CustomCategoryResponseType) => void;
  handleOpenEditDialog: (category: CustomCategoryResponseType) => void;
  handleDeleteCategory: (category: CustomCategoryResponseType) => void;
};

const CategoryActions = ({
  handleOpenAddSubDialog,
  handleOpenEditDialog,
  handleDeleteCategory
}: CategoryActionsProps) => {
  return (props: CustomCategoryResponseType): JSX.Element => {
    const handleAddSub = () => {
      handleOpenAddSubDialog(props);
    };

    const handleEdit = () => {
      handleOpenEditDialog(props);
    };

    /*************  ✨ Codeium Command ⭐  *************/
    /**
     * Delete a category.
     * @param {CustomCategoryResponseType} props Category object to be deleted.
     */
    /******  00ce8f04-0ba5-4d6e-97fa-0ae114c88daf  *******/
    const handleDelete = () => {
      console.log('CATEGORY', props);
      handleDeleteCategory(props);
    };
    return (
      <Stack direction={'row'} justifyContent={'center'}>
        <Tooltip title='Add sub category'>
          <IconButton aria-label='edit' className='text-yellow-300' onClick={handleAddSub}>
            <LibraryAdd />
          </IconButton>
        </Tooltip>
        <Tooltip title='Edit category'>
          <IconButton aria-label='edit' className='text-blue-700' onClick={handleEdit}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title='Delete category'>
          <IconButton aria-label='delete' className='text-pink-500' onClick={handleDelete}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Stack>
    );
  };
};

export default CategoryActions;
