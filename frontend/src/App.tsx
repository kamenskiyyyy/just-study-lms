import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useEffect } from 'react';
import { RouterPages } from './pages/RouterPages';
import { Container } from '@mui/material';

function App() {
  const {setIsAuth} = useActions();
  const {isLogin} = useTypedSelector(state => state.auth);

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      setIsAuth(true)
    }
  }, [isLogin])

  return (
    <Container component="main" maxWidth="xs">
      <RouterPages />
    </Container>
  )
}

export default App;
