import { SortOrder } from 'mongoose';

const getSortOption = (arrange: number): Record<string, SortOrder> => {
  switch (arrange) {
    case 1:
      return { productVoteRate: -1 }; // Phổ biến
    case 2:
      return { soldQuantity: -1 }; // Bán chạy
    case 3:
      return { productPrice: 1 }; // Giá thấp đến cao
    case 4:
      return { productPrice: -1 }; // Giá cao đến thấp
    case 5:
      return { createdAt: -1 }; // Mới nhất
    case 6:
      return { createdAt: 1 }; // Cũ nhất
    case 7:
      return { productName: 1 }; // Tên A-Z
    case 8:
      return { productName: -1 }; // Tên Z-A
    default:
      return { createdAt: -1 }; // Default sorting (Mới nhất)
  }
};

export default getSortOption;
