import mongoose, { model, Schema } from 'mongoose';

export enum addressType {
  home = 'Home',
  company = 'Company',
  private = 'Private'
}

export type AddressItemType = {
  code: string;
  name: string;
};

interface IAddress extends Document {
  userId: mongoose.Types.ObjectId;
  address_detail: string;
  address_street: string;
  address_city: AddressItemType;
  address_district: AddressItemType;
  address_ward: AddressItemType;
  address_type: addressType;
  isSetDefault: boolean;
}

const addressItemSchema = new Schema<AddressItemType>(
  {
    name: { type: String, required: true },
    code: { type: String, required: true }
  },
  { _id: false }
);

const addressSchema = new Schema<IAddress>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    address_detail: {
      type: String,
      required: true
    },
    address_street: {
      type: String,
      required: true
    },
    address_city: {
      type: addressItemSchema,
      required: true
    },
    address_district: {
      type: addressItemSchema,
      required: true
    },
    address_ward: {
      type: addressItemSchema,
      required: true
    },
    address_type: {
      type: String,
      enum: Object.values(addressType),
      default: addressType.home,
      required: true
    },
    isSetDefault: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const AddressModel = model<IAddress>('Address', addressSchema);

export default AddressModel;
