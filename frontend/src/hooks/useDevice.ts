import { useMediaQuery } from '@mui/material';

import { BREAKPOINT_MOBILE } from '@app/constants/device';

type useDeviceType = {
  isMobile: boolean;
};

export const useDevice = (): useDeviceType => {
  const isMobile = useMediaQuery(`(max-width:${BREAKPOINT_MOBILE}px)`);

  return { isMobile };
};
