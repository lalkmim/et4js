function ETNumber() {
}

/***********************************************************************
* Fun��o mascara()
*
* Descri��o: 	Trata o input de um campo num�rico
*
* campo               campo
* tamMaximo           tamanho m�ximo do campo
* event               evento de teclado (onKeyPress)
************************************************************************/
ETNumber.prototype.mascara = function(campo, tamMaximo, event) {
	var tecla = null;
  
	if( !event )
		event = window.event;
	
	// Internet Explorer
	if( document.all ) {
		tecla = event.keyCode;
	}
	// Firefox
	else {
		if( parseInt( event.which, 10 ) != 0 )
			tecla = parseInt( event.which, 10 );
		else
			tecla = parseInt( event.keyCode, 10 );
	}

	if (      (tecla != 8) // [BackSpace]
	      &&  (tecla != 9) // [TAB]
	      &&  (tecla != 46) // [Delete]
	      &&  ( (tecla < 48) || (tecla > 57) ) // [0] at� [9]
	    ) {
		return false;
	}

	if ( (tecla == 8) || (tecla == 9) ) //[BackSpace] ou [TAB]
		return true;
	
	return (!(campo.value.length >= tamMaximo))
}

/***********************************************************************
* Fun��o valida()
*
* Descri��o: 	verifica se o campo foi preenchido por um valor v�lido
*
* sTexto        texto a ser validado
************************************************************************/
ETNumber.prototype.valida = function(sTexto) {
	var oRE = new RegExp("[0-9]+");
	return (sTexto.length == 0) || sTexto.matchRegExp( oRE );
}