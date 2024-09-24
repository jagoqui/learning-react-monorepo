import { useEffect, useState } from 'react';
import { getCatImageData} from "../services/facts";

export function useCatImage({fact}){
    const [imageUrl, setImageUrl] = useState();
    
    useEffect(() => {
        if(!fact) return;
       getCatImageData(fact)
        .then((data) => data && setImageUrl(data.url))
    }, [fact]);
    return {imageUrl}
}