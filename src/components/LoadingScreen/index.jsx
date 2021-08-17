cont containerStyles = {
   zIndex: 9999,
   position: 'absolute',
   top: 0,
   bottom: 0,
   left: 0,
   right: 0,
   display: 'flex',
   justifyContent: 'center',
   alignContent: 'center'
};

const imageStyles = {
   maxHeight: '100vh',
   maxWidth: '100vw'
};

const AppIcon = `${process.env.PUBLIC_URL}/assets/android-chrome-512x512.png`;

const LoadingScreen = () => <div style={containerStyles}><img src={AppIcon} style={imageStyles} /></div>;

export default LoadingScreen;
