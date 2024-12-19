import mongoose, { Document, model, Schema, Types } from 'mongoose';

export interface OrderItem {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  orderItems: OrderItem[];
  totalAmount: number;
  status: 'Pending' | 'Shipped' | 'Deliveried' | 'Cancel';
  shippingAddress: string;
}

const OrderItemSchema = new Schema<OrderItem>(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 0
    },
    price: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    _id: false
  }
);

const OrderSchema = new Schema<IOrder>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderItems: {
    type: [OrderItemSchema],
    default: []
  },
  totalAmount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: 'Pending'
  },
  shippingAddress: {
    type: String
  }
});

const OrderModel = model<IOrder>('Order', OrderSchema);

export default OrderModel;
