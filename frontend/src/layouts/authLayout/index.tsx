import { Stack } from '@mui/material';

import FloatingShape from '@app/components/motionComponent/floatingShape';

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps): JSX.Element => {
  return (
    <div className='relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-white to-blue-200'>
      <FloatingShape color='bg-blue-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
      <FloatingShape color='bg-blue-500' size='w-48 h-48' top='70%' left='80%' delay={0} />
      <FloatingShape color='bg-pink-500' size='w-48 h-48' top='40%' left='-10%' delay={0} />
      <FloatingShape color='bg-pink-500' size='w-64 h-64' top='-10%' left='80%' delay={0} />
      <Stack justifyContent='center' alignItems='center' className='w-full h-screen max-h-dvh'>
        {children}
      </Stack>
    </div>
  );
};

export default AuthLayout;
