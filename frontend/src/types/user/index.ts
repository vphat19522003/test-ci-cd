import { ResponseType } from '../common';

export enum USER_ROLE {
  ADMIN = 'Admin',
  USER = 'User'
}
export type UserTypeResponse = {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
  fullName?: string;
  phone?: string;
  passport?: string;
  gender?: string;
  createdAt?: string;
  avatar?: {
    avatar_public_id: string;
    avatar_url: string;
  };
  role: USER_ROLE;
};

export type locationResponseType = {
  name: string;
  code: string;
};

export type customLocationResponse = ResponseType & {
  result: locationResponseType[];
};

export enum AddressType {
  home = 'Home',
  private = 'Private',
  company = 'Company'
}

export type UserAddressResponseType = {
  _id: string;
  userId: string;
  address_detail: string;
  address_street: string;
  address_city: locationResponseType;
  address_district: locationResponseType;
  address_ward: locationResponseType;
  address_type: AddressType;
  isSetDefault: boolean;
};
