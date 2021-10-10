import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';

export interface IChoiceFromList {
  id: number;
  before: string;
  after: string;
  answers: string[];
  correctAnswers: string[];
  userAnswer?: string;
  checkMode?: any;
  isCorrect: boolean;
  handleChange?: any;
  typeChangeWords: ITypeChoiceFromList[];
}

export interface ITypeChoiceFromList {
  id: number;
  before: string;
  after: string;
  answers: string[];
  correctAnswers: string[];
  userAnswer?: string;
  isCorrect: boolean;
}

export function ChoiceFromListItem({
  id,
  before,
  answers,
  after,
  checkMode,
  correctAnswers,
  isCorrect,
  typeChangeWords,
}: IChoiceFromList) {
  // @ts-ignore
  const task: ITypeChoiceFromList = typeChangeWords.find((item) => item.id === id);
  const [value, setValue] = useState<string>(task.userAnswer || '');

  useEffect(() => {
    task.isCorrect = correctAnswers.includes(value);
  }, [value]);

  function choiceHandler(e: SelectChangeEvent) {
    const answer = e.target.value;
    setValue(answer);
    task.userAnswer = answer;
    console.log(value);
  }

  return (
    <Box display="flex" alignItems="center" flexWrap="wrap" sx={{ mt: 1, mb: 1 }}>
      <Typography variant="body1">
        {id}. {before}
      </Typography>
      <FormControl sx={{ mr: 2, ml: 2 }} error={checkMode && !isCorrect}>
        <InputLabel sx={{ mt: -1 }} id={id.toString()}>
          Выберите
        </InputLabel>
        <Select
          sx={{ minWidth: 150 }}
          autoWidth={true}
          disabled={checkMode}
          size="small"
          value={value}
          labelId={id.toString()}
          id={id.toString()}
          name={id.toString()}
          label="Выберите"
          onChange={choiceHandler}>
          helperText={'Неправильный ответ'}
          {answers.map((answer) => {
            return (
              <MenuItem key={answer} value={answer}>
                {answer}
              </MenuItem>
            );
          })}
        </Select>
        {checkMode && !isCorrect && <FormHelperText>Неправильный ответ</FormHelperText>}
      </FormControl>
      <Typography variant="body1">{after}</Typography>
    </Box>
  );
}
