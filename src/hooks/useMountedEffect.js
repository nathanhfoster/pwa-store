import { useEffect } from 'react';
import { useMounted } from 'resurrection';

const useMountedEffect = (callback, dependencies) => {
   const mounted = useMounted();
   
   useEffect(() => mounted ? callback(mounted) : {}, dependencies);
}

export default useMountedEffect;
