const containerStyles = {
  zIndex: 2,
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  background: #004aad
};

const imageStyles = {
  maxWidth: '100vw'
};

const AppIcon = `${process.env.PUBLIC_URL}/assets/icon.png`;

const LoadingScreen = () => (
  <div style={containerStyles}>
    <img src={AppIcon} style={imageStyles} alt='Loading Screen' />
  </div>
);

export default LoadingScreen;
