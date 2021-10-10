import { FormControl, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';
import { ITypeWriteWord } from '../../../pages/Homeworks/Homework/HomeWork.page';

export interface IWriteWordItem {
  id: number;
  before: string;
  after: string;
  correctAnswers: string[];
  userAnswer?: string;
  isCorrect: boolean;
  checkMode?: any;
  handleChange?: any;
  typeWriteWord: ITypeWriteWord[];
}

export function WriteWordItem({
  id,
  before,
  after,
  correctAnswers,
  checkMode,
  isCorrect,
  typeWriteWord,
}: IWriteWordItem) {
  const block = typeWriteWord.find((item) => item.id === id);
  // @ts-ignore
  const [value, setValue] = useState<string>(block.userAnswer);

  useEffect(() => {
    console.log(checkMode);
  }, [checkMode]);

  useEffect(() => {
    // @ts-ignore
    block.isCorrect = correctAnswers.includes(value as string);
  }, [value]);

  function choiceHandler(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value.toString().toLowerCase().trim());
    // @ts-ignore
    block.userAnswer = e.target.value.toString().toLowerCase().trim();
  }

  return (
    <Typography variant="body1" display="flex" alignItems="center" sx={{ mt: 1, mb: 1 }}>
      {id}. {before}
      <FormControl sx={{ mr: 2, ml: 2 }}>
        <TextField
          autoComplete="off"
          disabled={checkMode}
          error={checkMode && !isCorrect}
          id={id.toString()}
          name={id.toString()}
          size="small"
          sx={{ minWidth: 150 }}
          label="Впишите слово"
          onChange={choiceHandler}
          variant="outlined"
          helperText={checkMode && !isCorrect && 'Неправильный ответ'}
        />
      </FormControl>
      {after}
    </Typography>
  );
}
