import React from 'react';
import { TextField, Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchInput = ({ value, onChange }) => {
  return (
    <Box py={4}>
      <TextField
        fullWidth
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search by Title"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchInput;
