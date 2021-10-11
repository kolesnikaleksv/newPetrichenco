// generator functions
// Functions like this give us the result sequentially.
// Each time the next result

    // function* generator() { // syntax - function*
    //     yield 's';
    //     yield 't';
    //     yield 'h';
    //     yield ',';
    //     yield 'm';
    //     yield 'a';
    //     yield 'u';
    // }

    // const str = generator();

    // console.log(str.next());
    // console.log(str.next());
    // console.log(str.next());
    // console.log(str.next());
    // console.log(str.next());
    // console.log(str.next());
    // console.log(str.next());
    // console.log(str.next());


// in console we receive:
// { value: 's', done: false }
// { value: 't', done: false }
// { value: 'h', done: false }
// { value: ',', done: false }
// { value: 'm', done: false }
// { value: 'a', done: false }
// { value: 'u', done: false }
// { value: undefined, done: true }

//This function receive to us an object

//we can receive only a value

    // function* generator() { // syntax - function*
    //     yield 's';
    //     yield 't';
    //     yield 'h';
    //     yield ',';
    //     yield 'm';
    //     yield 'a';
    //     yield 'u';
    // }

    // const str = generator();

    // console.log(str.next().value);
    // console.log(str.next());
    // console.log(str.next());
    // console.log(str.next());

// we receive:
// s
// { value: 't', done: false }
// { value: 'h', done: false }
// { value: ',', done: false }

// Automatic output generation
    // function* count(n) { // syntax - function*
    //     for(let i = 0; i < n; i++) {
    //         yield i;
    //     }
    // }

    // const counter = count(7);

    // console.log(counter.next().value);
    // console.log(counter.next().value);
    // console.log(counter.next().value);

//automatic start generator function
//we can use the construction of enumerating
    function* count(n) { // syntax - function*
        for(let i = 0; i < n; i++) {
            yield i;
        }
    }

    for(let k of count(7)) {
        console.log(k);
    };
// we receive
// 0
// 1
// 2
// 3
// 4
// 5
// 6