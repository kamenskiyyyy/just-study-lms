import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import * as React from 'react';

export interface IChoiceFromList {
  id: number;
  before: string;
  after: string;
  answers: IAnswers[];
  handleChange?: any;
}

interface IAnswers {
  isCorrect: boolean;
  answer: string;
}

export function ChoiceFromListItem({ id, before, answers, after, handleChange }: IChoiceFromList) {
  return (
    <Typography variant="body1" display="flex" alignItems="center" sx={{ mt: 1, mb: 1 }}>
      {id}. {before}
      <FormControl sx={{ mr: 2, ml: 2 }}>
        <InputLabel sx={{ mt: -1 }} id={id.toString()}>
          Выберите
        </InputLabel>
        <Select
          size="small"
          sx={{ minWidth: 150 }}
          autoWidth={true}
          labelId={id.toString()}
          id={id.toString()}
          name={id.toString()}
          label="Выберите"
          onChange={handleChange}>
          {answers.map((answer) => {
            return <MenuItem value={answer.isCorrect ? 1 : 0}>{answer.answer}</MenuItem>;
          })}
        </Select>
      </FormControl>
      {after}
    </Typography>
  );
}
