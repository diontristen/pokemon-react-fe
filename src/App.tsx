import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@/styles/global.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { theme } from '@/styles/theme';
import AppRouter from '@/routes';
function App() {

  return (
    <MantineProvider
      theme={theme}
      withCssVariables
      defaultColorScheme='dark'>
      <Notifications />
      <AppRouter />
    </MantineProvider>
  )
}

export default App
