import React from 'react';
import { forwardRef, type Ref } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

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

type NumberFieldProps = Omit<TextFieldProps, 'helperText' | 'error'> & {
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

  thousandSeparator?: boolean;
  decimalScale?: number;
  fixedDecimalScale?: boolean;
  allowNegative?: boolean;
};
interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumberFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(function NumericFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
    />
  );
});

const NumberField = forwardRef(
  (
    {
      error,
      startAdornment,
      endAdornment,
      readOnly,
      variant = 'filled',
      size = 'small',
      description,
      backgroundColor,
      borderColor,
      borderColorFocus,

      thousandSeparator = true,
      decimalScale = 2,
      fixedDecimalScale = true,
      allowNegative = false,

      ...otherProps
    }: NumberFieldProps,
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
            inputComponent: NumberFormatCustom as any,
            inputProps: {
              thousandSeparator,
              decimalScale,
              fixedDecimalScale,
              allowNegative
            }
          }}
        />
        <Box className='h-2'>
          <FormHelperText
            error={!!error}
            sx={{
              marginTop: 1
            }}>
            {description ? description : error?.message}
          </FormHelperText>
        </Box>
      </Box>
    );
  }
);

export default NumberField;
