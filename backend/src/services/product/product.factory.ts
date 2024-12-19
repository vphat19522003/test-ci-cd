import Book from './class/book';
import Product from './class/product';
import { IBook, IProduct } from './type';

class ProductFactory {
  static initProduct<T extends Product>(product: IProduct, type: string): T {
    switch (type) {
      case 'Book':
        return new Book(product as IBook) as unknown as T;
      default:
        return new Product(product as IProduct) as unknown as T;
    }
  }

  static async createProduct<T extends Product>(product: IProduct, type: string): Promise<T> {
    const productInstance = ProductFactory.initProduct(product, type);

    return productInstance.createProduct() as Promise<T>;
  }
}

export default ProductFactory;
