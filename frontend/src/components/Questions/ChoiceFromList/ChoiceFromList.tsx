import { ChoiceFromListItem, IChoiceFromList } from './ChoiceFromListItem';
import { Alert, Button, SelectChangeEvent, Stack } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import Title from '../../Title';

interface IChoiceFromListComponent {
  typeChangeWords: IChoiceFromList[];
}

export function ChoiceFromList({ typeChangeWords }: IChoiceFromListComponent) {
  const [values, setValues] = useState({});
  const [solution, setSolution] = useState<{ message: string; isCorrect: boolean } | undefined>(undefined);

  function choiceHandler(e: SelectChangeEvent) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  function handleApprove() {
    const right = Object.keys(typeChangeWords).length;
    // @ts-ignore
    const sum = Object.values(values).reduce((a, b) => a + b, 0);
    if (sum === right) {
      setSolution({ message: `Вы ответили правильно на все вопросы`, isCorrect: true });
    } else {
      setSolution({ message: `К сожалению вы ответили правильно на ${sum} вопросов из ${right}`, isCorrect: false });
    }
  }

  return (
    <>
      <Title>Задание с выбором ответа</Title>
      {typeChangeWords.map((item) => {
        return (
          <ChoiceFromListItem
            key={item.id}
            id={item.id}
            before={item.before}
            after={item.after}
            answers={item.answers}
            handleChange={choiceHandler}
          />
        );
      })}
      <Button variant="outlined" type="button" onClick={handleApprove}>
        Отправить решение
      </Button>
      <Stack sx={{ width: '100%', mt: 2 }} spacing={2}>
        {solution && <Alert severity={solution.isCorrect ? 'success' : 'warning'}>{solution.message}</Alert>}
      </Stack>
    </>
  );
}