import { useState, useEffect} from "react";
import { getRandomFact} from "../services/facts";

export function useCatFact(){
    const [fact, setFact] = useState();

    const onGetRandomFact = () =>{
        getRandomFact()
        .then((fact) => fact && setFact(fact))
    }

    useEffect(onGetRandomFact, []);
    return {fact, onGetRandomFact};
}