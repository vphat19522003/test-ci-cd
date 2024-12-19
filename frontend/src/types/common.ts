export interface IPlainObject {
  [key: string]: any;
}

export type ResponseType = {
  message: string;
  status: number;
};

export interface IErrorResponse {
  response: {
    data: {
      message: string;
      error: string;
    };
    status: number;
  };
}

export type DropdownDataType = {
  value: string | number;
  label: string;
  name?: string;
};
