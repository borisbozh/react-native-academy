const fib = {
    [Symbol.iterator](start = 0, step = 1, to = 1000){
        let cur = start, sum = step;
        return{
            next(){
                [cur, sum] = [cur + sum, cur];
                return{
                    value: cur,
                    done: cur > to
                }
            }
        }
    }
}

for (const e of fib){
    console.log(e);
}

console.log(`Second sequence`)


const fibgen = {
    [Symbol.iterator]:function*(start = 0, step = 1, to = 1000){
        let cur = start, sum = step;
        for (let i = 0; i < 20; i++) {
            if (cur < 1000) yield cur;
            [cur, sum] = [cur + sum, cur];
            }
        }
    }

for (const e of fibgen){
    console.log(e);
}