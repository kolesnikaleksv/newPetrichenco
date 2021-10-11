// generator functions
// Functions like this give us the result sequentially.
// Each time the next result

    function* generator() { // syntax - function*
        yield 's';
        yield 't';
        yield 'h';
        yield ',';
        yield 'm';
        yield 'a';
        yield 'u';
    }

    const str = generator();

    console.log(str.next());
    console.log(str.next());
    console.log(str.next());
    console.log(str.next());
    console.log(str.next());
    console.log(str.next());
    console.log(str.next());
    console.log(str.next());


// in console we receive:
// { value: 's', done: false }
// { value: 't', done: false }
// { value: 'h', done: false }
// { value: ',', done: false }
// { value: 'm', done: false }
// { value: 'a', done: false }
// { value: 'u', done: false }
// { value: undefined, done: true }

//we can receive only a value

    function* generator() { // syntax - function*
        yield 's';
        yield 't';
        yield 'h';
        yield ',';
        yield 'm';
        yield 'a';
        yield 'u';
    }

    const str = generator();

    console.log(str.next().value);
    console.log(str.next());
    console.log(str.next());
    console.log(str.next());