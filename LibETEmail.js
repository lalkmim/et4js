function ETEmail() {
}

/***********************************************************************
* Fun��o mascara()
*
* Descri��o: 	Trata o input de um campo e-mail
*
* campo               campo
* tamMaximo           tamanho m�ximo do campo
* event               evento de teclado (onKeyPress)
************************************************************************/
ETEmail.prototype.mascara = function(campo, tamMaximo, event)  {
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
	      &&  (tecla != 46) // [Delete] e [.]
	      &&  (tecla != 64) // [@]
	      &&  (tecla != 45) // [-]
	      &&  (tecla != 95) // [_]
	      &&  ( (tecla < 48) || (tecla > 57) ) // [0] at� [9]
	      &&  ( (tecla < 65) || (tecla > 90) ) // [A] at� [Z]
	      &&  ( (tecla < 97) || (tecla > 122) ) // [a] at� [z]
	    ) {
		return false;
	}

	return (!(campo.value.length >= tamMaximo));
}

/***********************************************************************
* Fun��o valida()
*
* Descri��o: 	verifica se o campo foi preenchido por um valor v�lido
*
* sTexto        texto a ser validado
************************************************************************/
ETEmail.prototype.valida = function(sTexto) {
	var oRE = new RegExp("[A-Z0-9\._\-]+@[A-Z0-9\._-]+\.[A-Z0-9]{2,4}", "i");
	return (sTexto.length == 0) || sTexto.matchRegExp( oRE );
}