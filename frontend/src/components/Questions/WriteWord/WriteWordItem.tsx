import { FormControl, TextField, Typography } from '@mui/material';
import * as React from 'react';

export interface IWriteWordItem {
  id: number;
  before: string;
  after: string;
  answers: string[];
  handleChange?: any;
}

export function WriteWordItem({ id, before, after, handleChange }: IWriteWordItem) {
  return (
    <Typography variant="body1" display="flex" alignItems="center" sx={{ mt: 1, mb: 1 }}>
      {id}. {before}
      <FormControl sx={{ mr: 2, ml: 2 }}>
        <TextField
          id={id.toString()}
          size="small"
          sx={{ minWidth: 150 }}
          label="Впишите слово"
          onChange={handleChange}
          variant="outlined"
        />
      </FormControl>
      {after}
    </Typography>
  );
}
