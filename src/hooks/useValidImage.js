import { useEffect, useState } from 'react';

const useValidImage = (imageSrc) => {
  const [src, setSrc] = useState(imageSrc);

  useEffect(() => {
    if (src !== imageSrc) {
      let image = document.createElement('img');
      image.src = imageSrc;
      image.onload = () => {
        setSrc(imageSrc);
      };
      image.onerror = () => {
        setSrc('');
      };
      // Set non-editable to avoid focus and move outside of view
      image.setAttribute('readonly', '');
      document.body.appendChild(image);
      document.body.removeChild(image);
    }
  }, [imageSrc, src]);

  return Boolean(src);
};

export default useValidImage;
