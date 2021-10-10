import { Box, FormControl, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';

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

export interface ITypeWriteWord {
  id: number;
  before: string;
  after: string;
  correctAnswers: string[];
  userAnswer?: string;
  isCorrect: boolean;
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
  // @ts-ignore
  const task: ITypeWriteWord = typeWriteWord.find((item) => item.id === id);
  const [value, setValue] = useState<string>(task.userAnswer || '');

  useEffect(() => {
    task.isCorrect = correctAnswers.includes(value.trim() as string);
  }, [value]);

  function choiceHandler(e: ChangeEvent<HTMLInputElement>) {
    const answer = e.target.value.toString().toLowerCase();
    setValue(answer);
    task.userAnswer = answer;
  }

  return (
    <Box display="flex" alignItems="center" flexWrap="wrap" sx={{ mt: 1, mb: 1 }}>
      <Typography variant="body1">
        {id}. {before}{' '}
      </Typography>
      <FormControl sx={{ mr: 2, ml: 2 }}>
        <TextField
          autoComplete="off"
          disabled={checkMode}
          error={checkMode && !isCorrect}
          id={id.toString()}
          name={id.toString()}
          value={value}
          size="small"
          // sx={{ minWidth: 150 }}
          label="Впишите слово"
          onChange={choiceHandler}
          variant="outlined"
          helperText={checkMode && !isCorrect && 'Неправильный ответ'}
        />
      </FormControl>
      <Typography variant="body1">{after}</Typography>
    </Box>
  );
}
