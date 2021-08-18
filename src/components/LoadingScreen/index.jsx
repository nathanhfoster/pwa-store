import Box from '@material-ui/core/Box';
const ICON_SIZE = 375;

const containerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  zIndex: 2,
  overflow: 'hidden',
  height: '100vh',
  width: '100vw',
  background: '#004aad'
};

const imageStyles = {
  height: ICON_SIZE,
  width: ICON_SIZE,
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)'
};

const AppIcon = `${process.env.PUBLIC_URL}/assets/icon.png`;

const LoadingScreen = () => (
  <Box sx={containerStyles}>
    <img src={AppIcon} style={imageStyles} alt='Loading Screen' />
  </Box>
);

export default LoadingScreen;
