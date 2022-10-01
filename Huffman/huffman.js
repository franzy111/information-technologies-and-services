let fs = require("fs");
let arg = process.argv;
let inpStr;
try{
	inpStr = fs.readFileSync(arg[2]).toString();
}catch (err){
	console.log(err);
}




function Node(letter, freq, used, father, code){
	this.letter = letter;
	this.freq = freq;
	this.used = used;
	this.father = father;
	this.code = code;
};

//let n1 = new Node('a', 5, 0, null, '');
//let n2 = new Node('b', 2, 0, null, '');

//let inpStr = 'i love JS';
let alph = new Array();

for(i = 0; i < inpStr.length; i++){
    if (inpStr.charAt(i) in alph){
        alph[inpStr.charAt(i)]++;
    }
    else{
        alph[inpStr.charAt(i)] = 1;
    }
}

let tree = new Array();
for (i in alph){
	let n = new Node(i, alph[i], 0, null, '');
	tree.push(n);
}
//console.log(tree, tree.length);
let treeLength = tree.length;
let encodedStr = '';
let allCodes = new Array();
if (treeLength == 1){
	tree[0].code = '0';
	allCodes[tree[0].letter] = '0';
}
//console.log(encodedStr);
else{
	for (let i = 0; i < treeLength - 1; i++){
		let minFreqFirst = Infinity, minFreqSecond = Infinity;
		let id1, id2;
		for (let j = 0; j < tree.length; j++){
			if ((tree[j].used == 0) && (tree[j].freq < minFreqFirst)){
				minFreqFirst = tree[j].freq;
				id1 = j;
			}
		}
		tree[id1].used = true;
		tree[id1].code = '0';
		tree[id1].father = tree.length;
		for (let k = 0; k < tree.length; k++){
			if ((tree[k].used == 0) && (tree[k].freq < minFreqSecond)){
				minFreqSecond = tree[k].freq;
				id2 = k;
			}
		}
		tree[id2].used = true;
		tree[id2].code = '1';
		tree[id2].father = tree.length;
		let a = new Node(tree[id1].letter + tree[id2].letter, tree[id1].freq + tree[id2].freq, 0, null, '');
		tree.push(a);
	}
	for (let l = 0; l < treeLength; l++){
		let ind = l;
		allCodes[tree[ind].letter] = '';
		while (tree[ind].father != null){
			allCodes[tree[l].letter] = tree[ind].code + allCodes[tree[l].letter];
			ind = tree[ind].father;
		}
	}
}
// console.log(tree);
// console.log(allCodes);
let codeRes = ''
for (i in inpStr){
	codeRes += allCodes[inpStr.charAt(i)];
}
console.log(codeRes);
//Decode 
let decodeRes = ''
let elemnt = ''
for (let i = 0; i < codeRes.length; i++){
	elemnt += codeRes.charAt(i);
	for (j in allCodes){
		if (elemnt == allCodes[j]){
			decodeRes += j;
			elemnt = '';
		}
	}
}
console.log(decodeRes)