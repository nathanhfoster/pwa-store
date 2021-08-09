import { useState, useEffect } from 'react';
import { useBooleanReducer } from 'resurrection';
import Axios from 'axios';

const useFavIcon = (initialUrl = '', size = 128) => {
  const [loading, toggleLoading] = useBooleanReducer(false);
  const [tests, setTests] = useState([]);
  const [url, setTargetUrl] = useState(initialUrl);

  useEffect(() => {
    const getLightHouseData = async (url) => {
      try {
        toggleLoading();
        const { status, data } = await Axios.request({
          url: `https://www.google.com/s2/favicons?sz=${size}&domain_url=${url}`,
          method: 'GET',
          withCredentials: false,
          headers: {
            Accept: 'application/json'
          }
        });

        console.log(status);

        if (status === 200) {
          if (data) {
            console.log(data);
          } else {
            console.error(`No manifest result`);
          }
        }
      } catch (e) {
        console.error(`Issue getting manifest data: ${JSON.stringify(e.data)}`);
      }
      toggleLoading();
    };
    if (url) {
      getLightHouseData(url);
    }
  }, [url]);

  return [loading, tests, setTargetUrl];
};

export default useFavIcon;
