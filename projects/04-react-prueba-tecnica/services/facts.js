const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'
const CAT_ENDPOINT_IMAGE_URL = (word) =>  `${CAT_PREFIX_IMAGE_URL}/cat/gif/says/${word}?size=50&color=red&json=true`;

export const getRandomFact = () =>
    fetch(CAT_ENDPOINT_RANDOM_FACT)
    .then(async (res) => {
        if(!res.ok){
            throw new Error('Fail searching cat fact');
        }
        const data = await res.json()
        return data?.fact || null;
    })


export const getCatImageData = (fact) => {
    const threeFirstWords = fact.split(' ', 3).join(' ');
    const uri = CAT_ENDPOINT_IMAGE_URL(threeFirstWords);
    return fetch(uri)
        .then((res) => {
            if(!res.ok){
                throw new Error('Fail searching image cata data');
            }
            const url = `cat/gif/says/${threeFirstWords}?fontSize=50&fontColor=red`
            return { url: `${CAT_PREFIX_IMAGE_URL}/${url}` }
        })
    }
