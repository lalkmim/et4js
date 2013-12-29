function ETNumber() {
}

/***********************************************************************
* Função mascara()
*
* Descrição: 	Trata o input de um campo numérico
*
* campo               campo
* tamMaximo           tamanho máximo do campo
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
	      &&  ( (tecla < 48) || (tecla > 57) ) // [0] até [9]
	    ) {
		return false;
	}

	if ( (tecla == 8) || (tecla == 9) ) //[BackSpace] ou [TAB]
		return true;
	
	return (!(campo.value.length >= tamMaximo))
}

/***********************************************************************
* Função valida()
*
* Descrição: 	verifica se o campo foi preenchido por um valor válido
*
* sTexto        texto a ser validado
************************************************************************/
ETNumber.prototype.valida = function(sTexto) {
	var oRE = new RegExp("[0-9]+");
	return (sTexto.length == 0) || sTexto.matchRegExp( oRE );
}