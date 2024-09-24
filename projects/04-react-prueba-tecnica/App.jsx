import './App.css';
import './services/errorRequestsInterceptor';
import { useCatImage } from "./hooks/useCatImage";
import { useCatFact } from './hooks/useCatFact';

export function App(){
    const {fact, onGetRandomFact} = useCatFact();
    const {imageUrl} = useCatImage({fact});

    return (
        <main>
            <h1>App de gaticos</h1>

            <button onClick={onGetRandomFact}>Get new fact</button>
            {fact && <p>{fact}</p>}
            {imageUrl && <img src={imageUrl} alt={`Image extracted using first three words for ${fact}`}/>}
        </main>
    )
}