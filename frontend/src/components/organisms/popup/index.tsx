import { forwardRef, Ref, useImperativeHandle, useState } from 'react';

import { Close } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle, IconButton, Slide, Stack, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

import viteImg from '@app/assets/vite.svg';
import { popupSize, PopupSizeType } from '@app/constants/popupSize';

export interface IDialogRef {
  show: (callback?: () => void) => void;
  hide: () => void;
}

type ConfirmPopUpPropsType = {
  title: string;
  children: React.ReactNode;
  setClose?: boolean;
  hiddenTitleIcon?: boolean;
  size?: PopupSizeType;
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='down' timeout={{ enter: 6000, exit: 6000 }} ref={ref} {...props} />;
});

const PopUp = forwardRef(
  (
    { title, children, hiddenTitleIcon = false, setClose = false, size = 'xs' }: ConfirmPopUpPropsType,
    ref: Ref<IDialogRef>
  ) => {
    const [open, setOpen] = useState<boolean>(false);

    const popupMaxWidth = popupSize[size];
    const popupMinWidth = popupSize.xs;

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
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
        onClose={() => {
          setClose && handleClose();
        }}
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
            <Stack direction={'row'} justifyContent={'space-between'}>
              <Stack
                direction={'row'}
                justifyContent={'flex-start'}
                alignItems={'center'}
                gap={2}
                style={{
                  width: '500px'
                }}>
                {!hiddenTitleIcon && <img src={viteImg} sizes='5' />}
                <Typography variant='h6' color={'primary'}>
                  {title}
                </Typography>
              </Stack>
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </Stack>
          </DialogTitle>
        )}
        <DialogContent>{children}</DialogContent>
      </Dialog>
    );
  }
);

export default PopUp;
