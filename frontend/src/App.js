// import logo from './logo.svg';
import './App.css';
import { ThemeProvider,CssBaseline } from '@mui/material';
import { ReadingListProvider } from './store/ReadingListContext';
import BrowseBooks from './components/BrowseBooks';
import theme from './theme';

function App() {
  return (
    <div className="App">
       <ReadingListProvider>
       <ThemeProvider theme={theme}>
       <CssBaseline />
       <BrowseBooks/>
       </ThemeProvider>
       </ReadingListProvider>
     
    </div>
  );
}

export default App;
