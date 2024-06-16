import React from 'react';
import { TextField, MenuItem, Grid,InputAdornment } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

const FilterByLevel = ({ filterReadingLevel, setFilterReadingLevel, uniqueReadingLevels }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          select
          label="Filter by Reading Level"
          value={filterReadingLevel}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FilterAltOutlinedIcon />
              </InputAdornment>
            ),
          }}
          onChange={e => setFilterReadingLevel(e.target.value)}
        
        >
          <MenuItem value="">All Reading Levels</MenuItem>
          {uniqueReadingLevels.map((level, index) => (
            <MenuItem key={index} value={level}>
              {level}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
};

export default FilterByLevel;
