const myIterable = {
    [Symbol.iterator](from = 0, to = 10){
        let i = from;
        return{
            next(){
                i++
               return{
                    value: i,
                    done: i > to 
                }
            }
        }
    }
}

for (const e of myIterable){
    console.log(e);
}

const fib = {
    [Symbol.iterator](){
        let cur = 0, sum = 1;
        return{
            next(){
                [cur, sum] = [cur + sum, cur];
                return{
                    value: cur,
                    done: cur > 1000
                }
            }
        }
    }
}

for (const e of fib){
    console.log(e);
}