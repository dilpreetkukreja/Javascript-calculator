let calculator = document.querySelector(".calculator");
let display = document.querySelector(".calculator__display");
let calculator__keys = document.querySelector(".calculator__keys");
let clear = document.getElementById("clear");
let secondValue;

function handleClick(e){
	let action = e.target.dataset.action;

	function calculate(first, operator, second){
		
		let firstValue = parseFloat(first);
		let secondValue = parseFloat(second);
		let result;
		if(operator==="add"){
			result = firstValue+secondValue;
		}
		if(operator==="subtract"){
			result = firstValue-secondValue;	
		}
		if(operator==="divide"){
			result = firstValue/secondValue;	
		}
		if(operator==="multiply"){
			result = firstValue*secondValue;	
		}
		//counting number of digits after decimal
		Number.prototype.countDecimals = function () {
		    if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
		    return this.toString().split(".")[1].length || 0; 
		}
		//display.textContent = result.toFixed(4);
		if(result.toString().includes(".")&&result.countDecimals()>4){
			return result.toFixed(4);
		}
		else
			return result;
		
	}
	
	if(!action){
		console.log("Number");
		if(display.textContent==="0"||calculator.dataset.previousKeyType==="operator"||calculator.dataset.previousKeyType==="calculate"){
			//calculator.dataset.previousKeyType="";
			display.textContent = e.target.textContent;
		}
		else
			display.textContent+=e.target.textContent;
		calculator.dataset.previousKeyType = "Number";
	}
	if(action==="add"||action==="subtract"||action==="multiply"||action==="divide"){
		 console.log(action);
		 Array.from(e.target.parentNode.children).forEach(elem=>elem.classList.remove('is-depressed'));
		 e.target.classList.add('is-depressed');
		 if(calculator.dataset.firstValue&&calculator.dataset.operator&&calculator.dataset.previousKeyType==="Number"){
		 	let calValue = calculate(calculator.dataset.firstValue,calculator.dataset.operator,display.textContent);
		 	calculator.dataset.firstValue = calValue;
		 	display.textContent = calValue;
		 }
		 else{
		 	calculator.dataset.firstValue = display.textContent;
		 }
		 console.log("first",calculator.dataset.firstValue);
		 calculator.dataset.operator = action;
		 calculator.dataset.previousKeyType = "operator";
		 

	}
	if(action==="decimal"){
		console.log("decimal");
		if(!display.textContent.includes(".")&&calculator.dataset.previousKeyType === 'Number'||display.textContent==="0")
		display.textContent+=".";
		else if (calculator.dataset.previousKeyType === 'operator'||calculator.dataset.previousKeyType === 'calculate') {
	    	display.textContent = '0.';
	  	}
	  	calculator.dataset.previousKeyType = "decimal";
	}
	if(action!=="clear"){	
		clear.textContent = "CE";
	}
	if(action==="clear"){
		console.log("clear");
		if(clear.textContent === "AC"){
			calculator.dataset.firstValue = "";
			calculator.dataset.operator = "";
			Array.from(e.target.parentNode.children).forEach(elem=>elem.classList.remove('is-depressed'));
		}
		else
			clear.textContent = "AC";
		display.textContent = "0";
		calculator.dataset.previousKeyType = "clear";
	}
	if(action==="calculate"){		
		let firstValue = calculator.dataset.firstValue;
		let operator = calculator.dataset.operator;
		Array.from(e.target.parentNode.children).forEach(elem=>elem.classList.remove('is-depressed'));
		console.log("equals key");
		console.log(firstValue);
		console.log(operator);
		if(calculator.dataset.previousKeyType==="operator"||calculator.dataset.previousKeyType==="Number"||calculator.dataset.previousKeyType==="clear")
			secondValue = display.textContent;

		console.log(secondValue);
		//to stop executing calculate func without operator. we know that only when operator key is presesed, the first value is set
		if(firstValue){
			let calValue = calculate(firstValue, operator ,secondValue);
			display.textContent = calValue;
			calculator.dataset.firstValue = calValue;
			calculator.dataset.previousKeyType = "calculate";
			//calculator.dataset.operator = "";
		}
		clear.textContent = "AC";
		
	}
}

calculator__keys.addEventListener("click", handleClick);

