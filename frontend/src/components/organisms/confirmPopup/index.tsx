import { forwardRef, Ref, useImperativeHandle, useRef, useState } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, Stack, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

import viteImg from '@app/assets/vite.svg';
import ButtonForm from '@app/components/atoms/button';
import { popupSize, PopupSizeType } from '@app/constants/popupSize';

export interface IDialogRef {
  show: (callback?: () => void) => void;
  hide: () => void;
}

type ConfirmPopUpPropsType = {
  title: string;
  children: React.ReactNode;
  cancelLabel?: string;
  confirmLabel?: string;
  hiddenConfirm?: boolean;
  hiddenTitleIcon?: boolean;
  size?: PopupSizeType;
};

type callbackFnType = () => void;

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='down' timeout={{ enter: 6000, exit: 6000 }} ref={ref} {...props} />;
});

const ConfirmPopup = forwardRef(
  (
    {
      title,
      children,
      cancelLabel = 'Cancel',
      confirmLabel = 'Confirm',
      hiddenConfirm = false,
      hiddenTitleIcon = false,
      size = 'xs'
    }: ConfirmPopUpPropsType,
    ref: Ref<IDialogRef>
  ) => {
    const [open, setOpen] = useState<boolean>(false);
    const callbackRef = useRef<callbackFnType>();

    const popupMaxWidth = popupSize[size];
    const popupMinWidth = popupSize.xs;

    const handleOpen = (callbackFn?: () => void) => {
      setOpen(true);
      callbackRef.current = callbackFn;
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleConfirm = () => {
      callbackRef.current?.();
      handleClose();
    };

    useImperativeHandle(ref, () => {
      return {
        show: handleOpen,
        hide: handleClose
      };
    });

    return (
      <Dialog
        open={open}
        fullWidth
        scroll='paper'
        TransitionComponent={Transition}
        disableScrollLock
        PaperProps={{
          style: { maxWidth: popupMaxWidth, minWidth: popupMinWidth }
        }}
        sx={() => ({
          '.MuiDialogContent-root': {
            paddingTop: '10px !important'
          }
        })}>
        {title && (
          <DialogTitle>
            <Stack direction={'row'} justifyContent={'flex-start'} gap={2}>
              {!hiddenTitleIcon && <img src={viteImg} sizes='5' />}
              <Typography variant='h6' color={'primary'}>
                {title}
              </Typography>
            </Stack>
          </DialogTitle>
        )}
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            {cancelLabel}
          </Button>
          {!hiddenConfirm && (
            <ButtonForm onClick={handleConfirm} variant='contained'>
              {confirmLabel}
            </ButtonForm>
          )}
        </DialogActions>
      </Dialog>
    );
  }
);

export default ConfirmPopup;
