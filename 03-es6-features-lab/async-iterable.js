const LIMIT = 10;


const asyncIterable = {
    [Symbol.asyncIterator](){
        let i = 0;
        return{
            next(){
                const done = i >= LIMIT;
                const value = done ? undefined : i++;
                return Promise.resolve({value, done})
            }
        }
    }
};

// async function* numberGen(number){
//     try{
//         for(let i = 0; i < number; i++){
//             yield new Promise((resolve, reject) => {
//                 setTimeout(resolve, 500, i)
//             });
//         }
//     } finally {
//         console.log(`Cleaning up`)
//     }
// }

(async ()=> {
    try{
        for await (const num of asyncIterable){
            console.log(num)
        }
    } catch(err){
        console.log(`error`)
    }
}) ();