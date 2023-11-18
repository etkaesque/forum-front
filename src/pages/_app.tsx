import Header from "../components/Header";
import '@mantine/core/styles.css';
import type { AppProps } from 'next/app';
import { MantineProvider, createTheme } from '@mantine/core';
import AppLoader from "../components/Loader"
import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {useStore} from "../store/state/store"
import ModalComponent from "../components/Modal"

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme({});

  const queryClient = new QueryClient()
  const loader = useStore((state) => state.loader)
  const modal = useStore((state) => state.modal)

  return (
    <QueryClientProvider client={queryClient}>
    <MantineProvider theme={theme}>
      {modal && <ModalComponent></ModalComponent>}
      {loader && <AppLoader></AppLoader>}
      <Header></Header>
      <Component {...pageProps} />
    </MantineProvider>
    </QueryClientProvider>

  );
}