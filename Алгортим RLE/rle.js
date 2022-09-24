let arg = process.argv;
function code(){
	let fs = require('fs');
	
	let inText, newText = '';
	let i = 0, n = 1;

	inText = fs.readFileSync(arg[3]);
	inText = inText.toString();

	while (i < inText.length){
		while(inText.charAt(i) == inText.charAt(i+n) && n < 255)
			n++;
		if (n < 4 && inText.charAt(i) != String.fromCharCode(35)){
			newText += inText.charAt(i).repeat(n);
		}
		if (inText.charAt(i) == String.fromCharCode(35)){
			newText += `#${String.fromCharCode(n)}#`;
		}
		if (n >= 4 && inText.charAt(i) != String.fromCharCode(35)){
			newText += `#${String.fromCharCode(n)}${inText.charAt(i)}`;
		}
		i += n;
		n = 1;
	}
	fs.writeFileSync(arg[4], newText)
}
function decode() {
	let fs = require('fs');
	
	let inText, newText = '';
	let i = 0, n = 1;

	inText = fs.readFileSync(arg[3]);
	inText = inText.toString();

	while (i < inText.length){
		if (inText.charAt(i) == String.fromCharCode(35)){
			symbol = inText.charCodeAt(i+1);
			newText += inText.charAt(i+2).repeat(symbol);
			i += 3;
		}else{
			newText += inText.charAt(i)
			i++;
		}
	}
	fs.writeFileSync(arg[4], newText)
}
if (arg[2] == "code"){
	code();
}else if (arg[2] == "decode"){
	decode();
}else{
	console.log("I cant do it");
}