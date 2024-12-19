import { StyledEngineProvider } from '@mui/material/styles';

export default function GlobalCssPriority({ children }: { children: React.ReactNode }): JSX.Element {
  return <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>;
}
