function ETDate() {
	//This should be your standard date format in capital letters
	// DD/MM/YYYY - ok
	// dd/mm/yyyy - not ok
	this.formatoData = "DD/MM/YYYY";
	
	this.posPriBarra = this.formatoData.indexOf('/');
	this.posSegBarra = this.formatoData.lastIndexOf('/') - 1;
	this.iDia = -1;
	this.iMes = -1;
	this.iAno = -1;
	
	var vFormato = this.formatoData.split('/');
	var j=0;
	
	for( j=0; j<3; j++ ) {
		if( vFormato[j] == 'DD' )
			this.iDia = j;
	}
	
	for( j=0; j<3; j++ ) {
		if( vFormato[j] == 'MM' )
			this.iMes = j;
	}
	
	for( j=0; j<3; j++ ) {
		if( vFormato[j] == 'YYYY' )
			this.iAno = j;
	}
}	

/***********************************************************************
 * Função mascara()
 *
 * Descrição: 	Trata o input de um campo do tipo Data (DD/MM/YYYY)
 *
 * campo               campo
 * evt                 evento de teclado (onKeyPress)
 ************************************************************************/
ETDate.prototype.mascara = function(campo, evt) {
	var tecla = null;
	var tamMaximo = 10; //this.formatoData.length;
  
	// Internet Explorer
	if(!evt)
		evt = window.event;
	
	if( document.all ) {
		tecla = evt.keyCode;
	}
	// Firefox
	else {
		if( parseInt( evt.which, 10 ) != 0 )
			tecla = parseInt( evt.which, 10 );
		else
			tecla = parseInt( evt.keyCode, 10 );
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
	
	var sTemp = campo.value.replace('/','');
	
	while( sTemp.indexOf('/') != -1 )
		sTemp = sTemp.replace('/','');
	
	if (sTemp.length == tamMaximo)
		return false;

	if( sTemp.length >= this.posSegBarra ) {
		sTemp = sTemp.substr(0,this.posPriBarra) + '/' + 
			sTemp.substr(this.posPriBarra,this.posSegBarra - this.posPriBarra) + '/' + 
			sTemp.substr(this.posSegBarra,sTemp.length-this.posSegBarra);
	}
	else if( sTemp.length >= this.posPriBarra ) {
		sTemp = sTemp.substr(0,this.posPriBarra) + '/' + 
			sTemp.substr(this.posPriBarra,sTemp.length - this.posPriBarra);
	}

	campo.value = sTemp;
}
	
/***********************************************************************
* Função valida()
*
* Descrição: 	verifica se o campo foi preenchido por um valor válido
*
* sTexto        texto a ser validado
************************************************************************/
ETDate.prototype.valida = function(sTexto) {
	var sRegExp = "[0-9]{" + (this.posPriBarra) + "}\/[0-9]{" + (this.posSegBarra - this.posPriBarra) + "}\/[0-9]{" + ((this.formatoData.length - 2) - this.posSegBarra) + "}";
	var oRE = new RegExp(sRegExp);
	
	if( sTexto.length == 0 )
		return true;
	
	if(!sTexto.matchRegExp( oRE ))
		return false;
		
	var vTemp = sTexto.split('/');
	var j=0;
	
	var oDate = new Date(vTemp[this.iMes] + '/' + vTemp[this.iDia] + '/' + vTemp[this.iAno]);
	
	return ( (parseInt(oDate.getDate(),10) == parseInt(vTemp[this.iDia],10) ) &&
	    ((parseInt(oDate.getMonth(),10)+1) == parseInt(vTemp[this.iMes],10) ) &&
	    (parseInt(oDate.getFullYear(),10) == parseInt(vTemp[this.iAno],10) ) );
}