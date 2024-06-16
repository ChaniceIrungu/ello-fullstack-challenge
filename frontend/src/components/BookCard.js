import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Divider,
} from '@mui/material';
import { useReadingList } from '../store/ReadingListContext';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';

const students = [
  { id: 1, name: "Anthony" },
  { id: 2, name: "Alicia" },
  { id: 3, name: "Mary" },
];

const BookCard = ({ book }) => {
  const [open, setOpen] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const { addBookToReadingList } = useReadingList();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelectAll = (event) => {
    setSelectAll(event.target.checked);
    setSelectedStudents(event.target.checked ? students.map(student => student.id) : []);
  };

  const handleStudentChange = (event) => {
    const { checked, value } = event.target;
    const studentId = Number(value); // Convert value to number
    setSelectedStudents(prev => 
      checked ? [...prev, studentId] : prev.filter(id => id !== studentId)
    );
  };

  const handleAssign = () => {
    addBookToReadingList(book, selectedStudents);
    handleClose();
  };

  return (
    <>
      <Card>
        <CardMedia
          component="img"
          alt={book.title}
          height="200"
          image={`${process.env.PUBLIC_URL}/${book.coverPhotoURL}`}
          title={book.title}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Author: {book.author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Reading Level: {book.readingLevel}
          </Typography>
          <Box py={2}>
            <Button
              variant="contained"
              sx={{ backgroundColor: 'darkturquoise', color: 'white', '&:hover': { backgroundColor: 'steelblue' } }}
              onClick={handleOpen}
            >
              Assign Book
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          Assign Book to Student Reading List
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box display="flex" alignItems="center" mb={2}>
            <PeopleIcon />
            <FormControlLabel
              control={
                <Checkbox
                 
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              }
              label="Everyone"
            />
          </Box>
          <Divider />
          <FormGroup>
            {students.map(student => (
              <Box display="flex" alignItems="center" key={student.id}>
                <PersonIcon />
                <FormControlLabel
                  control={
                    <Checkbox
                      value={student.id}
                      checked={selectedStudents.includes(student.id)}
                      onChange={handleStudentChange}
                    />
                  }
                  label={student.name}
                />
              </Box>
            ))}
          </FormGroup>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ justifyContent: 'space-between', p: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAssign} variant="contained"     sx={{
                backgroundColor: 'darkgoldenrod',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'gold',
                },
              }}>
            Assign
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookCard;
