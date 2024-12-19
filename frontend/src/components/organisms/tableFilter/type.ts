import { DropdownDataType } from '@app/types/common';

export interface FilterFieldType {
  id: string;
  label: string;
  type: 'input' | 'combobox' | 'date-picker' | 'date-range-picker';
}

export interface InputFilterType extends FilterFieldType {
  type: 'input';
}

export interface ComboBoxFilterType extends FilterFieldType {
  type: 'combobox';
  data: DropdownDataType[];
}

export type FilterFieldTypeCustom = InputFilterType | ComboBoxFilterType;

export interface TableFilterPropsType<TData> {
  filterField: FilterFieldTypeCustom[];
  isLoading?: boolean;
  canClear?: boolean;
  onSubmit: (data) => void;
  initialFilterData?: TData;
}
