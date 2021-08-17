cont containerStyles = {
   zIndex: 9999,
   position: 'absolute',
   top: 0,
   bottom: 0,
   left: 0,
   right: 0,
   display: 'flex',
   justifyContent: 'center',
   alignContent: 'center',
   backgroundImage: 'radial-gradient(circle, #004aad, #0059b8, #0068c1, #0077ca, #1785d2, #218ed8, #2b96de, #359fe4, #36a5eb, #37aaf1, #37b0f8, #38b6ff)'
}

const imageStyles = {
   maxHeight: '100vh',
   maxWidth: '100vw'
};

const AppIcon = `${process.env.PUBLIC_URL}/assets/android-chrome-512x512.png`;

const LoadingScreen = () => <div style={containerStyles}><img src={AppIcon} style={imageStyles} /></div>;

export default LoadingScreen;
