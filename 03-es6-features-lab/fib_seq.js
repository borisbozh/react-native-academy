const fib = (to=20) => ({
    [Symbol.iterator](start = 0, step = 1){
        let cur = start, sum = step, index=0;
        return{
            next(){
                index ++
                [cur, sum] = [cur + sum, cur];
                return{
                    value: cur,
                    done: index > to
                }
            }
        }
    }
})

for (const e of fib(15)){
    console.log(e);
}

console.log(`Second sequence`)


const fibgen = {
    [Symbol.iterator]:function*(start = 0, step = 1, to = 1000){
        let cur = start, sum = step;
        for (let i = 0; i < 20; i++) {
            if (cur < to) yield cur;
            [cur, sum] = [cur + sum, cur];
            }
        }
    }

for (const e of fibgen){
    console.log(e);
}