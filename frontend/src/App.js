// import logo from './logo.svg';
import './App.css';
import { ThemeProvider,CssBaseline } from '@mui/material';
import { ReadingListProvider } from './store/ReadingListContext';
import BrowseBooks from './components/BrowseBooks';
import theme from './theme';

function App() {
  // const theme = createTheme({
  //   typography: {
  //     subtitle1: {
  //       fontSize: 12,
  //     },
  //     body1: {
  //       fontWeight: 500,
  //     },
  //     button: {
  //       fontStyle: 'italic',
  //     },
  //   },
  // });
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
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
