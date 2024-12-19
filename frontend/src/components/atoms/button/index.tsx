import { forwardRef, Ref } from 'react';

import { Button, ButtonProps, CircularProgress } from '@mui/material';

type ButtonFormProps = ButtonProps & {
  children?: React.ReactNode | string;
  loading?: boolean;
};

const ButtonForm = forwardRef(
  ({ children, loading, ...otherProps }: ButtonFormProps, ref: Ref<HTMLButtonElement>): JSX.Element => {
    return (
      <Button {...otherProps} ref={ref}>
        {loading ? <CircularProgress /> : children}
      </Button>
    );
  }
);

export default ButtonForm;
