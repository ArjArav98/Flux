//The first step in building a parser is to separate each input into an array of single statements


/*===============================================*/
/* The Event-Listener Statements are added here. */
/*===============================================*/

document.getElementById("flux-button").addEventListener("click", startParse);

/*================================================*/
/*               They end here.                   */
/*================================================*/


/*========================================================*/
/*    Functions needed to init (start the processes)      */
/*========================================================*/

function identifyKey(e){ //This function starts the parsing when the enter key is pressed.
	if(e.keyCode==13){
		startParse();
	}
}

function startParse(){ //This function calls all the parse functions in order and passes the right arguments.
	
	var input=document.getElementById("flux").value; //We first get the input and 'clean' it.
	input=cleanInput(input);
	
	var stmtArray=inputSplit(input); //We then split the array into individual statements.
	
	if(analyseForSyntaxErrors(stmtArray)==false){
		alert("There is an error in this sentence!");
	}
	else{
		alert("This is syntactically correct!");
	}
	
}

/*========================================================*/
/*                   They end here.                       */
/*========================================================*/



/*========================================================*/
/* Functions needed to split input into individual stmts. */
/*========================================================*/

function cleanInput(input){ //Removes the input text of all newline characters. This makes it easier for us to separate statements in the inputSplit() function. Why? Because I wasn't able to find out how to detect newline characters in a JS string. :P
	var input_cpy="";
	var len=input.length;
	var i=0;
	
	while(i<len){ //The if-elseif statements are arranged in order of greatest frequency for efficiency.
		
		if(input[i]>='a' && input[i]<='z'){ //If the character encountered is a small letter
			input_cpy+=input[i];
		}
		else if(input[i]=="(" || input[i]==")"){ //If the character encountered is a parantheses
			input_cpy+=input[i];
		}
		else if(input[i]==';' || input[i]==" "){ //If the character encountered is a semicolon
			input_cpy+=input[i];
		}
		else if(input[i]>='A' && input[i]<='Z'){ //If the character encountered is a big letter
			input_cpy+=input[i];
		}
		else if(input[i]>='0' && input[i]<='9'){ //If the character enocuntered is a number
			input_cpy+=input[i];
		}
		i+=1;
	}
	
	return input_cpy;
}

function inputSplit(input){ //This function splits the input that we get into individual statments ended by a delimiter (;). Each statement becomes an individual element of an array.
	var start=-1;
	var end=0;
	var i=0;
	var len=input.length;
	var array=[];
	
	while(i<len){
		
		if(input[i]>='a' && input[i]<='z'){ //If the character encountered is a small letter
			if(start==(-1)){
				start=i;
			}
		}
		else if(input[i]=="(" || input[i]==")"){ //If the character encountered is a parantheses
			if(start==(-1)){
				start=i;
			}
		}
		else if(input[i]>='A' && input[i]<='Z'){ //If the character encountered is a big letter
			if(start==(-1)){
				start=i;
			}
		}
		else if(input[i]>='0' && input[i]<='9'){ //If the character enocuntered is a number
			if(start==(-1)){
				start=i;
			}
		}
		else if(input[i]==';'){ //If the character encountered is a semicolon
			end=i;
			array.push(input.substring(start,end));
			start=-1;
		}
		else if(input[i]==" "){ //If the character encountered is a space
			//We do nothing
		}
		else{ //If this executes there has to be an error in the program.....for now
			alert("There is an error in function inputSplit() i--> ");
		}
		
		i+=1;
	}
	
	return array;
}

function goThrough(array){ //This function goes through each element of an array. This is a utility function.
	var len=array.length;
	var i=0;
	
	while(i<len){
		alert(array[i]);
		i+=1;
	}
}

/*========================================================*/
/*                    They end here.                      */
/*========================================================*/



/*=============================================*/
/* Functions needed to analyse syntax of stmts */
/*=============================================*/

function analyseForSyntaxErrors(statements){
	
	var len=statements.length;
	var i=0;
	
	while(i<len){
		if(checkLine(statements[i])==false){
			return false;
		}
		i+=1;
	}
	
	return true;
}

function checkLine(statement){
	
	if(statement=="move"){
		return true;
	}
	else if(statement=="turnRight"){
		return true;
	}
	else{
		return false;
	}
	
}

/*=============================================*/
/*              They end here.                 */
/*=============================================*/