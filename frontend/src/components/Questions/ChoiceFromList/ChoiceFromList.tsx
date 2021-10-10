import { ChoiceFromListItem, IChoiceFromList } from './ChoiceFromListItem';
import { Button } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import Title from '../../Title';

interface IChoiceFromListComponent {
  typeChangeWords: IChoiceFromList[];
}

export function ChoiceFromList({ typeChangeWords }: IChoiceFromListComponent) {
  // const [solution, setSolution] = useState<{ message: string; isCorrect: boolean } | undefined>(undefined);
  const [checkMode, setCheckMode] = useState<boolean>(false);

  function handleApprove() {
    // const right = Object.keys(typeChangeWords).length;
    // // @ts-ignore
    // const sum = Object.values(values).reduce((a, b) => a + b, 0);
    // if (sum === right) {
    //   setSolution({ message: `Вы ответили правильно на все вопросы`, isCorrect: true });
    // } else {
    //   setSolution({ message: `К сожалению вы ответили правильно на ${sum} вопросов из ${right}`, isCorrect: false });
    // }
    setCheckMode(true);
    console.log(typeChangeWords);
  }

  return (
    <>
      <Title>Задание с выбором ответа</Title>
      {typeChangeWords.map((item) => {
        return (
          <ChoiceFromListItem
            key={item.id}
            correctAnswers={item.correctAnswers}
            isCorrect={item.isCorrect}
            userAnswer={item.userAnswer}
            id={item.id}
            before={item.before}
            checkMode={checkMode}
            after={item.after}
            answers={item.answers}
            // handleChange={choiceHandler}
            typeChangeWords={typeChangeWords}
          />
        );
      })}
      <Button variant="outlined" type="button" onClick={handleApprove}>
        Отправить решение
      </Button>
      {/*<Stack sx={{ width: '100%', mt: 2 }} spacing={2}>*/}
      {/*  {solution && <Alert severity={solution.isCorrect ? 'success' : 'warning'}>{solution.message}</Alert>}*/}
      {/*</Stack>*/}
    </>
  );
}
