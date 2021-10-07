import * as React from 'react';
import { Fragment, useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import { NavLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { formatDate } from '../../formatDate';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { IPass } from '../../store/reducers/passReducer';

export default function CurrentCourseWidget() {
  const { pass } = useTypedSelector((state) => state.pass);
  const { user } = useTypedSelector((state) => state.user);
  const { getCurrentPass } = useActions();
  const [currentPass, setCurrentPass] = useState<IPass[] | null>(null);

  useEffect(() => {
    getCurrentPass(user);
  }, [user]);

  function handleSelectPass(event: any) {
    const change = event.target.textContent;
    setCurrentPass(pass.filter((item) => item.label === change));
  }

  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        onInputChange={handleSelectPass}
        options={pass}
        sx={{ mb: 2 }}
        renderInput={(params) => <TextField {...params} label="Доступные курсы" />}
      />
      {currentPass?.map((item) => {
        return (
          <Fragment key={item.id}>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              от {formatDate(item.course.createdAt)}
            </Typography>
            <div>
              <Link color="primary" to={`/courses/${item.course.id}`} component={NavLink}>
                Перейти
              </Link>
            </div>
          </Fragment>
        );
      })}
    </>
  );
}
