const sum = (a, b) => {
    if (a && b) {
        return a + b
    }
    // throw new Error('Invalid Agument')
}

try {
    console.log(sum(1))
} catch (error) {
    console.log('Errors Sum')
    // console.log(error)
}

console.log('hello')