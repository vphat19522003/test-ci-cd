export type CategoryResponseType = {
  _id: string;
  name: string;
  description: string;
  categoryImg: {
    category_img_url: string;
    category_img_public_id: string;
  };
  parent: string;
  child: string[];
  createdAt: string;
};

export type CustomCategoryResponseType = Omit<CategoryResponseType, 'child'> & {
  child: CustomCategoryResponseType[];
};
