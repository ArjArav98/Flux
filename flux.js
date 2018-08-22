//The first step in building a parser is to separate each input into an array of single commands


/* The Event-Listener Statements are added here. */
document.getElementById("flux").addEventListener("keyup", identifyKey);


/* The functions are added here. */
function identifyKey(e){ //This function starts the parsing when the enter key is pressed.
	if(e.keyCode==13){
		startParse();
	}
}

function startParse(){ //This function calls all the parse functions in order and passes the right arguments.
	var input=document.getElementById("flux").value;
	var stmtArray=inputSplit(input);
}

function inputSplit(){ //This function splits the input that we get into individual elements of an array
	var start=0;
	var end=0;
	var array=[];
	
	
}