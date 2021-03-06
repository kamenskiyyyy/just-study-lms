import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useEffect } from 'react';
import { RouterPages } from './pages/RouterPages';
import { Box } from '@mui/material';
import { NavBar } from './components/NavBar';

export function App() {
  const { setIsAuth } = useActions();
  const { isLogin } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      setIsAuth(true);
    }
  }, [isLogin]);

  if (!isLogin) {
    return <RouterPages />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <NavBar />
      <RouterPages />
    </Box>
  );
}
