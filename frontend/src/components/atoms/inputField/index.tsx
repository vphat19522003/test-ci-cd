import { forwardRef, type Ref } from 'react';

import {
  Box,
  FormHelperText,
  InputAdornment,
  TextField,
  type TextFieldProps,
  TextFieldPropsSizeOverrides,
  type TextFieldVariants
} from '@mui/material';
import { OverridableStringUnion } from '@mui/types';

import { type IPlainObject } from '@app/types/common';

type InputFieldProps = Omit<TextFieldProps, 'helperText' | 'error'> & {
  error?: IPlainObject;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  variant?: TextFieldVariants;
  readOnly?: boolean;
  description?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderColorFocus?: string;
  size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>;
  min?: number;
  max?: number;
  hideHelperText?: boolean;
};

const InputField = forwardRef(
  (
    {
      error,
      startAdornment,
      endAdornment,
      readOnly,
      variant = 'filled',
      size = 'small',
      min = 0,
      max = 100,
      description,
      backgroundColor,
      borderColor,
      borderColorFocus,
      hideHelperText = false,
      ...otherProps
    }: InputFieldProps,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <Box>
        <TextField
          fullWidth
          {...otherProps}
          ref={ref}
          error={!!error}
          size={size}
          variant={variant}
          sx={({ palette }) => ({
            '.MuiInputBase-root': {
              backgroundColor: backgroundColor || palette.black[100]
            },
            '.MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: borderColor || palette.grey[300]
              },
              '&:hover fieldset': {
                borderColor: borderColor || palette.grey[400]
              },
              '&.Mui-focused fieldset': {
                borderColor: borderColorFocus || palette.primary.main
              }
            },
            'input::placeholder': {
              fontSize: '14px'
            },
            input: {
              paddingTop: '12px'
            }
          })}
          InputProps={{
            startAdornment: startAdornment ? (
              <InputAdornment position='start' sx={{ color: 'inherit' }}>
                <>{startAdornment}</>
              </InputAdornment>
            ) : undefined,
            endAdornment: endAdornment ? (
              <InputAdornment position='end' sx={{ color: 'inherit' }}>
                <>{endAdornment}</>
              </InputAdornment>
            ) : undefined,
            readOnly: readOnly,
            inputProps:
              otherProps.type === 'number'
                ? {
                    min,
                    max
                  }
                : {}
          }}
        />
        {!hideHelperText && (
          <Box className='h-2'>
            <FormHelperText
              error={!!error}
              sx={{
                marginTop: 1
              }}>
              {description ? description : error?.message}
            </FormHelperText>
          </Box>
        )}
      </Box>
    );
  }
);

export default InputField;
