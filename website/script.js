function initObject (fread){
	let obj = { '': {} };

	for (let i = 0; i < fread.length; i++) {
		if (i >= fread.length - 1) {
			break;
		}
		obj[''][fread[i]] = obj[''][fread[i]] || 1;
		obj[''][fread[i]] += 1;

		obj[fread[i]] = obj[fread[i]] || {};
		obj[fread[i + 1]] = obj[fread[i + 1]] || {};
		obj[fread[i]][fread[i + 1]] = obj[fread[i]][fread[i + 1]] || 1;
		obj[fread[i]][fread[i + 1]] += 1;
	}

	return obj;
}

function arrcount (array, celem){
	var count = 0;
	for (var i = 0; i < array.length; i++) {
		if (array[i] == celem) count++;
	}
	return count;
}

function choices (population, weights = None){
	let len = population.length;
	if (len != weights.length) {
		throw new Error('Weights length is not equal to population length');
	}
	let sum = weights.reduce((a, b) => a + b, 0);
	weights = weights.map((el) => el / sum);

	population.sort(
		(a, b) =>
			weights[population.indexOf(a)] - weights[population.indexOf(b)],
	);
	weights.sort();

	randsome = Math.random();
	let _sum = 0;
	for (let i = 0; i < weights.length; i++) {
		_sum += weights[i];
		if (randsome < _sum) {
			return population[i];
		}
	}
}

function next (char, obj){
	return choices(Object.keys(obj[char]), Object.values(obj[char]));
}

function btnPress (){
	let object = initObject($('#input-learn').val());
	console.log(new Date(), 'object:', object);
	let char = '';
	let chars = '\n';
	for (let i = 0; (i < 1000 && char != '\n') || !chars.trim(); i++) {
		char = next(char, object);
		chars += char;
	}
	console.log(chars);
	$('#word').html(chars);
	var msg = new SpeechSynthesisUtterance();
	msg.lang = 'de';
	msg.text = chars;
	window.speechSynthesis.speak(msg);
}
// with open("saves.txt", "w", encoding="utf-8") as f:
// 	for cchar in sorted(sorted(set("".join(cchars).split("\n"))), key=lambda x: len(x)):
// 		print(cchar, file=f)
