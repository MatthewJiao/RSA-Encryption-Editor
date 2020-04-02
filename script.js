var lock1 = 6
var lock2 = 76
var key1 = 42
var charArray = []
var numArray = []
var encryptedNumArray = bigInt()
var encryptedMessageArray = []


function fn1(){
	var e = document.getElementById("e").value
	lock1 = e
	var n = document.getElementById("n1").value
	lock2 = n
	textToInt()
	encryptInt(lock1, lock2, charArray.length)
	displayEncryption(charArray.length)
}




function textToInt(){
	var str = document.getElementById("message1").value
	charArray = str.split("")
	for(var i = 0; i < charArray.length; i++){
		var number = charArray[i].charCodeAt(0) - 80
	//	if(number == -64){
	//		number = 0
	//	}
		numArray[i] = number 
	}	
	console.log("number array: " + numArray)
}

function encryptInt(e,n, length){
	for(var i = 0; i < length; i++){
		encryptedNumArray[i] = bigInt(numArray[i]).modPow(e,n)
		//encryptedNumArray[i] = Math.pow(numArray[i],e)%n

	}
	console.log("encrypted number array: " + encryptedNumArray)

	for(var i = 0; i < length; i++){
		encryptedMessageArray[i] = String.fromCharCode(encryptedNumArray[i]+80)
	}

	console.log("encrypted message: " + encryptedMessageArray)

}


function displayEncryption(length){
	var str = ""
	for(var i = 0; i < length; i++){
		str += encryptedMessageArray[i]
	}
		document.querySelector(".box .text1").innerText = str;
	
}

charArray2 = []
numArray2 = []
decryptedNumArray = []
decryptedMessageArray = []

function fn2(){
	var d = document.getElementById("d").value
	key1 = d
	var n = document.getElementById("n").value
	lock2 = n
	textToInt2()
	decrypt(key1, lock2, charArray2.length)
	displayDecryption(charArray2.length)

}



function textToInt2(){
	var str = document.getElementById("message2").value
	charArray2 = str.split("")
	for(var i = 0; i < charArray2.length; i++){
		var number = charArray2[i].charCodeAt(0) - 80

		numArray2[i] = number 
	}	
	console.log("number array2: " + numArray2)

}

function decrypt(d, n, length){

	for(var i = 0; i < length; i++){

		decryptedNumArray[i] = bigInt(numArray2[i]).modPow(d,n)
		//decryptedNumArray[i] = Math.pow(numArray2[i],d)%n

		}
	console.log("dencrypted number array: " + decryptedNumArray)

	for(var i = 0; i < length; i++){
	//	if(decryptedNumArray[i] == 0){
	//		decryptedMessageArray[i] = " "
	//		continue
	//	}
		decryptedMessageArray[i] = String.fromCharCode(decryptedNumArray[i]+80)
	}

	console.log("encrypted message: " + decryptedMessageArray)


}


function displayDecryption(length){
	var str = ""
	for(var i = 0; i < length; i++){
		str += decryptedMessageArray[i]
	}
		document.querySelector(".box .text2").innerText = str;
	
}

//var test = Number.MAX_SAFE_INTEGER
function keys(){
//	console.log(test)
	findPrime()
	selectPrimes()
	chooseE()
	chooseD()
	displayKey()
}

primes = []
var p = 0
var q = 0
var n 
var phi
var e
var d

function findPrime(){
	array = []
	n = 50
    for (var i = 2; i <= n; i++) {
        array[i] = true
    }

    for (var factor = 2; factor*factor <= n; factor++) {          
        if (array[factor]) {
            for (var j = factor; factor*j <= n; j++) {
                array[factor*j] = false
            }
        }
    }

      
    for (var i = 2; i <= n; i++) {
        if (array[i]) 
        	primes.push(i)
    }
}


function selectPrimes(){
	var bool = true
	while(bool){
		p = primes[Math.floor(Math.random() * primes.length)]; 
		q = primes[Math.floor(Math.random() * primes.length)]; 
		if (p*q>55 & p*q<100)
			bool = false
	}
	n = p*q
	phi = (p-1)*(q-1)
	console.log("p:" + p + " q:" + q)
	console.log("phi " + phi)

}

function chooseE(){
	//for(var i = 2; i < phi; i++){

	while(true){
		var i = Math.floor((Math.random() * phi-3) + 2);
		if(coprime(i)) {
			//console.log("coprime")
			e = i
			break
		}
	}
	//}
}

function coprime(i){
	for (var j = 2; j <= i; j++){
		if(i%j==0){
			if(phi%j==0)
				return false
		}
	}
	return true
}


function chooseD(){
	d = bigInt(e).modInv(phi)
	if(d>50 || e>50 || d<4 || e<4 || d==e){
		keys()
	}
	//if(checkKeys()){
	//	keys()
	//} 
	// this piece of code didn't work properly so I manually adjusted the ranges

}

function displayKey(){
	document.querySelector(".box2 .text3").innerText = "e:" + e + " n:" + n + " d:" + d;

}


function checkKeys(){ 
	try{
		for(var i = 32; i < 128; i++){
			var temp1 = bigInt(i).modPow(e,n)
			var temp2 = bigInt(temp1).modPow(d,n)
			if(i != temp2) {
				//console.log("false")
				return true
			}
		}
		return false
	} catch(err){
		return true
	}
}