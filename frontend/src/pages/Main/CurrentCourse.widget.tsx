import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../../components/Title';

function preventDefault(e: React.MouseEvent) {
  e.preventDefault();
}

export default function CurrentCourseWidget() {
  return (
    <>
      <Title>Текущий курс</Title>
      <Typography component="p" variant="h4">
        #НАСТАРТЕ
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        от 15 сентября, 2021
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Перейти
        </Link>
      </div>
    </>
  );
}
