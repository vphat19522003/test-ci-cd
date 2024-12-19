import { forwardRef, type Ref } from 'react';

import {
  Box,
  FormHelperText,
  TextareaAutosize,
  TextField,
  type TextFieldProps,
  TextFieldPropsSizeOverrides,
  type TextFieldVariants
} from '@mui/material';
import { OverridableStringUnion } from '@mui/types';

import { type IPlainObject } from '@app/types/common';

type InputFieldProps = Omit<TextFieldProps, 'helperText' | 'error'> & {
  error?: IPlainObject;
  variant?: TextFieldVariants;
  readOnly?: boolean;
  description?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderColorFocus?: string;
  size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>;
  resize?: boolean;
};

const TextArea = forwardRef(
  (
    {
      error,
      readOnly,
      variant = 'filled',
      size = 'small',
      description,
      backgroundColor,
      borderColor,
      borderColorFocus,
      resize,
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
          multiline
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
            readOnly: readOnly,
            inputComponent: TextareaAutosize,
            inputProps: {
              style: {
                minHeight: '200px',
                resize: resize ? 'vertical' : 'none'
              }
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

export default TextArea;
