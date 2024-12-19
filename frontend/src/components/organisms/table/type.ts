export type TableFieldType = {
  label: string;
  field: string;
  textAlign?: 'center' | 'left' | 'right' | 'justify' | 'inherit';
  headerTextAlign?: 'center' | 'left' | 'right' | 'justify' | 'inherit';
  width?: string | number;
  customRender?: (row) => React.ReactNode;
};
