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
	
	var input=document.getElementById("flux").value; //We get the input from the textarea
	
	input=removeNewlines(input); //We remove all newline characters in the input
	input=removeWhitespaces(input); //We remove all whitespaces in the input
	
	var stmtArray=inputSplit(input); //We then split the array into individual statements.
	
	if(analyseForSyntaxErrors(stmtArray)==false){ //We then check each individual stmt for errors. Only if there are no errors in all stmts, we execute.
		alert("There is an error in this sentence!");
	}
	else{ //Otherwise, we generate an error message.
		alert("This is syntactically correct!");
	}
	
}

/*========================================================*/
/*                   They end here.                       */
/*========================================================*/



/*========================================================*/
/* Functions needed to split input into individual stmts. */
/*========================================================*/

function removeWhitespaces(stmt){ //This function removes whitespaces at the end of a stmt before a semicolon
	var input_cpy="";
	var len=stmt.length;
	var characterOccurence=0; //This var records the index of the latest occurence of a non-space character
	var whitespaceOccurence=len; //This var records the index of the latest occurence of a space character
	var i=0;
	
	while(i<(len-1)){
		if(stmt[i]!=" "){
			characterOccurence=i;
		}
		else{
			whitespaceOccurence=i;
		}
		i+=1;
	}
	
	if(whitespaceOccurence>characterOccurence){ //If the occurence of the last space char in the senetnce is after the last non-space char, then this happens
		return stmt.substring(0,characterOccurence+1)+";";
	}
	else{ //Otherwise, this
		return stmt;
	}
}

function removeNewlines(input){ //Removes the input text of all newline characters. This makes it easier for us to separate statements in the inputSplit() function. Why? Because I wasn't able to find out how to detect newline characters in a JS string. :P
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



/*===============================================*/
/* Functions needed to exec syntax once analysed */
/*===============================================*/

var cmdArray=[]; //This array contains the list of statements that are valid
var execFuncArray=[]; //This array contains the list of funtions that are executed when the stmt is identified.

/*===============================================*/
/*                   They end here.              */
/*===============================================*/