import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

import { toggleSidebar } from '@app/redux/uiSlice';
import { RootState } from '@app/store';

export const categoryList = [
  {
    id: 1,
    categoryName: 'Books',
    categoryImg:
      'https://image.similarpng.com/very-thumbnail/2020/12/Colorful-book-illustration-on-transparent-background-PNG.png',
    link: '/'
  },
  {
    id: 2,
    categoryName: 'Computer',
    categoryImg:
      'https://png.pngtree.com/png-clipart/20190920/original/pngtree-color-glare-computer-free-map-png-image_4651718.jpg',
    link: '/'
  },
  {
    id: 3,
    categoryName: 'Toys',
    categoryImg: 'https://cdn.pixabay.com/photo/2020/03/03/18/03/bear-4899421_960_720.png',
    link: '/'
  }
];

const MobileSideBar = (): JSX.Element => {
  const isOpen = useSelector((state: RootState) => state.ui.showSidebar);
  const dispatch = useDispatch();
  const mainCategories = useSelector((state: RootState) => state.category.mainCategory);

  return (
    <>
      {/* Lớp phủ đen mờ */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='fixed inset-0 z-10 bg-black'
          onClick={() => dispatch(toggleSidebar())} // Đóng sidebar khi click vào lớp phủ
        />
      )}

      <motion.div
        initial={{ x: '-100%' }} // Bắt đầu ở ngoài màn hình bên trái
        animate={{ x: isOpen ? '0%' : '-100%' }} // Nếu mở, chuyển vào màn hình, nếu đóng, di chuyển ra ngoài
        transition={{ type: 'tween', duration: 0.5 }} // Thiết lập hiệu ứng chuyển động
        className='fixed left-0 z-20 bg-white top-20 w-[180px] xl:w-[230px] min-w-[230px] h-screen shadow-md py-4 rounded-tr-xl rounded-br-xl'>
        <Typography variant='h5' className='px-4 py-2 text-xl font-bold text-blue-700 lg:pl-8'>
          Category
        </Typography>
        <Stack direction={'column'}>
          {mainCategories.map((category) => (
            <Link
              key={category._id}
              to={`/category/${category.name.toLowerCase().replace(/\s+/g, '')}`}
              className='no-underline'
              state={{
                categoryId: category._id
              }}>
              <Stack
                direction={'row'}
                spacing={2}
                className='px-4 py-2 transition-all rounded-lg cursor-pointer lg:pl-8 hover:bg-blue-100'
                alignItems={'center'}>
                <img
                  src={category.categoryImg.category_img_url}
                  alt={category.name}
                  className='object-contain size-10'
                />

                <Typography variant='h6' className='text-[#394E6A] text-md'>
                  {category.name}
                </Typography>
              </Stack>
            </Link>
          ))}
        </Stack>
      </motion.div>
    </>
  );
};

export default MobileSideBar;
