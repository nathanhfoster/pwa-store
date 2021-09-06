import { createTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

// https://next.material-ui.com/customization/palette/
const theme = ({ mode }) =>
  createTheme({
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

export default theme;
