function* numberGen(){
    let i = 0;
    while (i<10){
        yield i++
    }
}

// for (const num of numberGen()){
//     console.log(num)
// }


// (async ()=> {
//     for await (const num of numberGen()){
//         console.log(num)
//     }
// });

async function* numberGen(number){
    try{
        for(let i = 0; i < number; i++){
            yield new Promise((resolve, reject) => {
                setTimeout(resolve, 500, i)
            });
        }
    } finally {
        console.log(`Cleaning up`)
    }
}

(async ()=> {
    try{
        for await (const num of numberGen(5)){
            console.log(num)
        }
    } catch(err){
        console.log(`error`)
    }
}) ();