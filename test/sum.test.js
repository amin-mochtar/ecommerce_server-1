const sum = require('../helper/sum.js')// membuat test sum di helper 

test('deskripsi testing' ,() => {
    expect(sum(1,2)).toBe(3)
})


// using matches 
// to equal 
// mengecek value menggunakan to equal
test('test object assigment', () => {
    const data = {
        one:1
    }
    data['two'] = 2
    expect(data).toEqual({one:1, two:2})
})

//check thrutiness

test('deskripsi testing cek truthiness' ,() => {
    const n = null;

    expect(n).toBeNull()
    expect(n).toBeDefined()
    expect(n).not.toBeUndefined() //bukan undefined
})

test('but is there "stop" in chripon' ,() => {
   
})