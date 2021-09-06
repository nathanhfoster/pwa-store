import { createTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

// https://next.material-ui.com/customization/palette/
const theme = ({ mode }) => {
  return createTheme({
    overrides: {
      MuiCssBaseline: {
    '@global': {
      '::-webkit-scrollbar': {
        display: 'block',
        height: '0.5rem',
        width: '0.5rem',
        backgroundColor: 'inherit',
        '-webkit-border-radius': 6,
        borderRadius: 6,
        transition: '200ms linear',
      },
      '::-webkit-scrollbar-track-piece': {
        backgroundColor: 'inherit',
        borderRadius: 6
      },
      '::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 5px black',
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
        background: 'red',
        borderRadius: 6,
      
      },
      '::-webkit-scrollbar-thumb': {
        background:'inherit',
        backgroundColor: 'rgba(0,0,0,.1)',
        borderRadius: 6,
        outline: '1px solid slategrey'
      }
    }}},
    palette: {
      mode,
      primary: {
        light: '#38b6ff',
        main: '#3498db',
        dark: '#004aad'
      },
      info: {
        main: blue[200]
      }
    }
  });
};

export default theme;
