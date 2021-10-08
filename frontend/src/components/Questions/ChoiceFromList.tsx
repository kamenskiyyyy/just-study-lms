import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import * as React from 'react';

export interface IChoiceFromList {
  id: number;
  before: string;
  after: string;
  answers: IAnswers[];
}

interface IAnswers {
  isCorrect: boolean;
  answer: string;
}

export function ChoiceFromList({ id, before, answers, after }: IChoiceFromList) {
  const [value, setValue] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  return (
    <Typography variant="body1" display="flex" alignItems="center" sx={{ mt: 1, mb: 1 }}>
      {id}. {before}
      <FormControl sx={{ mr: 2, ml: 2 }}>
        <InputLabel id="demo-simple-select-label">Выберите</InputLabel>
        <Select
          sx={{ minWidth: 150 }}
          autoWidth={true}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Выберите"
          onChange={handleChange}>
          {answers.map((answer) => {
            return <MenuItem value={answer.isCorrect ? 10 : 0}>{answer.answer}</MenuItem>;
          })}
        </Select>
      </FormControl>
      {after}
    </Typography>
  );
}
