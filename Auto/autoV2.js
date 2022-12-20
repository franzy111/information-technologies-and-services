let fs = require('fs'), arg = process.argv;
let str, substr;
try{
    str = fs.readFileSync(arg[2]).toString();
    substr = fs.readFileSync(arg[3]).toString();
}catch (err) {
    console.log(err);
}
let substrLength = substr.length;
let alph = new Array();
for(let i = 0; i < substrLength; i++)
    alph[substr.charAt(i)]=0
let del = new Array(substrLength + 1);
for(let i = 0; i <= substrLength; i++)
    del[i]=new Array()
for(ind in alph)
    del[0][ind] = 0
for(let j = 0; j < substrLength; j++){
    let prev = del[j][substr.charAt(j)]
    del[j][substr.charAt(j)]=j+1
    for(i in alph)
        del[j + 1][i]=del[prev][i]
}
let state = 0;
let positions = new Array();
for (let i = 0; i < str.length; i++){
    if (str.charAt(i) in alph)
        state = del[state][str.charAt(i)]
    else
        state = 0
    if (state == substrLength)
        positions.push(i - substrLength + 1)
}
console.log(positions)