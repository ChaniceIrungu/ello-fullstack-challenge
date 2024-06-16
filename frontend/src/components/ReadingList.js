import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  ListItemSecondaryAction,
  Collapse,
  Box,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import { useReadingList } from "../store/ReadingListContext";

const students = [
  { id: 1, name: "Anthony" },
  { id: 2, name: "Alicia" },
  { id: 3, name: "Mary" },
];

const colors = ["#f0f8ff", "#e6e6fa", "#ffe4e1"];

const ReadingList = () => {
  const { readingList, removeBookFromReadingList } = useReadingList();
  const [open, setOpen] = React.useState({});
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClick = (index) => {
    setOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  if (readingList.length === 0) {
    return (
      <Box py={2}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/summer-icon.svg`}
          alt="summer icon"
        />
        <Typography variant="h2" align="center" py={2}>
          OOPS! No Books in Your Reading List
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" p={isSmallScreen ? 1 : 2}>
      <Paper
        elevation={3}
        style={{
          width: isSmallScreen ? "100%" : "80%",
          padding: isSmallScreen ? "10px" : "20px",
        }}>
        <Typography variant="h3" component="div" gutterBottom align="center">
          Teacher's Reading List
        </Typography>
        <List>
          {readingList.map((book, index) => (
            <React.Fragment key={index}>
              <ListItem
                button
                onClick={() => handleClick(index)}
                style={{ backgroundColor: colors[index % colors.length] }}>
                <ListItemText
                  primary={
                    <Typography
                      variant={isSmallScreen ? "h6" : "h5"}
                      component="div">
                      {book.title}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant={isSmallScreen ? "body2" : "body1"}
                      color="text.secondary">
                      Author: {book.author} | Reading Level: {book.readingLevel}
                    </Typography>
                  }
                />
                {open[index] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {book.students.map((studentId) => {
                    const student = students.find((s) => s.id === studentId);
                    return (
                      <ListItem
                        key={student.id}
                        style={{ paddingLeft: 32, backgroundColor: "#f5f5f5" }}>
                        <ListItemText primary={student.name} />
                        <ListItemSecondaryAction>
                          <Button
                            variant="contained"
                            sx={{ backgroundColor: "darkturquoise" }}
                            size={isSmallScreen ? "small" : "medium"}
                            onClick={() =>
                              removeBookFromReadingList(book, studentId)
                            }
                            startIcon={<DeleteIcon />}>
                            from {student.name}
                          </Button>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                  <ListItem
                    style={{
                      paddingLeft: 32,
                      marginTop: 10,
                      marginBottom: 15,
                    }}>
                    <ListItemSecondaryAction>
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "darkturquoise" }}
                        size={isSmallScreen ? "small" : "medium"}
                        startIcon={<DeleteIcon />}
                        onClick={() => removeBookFromReadingList(book)}>
                        Book
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default ReadingList;
