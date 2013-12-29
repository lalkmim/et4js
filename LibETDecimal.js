function ETDecimal() {
	this.decimalPoint = ",";
}

/***********************************************************************
 * Função mascara()
 *
 * Descrição: 	Trata o input de um campo decimal, colocando vírgula onde
 *             desejado
 *
 * campo               campo
 * tamMaximo           tamanho máximo da mantissa (sem ponto decimal)
 * tamCasasDecimais    total de casas decimais
 * event               evento de teclado (onKeyPress)
 ************************************************************************/
ETDecimal.prototype.mascara = function(campo, tamMaximo, tamCasasDecimais, event) 
{
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

	var valorSemFormato = campo.value;

	// Tirando pontos e vírgulas (depois a vírgula será recolocada)
	while( valorSemFormato.indexOf('.') != -1 )
		valorSemFormato = valorSemFormato.replace('.','');
	
	while( valorSemFormato.indexOf(',') != -1 )
		valorSemFormato = valorSemFormato.replace(',','');
	
	// tirando os zeros à esquerda
	while( valorSemFormato.charAt(0) == '0' )
		valorSemFormato = valorSemFormato.substring(1, valorSemFormato.length);
	
	// calculo do tamanho final da mantissa (sem ponto decimal)
	var tamanho = valorSemFormato.length + 1;

	if (tamanho <= tamCasasDecimais) {
		var INICIO_MASCARA = '0' + this.decimalPoint;
		var iAux = 0;
		
		for( iAux = 0; iAux < tamCasasDecimais - tamanho; iAux++ )
			INICIO_MASCARA = INICIO_MASCARA + '0';
		
		campo.value = INICIO_MASCARA + valorSemFormato;
		return true;
	}
	else if (tamanho <= tamMaximo)  {
		campo.value = valorSemFormato.substr(0, tamanho - tamCasasDecimais) + this.decimalPoint +
		              valorSemFormato.substr(tamanho - tamCasasDecimais, tamanho);
		return true;
	}

	return false;
}
	
/***********************************************************************
* Função valida()
*
* Descrição: 	verifica se o campo foi preenchido por um valor válido
*
* sTexto        texto a ser validado
************************************************************************/
ETDecimal.prototype.valida = function(sTexto) {
	var oRE = new RegExp("[0-9]+\" + this.decimalPoint + "[0-9]+");
	return (sTexto.length == 0) || sTexto.matchRegExp( oRE ) ;
}