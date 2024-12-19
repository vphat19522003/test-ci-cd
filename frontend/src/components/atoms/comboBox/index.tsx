import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectProps, Stack } from '@mui/material';

import { DropdownDataType, IPlainObject } from '@app/types/common';

type ComboBoxProps = Omit<SelectProps, 'error' | 'multiple'> & {
  error?: IPlainObject;
  data: DropdownDataType[];
  labelType?: 'inside' | 'outside';
  isDisabled?: boolean;
  description?: string;
  emptyItem?: boolean;
  value?: string;
};

const CustomComboBox = ({
  error,
  data,
  labelType = 'inside',
  isDisabled = false,
  description,
  value,
  ...otherProps
}: ComboBoxProps): JSX.Element => {
  return (
    <Stack
      direction={'column'}
      sx={{
        width: '100%'
      }}>
      {labelType === 'outside' && <InputLabel>{otherProps.label}</InputLabel>}
      <FormControl
        error={!!error}
        sx={({ palette }) => ({
          width: '100%',
          '.MuiInputBase-root': {
            '& fieldset': {
              borderColor: palette.grey[300],
              borderWidth: '1px'
            },
            '&:hover fieldset': {
              borderColor: palette.grey[400]
            },
            '&.Mui-focused fieldset': {
              borderColor: palette.primary.main
            }
          },
          '& .MuiSelect-select': {
            paddingTop: '10px'
          }
        })}>
        {labelType === 'inside' && <InputLabel>{otherProps.label}</InputLabel>}
        <Select
          value={value}
          label={labelType === 'inside' ? otherProps.label : undefined}
          disabled={isDisabled}
          {...otherProps}>
          <MenuItem value=''>Choose Option</MenuItem>
          {data.length > 0 &&
            data.map((item, idx) => (
              <MenuItem key={item.toString() + idx} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <Box className='h-2'>
        <FormHelperText
          error={!!error}
          sx={{
            marginTop: 1
          }}>
          {description ? description : error?.message}
        </FormHelperText>
      </Box>
    </Stack>
  );
};

export default CustomComboBox;
