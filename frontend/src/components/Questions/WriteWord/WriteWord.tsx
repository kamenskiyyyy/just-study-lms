import Title from '../../Title';
import { Button } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { IWriteWordItem, WriteWordItem } from './WriteWordItem';

interface IWriteWordComponent {
  typeWriteWord: IWriteWordItem[];
}

export function WriteWord({ typeWriteWord }: IWriteWordComponent) {
  const [checkMode, setCheckMode] = useState<boolean>(false);

  function handleApprove() {
    // @ts-ignore
    setCheckMode(true);
    console.log(typeWriteWord);
  }

  return (
    <>
      <Title>Задание с пропущеным словом</Title>
      {typeWriteWord.map((item) => {
        return (
          <WriteWordItem
            key={item.id}
            id={item.id}
            before={item.before}
            after={item.after}
            correctAnswers={item.correctAnswers}
            isCorrect={item.isCorrect}
            checkMode={checkMode}
            typeWriteWord={typeWriteWord}
          />
        );
      })}
      <Button variant="outlined" type="button" onClick={handleApprove}>
        Отправить решение
      </Button>
    </>
  );
}
