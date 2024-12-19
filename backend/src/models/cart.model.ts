import mongoose, { model, Schema } from 'mongoose';

export interface CartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  cartItems: CartItem[];
}

const CartItemSchema = new Schema<CartItem>(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: { type: Number, required: true, min: 1 }
  },
  {
    _id: false
  }
);

const CartSchema = new Schema<ICart>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    cartItems: {
      type: [CartItemSchema],
      default: []
    }
  },
  {
    timestamps: true
  }
);

const CartModel = model<ICart>('Cart', CartSchema);

export default CartModel;
