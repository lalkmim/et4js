/***********************************************************************
 * !!!!!!!!!!!IMPORTANTE!!!!!!!!!!!!!!
 * 
 * Para que as fun��es "autom�ticas" funcionem � necess�rio que todo o 
 * JavaScript seja adicionado ao final da p�gina. Dessa forma a estrutura
 * da p�gina HTML j� estar� carregada nos objetos DOM.
 ***********************************************************************/
 
/***********************************************************************
 * et_needed	= indica se o campo � obrigat�rio (1=Sim/0=N�o).
 * et_label	= label que precede o elemento (ex.: "Data de Nascimento").
 * et_type	= indica o tipo do campo. Deve ser preenchido com um dos tipos 
 * 		  abaixo.
 * Tipos:
 * - et_date	= data (DD/MM/YYYY)
 * - et_number	= numero (somente n�meros, sem v�rgula)
 * - et_decimal	= decimal (n�meros com v�rgula mas sem separador de milhar)
 * - et_email	= email
 ***********************************************************************/

/***********************************************************************
 * Adiciona o m�todo trim(), que remove os espa�os em branco antes e depois do texto,
 * ao objeto String.
 *
 * Exemplos de chamada da fun��o:
 * var sTexto = "  asd asda   ";
 * var sTemp = sTexto.trim(); // O valor de sTemp ser� "asd asda"
 ***********************************************************************/
String.prototype.trim = function() {
	var oNovo = new String(this);
	
	while( oNovo.charAt(0) == ' ' )
		oNovo = oNovo.substring(1, oNovo.length);
		
	while( oNovo.charAt(oNovo.length-1) == ' ' )
		oNovo = oNovo.substring(0, oNovo.length - 1);
	
	return oNovo;
}

/***********************************************************************
 * Adiciona o m�todo matchRegExp( oRegExp ), que indica se o campo foi preenchido 
 * de acordo com a m�scara, ao objeto String.
 *
 * Exemplos de chamada da fun��o:
 * sTexto = "123321a";
 * sTexto = sTexto.matchRegExp( new RegExp('[0-9]+') ); // verifica se s� possui n�meros
 * // Retorna false
 ***********************************************************************/
String.prototype.matchRegExp = function( oRegExp ) {
	var vTemp = this.match(oRegExp);
		
	if( vTemp )
		return (vTemp[0] == this);
	
	return false;
}

/***********************************************************************
 * Adiciona o m�todo trataZeros(), que coloca zeros � frente dos n�meros.
 *
 * Exemplos de chamada da fun��o:
 * Date.trataZeros(5,2); //retorna '05'
 * Date.trataZeros(98,4); //retorna '0098'
 ***********************************************************************/
Date.prototype.trataZeros = function( sValor, iTam ) {
	sValor = sValor + '';
	
	while( sValor.length < iTam )
		sValor = '0' + sValor;
		
	return sValor;
}
 
 /***********************************************************************
 * Adiciona o m�todo getDataBr(), que retorna a data atual no formato
 * brasileiro (DD/MM/YYYY).
 *
 * Exemplos de chamada da fun��o:
 * oData = new Date();
 * alert( oData.getDateBr() ); // retornar� (por exemplo) 25/12/2006
 ***********************************************************************/
Date.prototype.getDateBr = function()
{
	return (this.trataZeros(this.getDate(),2) + '/' + this.trataZeros((this.getMonth()+1),2) + '/' + this.getFullYear());
}

 /***********************************************************************
 * Adiciona o m�todo setDataBr(), que cria uma data no formato brasileiro 
 * (DD/MM/YYYY).
 *
 * Exemplos de chamada da fun��o:
 * oData = new Date();
 * oData.setDateBr('25/12/2006') );
 ***********************************************************************/
Date.prototype.setDateBr = function(sDataBr)
{
	var vData = sDataBr.split('/');
	
	this.setFullYear(parseInt(vData[2],10));
	this.setMonth(parseInt(vData[1],10)-1);
	this.setDate(parseInt(vData[0],10));
}

/************************************************************************
 * Valida se todos os campos obrigat�rios foram devidamente preenchidos. Ao final um alert 
 * ir� informar todos os campos que devem ser preenchidos. Caso a propriedade "descricao"
 * esteja preechida ela ser� usada, caso contr�rio ser� usada a propriedade "name".
 * 
 * Exemplos de campos obrigat�rios: 
 * <input type="text" name="teste" et_needed="1" et_label="Campo de teste">
 * <input type="text" name="teste" et_needed="1">
 * <select name="teste" et_needed="1" et_label="Campo de teste"></select>
 *
 * Exemplos de campos opcionais:
 * <input type="text" name="teste" et_needed="0" et_label="Campo de teste">
 * <input type="text" name="teste" et_label="Campo de teste">
 * <select name="teste"></select>
 *
 ************************************************************************/
function validate( oForm )
{
	var iAux = 0;
	var oElement;
	var bError = false;
	var sError = '';
	var sInvalido = '';
	
	for( iAux = 0; iAux < oForm.elements.length; iAux++ )
	{
		oElement = oForm.elements[iAux];
		bError = false;
		
		if( oElement.getAttribute('et_type') ) {
			if( oElement.value.trim() != '' ) {
				if(!window['o'+oBiblioteca[oElement.getAttribute('et_type')].classe].valida(oElement.value)) {
					bError = true;
					if( oElement.getAttribute("et_label") )
						sInvalido = sInvalido + '- ' + oElement.getAttribute("et_label");
					else
						sInvalido = sInvalido + '- ' + oElement.name;
				}		
			}
		}
		
		if( oElement.getAttribute('et_needed') ) {
			if( oElement.getAttribute('et_needed') == '1' ) {
				bError = false;
				switch( oElement.type.toUpperCase() ) {
					case 'TEXT':
					case 'TEXTAREA':	
						oElement.value = oElement.value.trim();
						if( oElement.value == '' )
							bError = true;
						break;
					case 'SELECT-ONE':
						if( (oElement.options[oElement.selectedIndex].value == '') || (oElement.options[oElement.selectedIndex].value == '0') )
							bError = true;
						break;
				}

				if( bError ) {
					if( oElement.getAttribute('et_label') )
						sError = sError + '- ' + oElement.getAttribute('et_label') + '\n';
					else
						sError = sError + '- ' + oElement.name + '\n';
				}
			}
		}
	}
	
	if( sError != '' ) {
		sError = 'O preenchimento dos seguintes campos � obrigat�rio:\n' + sError;
	}
	
	if( sInvalido != '' ) {
		sInvalido = 'O preenchimento dos seguintes campos � inv�lido:\n' + sInvalido;
		if( sError != '' )
			sError = sError + '\n' + sInvalido;
		else
			sError = sInvalido;
	}
	
	if( sError != '' ) {
		alert(sError);
		return false;
	}
		
	return true;
}

/***********************************************************************
* Fun��o abrePopup()
*
* Descri��o: 	Abre uma popup com as caracter�sticas passadas
************************************************************************/
function abrePopup( asURL, asTarget, aiLargura, aiAltura, aiOpcoes, aiScroll, aiResize, szTipo ) 
{
	var oJanela;
	var sOpcoes;

	sOpcoes = "";
	if ( parseInt( navigator.appVersion ) < 4 )	{
		sOpcoes	= "toolbar=no,location=no,address=no,directories=no,status=no,menubar=no,copyhistory=yes,maximized=yes"
  					+ ",width=" + aiLargura + ",height=" + aiAltura;
	}
	else
	{
		var lX = parseInt((screen.availWidth  - aiLargura) /2); // Posi��o X da janela
		var lY = parseInt((screen.availHeight - aiAltura ) /2); // Posi��o y da janela

		sOpcoes = aiOpcoes;

		if ((lX>0)&&(sOpcoes=='0')) 
			sOpcoes += ",left=" + lX + ",top=" + lY;
		
		sOpcoes	+= ",width=" + aiLargura + ",height=" + aiAltura;
	}

	if ( aiScroll > 0 )
		sOpcoes += ",scrollbars=yes";
	else
		sOpcoes += ",scrollbars=no";

	if ( aiResize > 0 )
		sOpcoes += ",resizable=yes";
	else
		sOpcoes += ",resizable=no";

	//aoTelaPai.open( asURL, "pop", sOpcoes );
	// Concatena stringURL com o parametro TIPO para formar a URL do WINDOW.OPEN
	if ((szTipo != null)&&(szTipo != ''))
		asURL+="&tipo="+szTipo;
	
	window.open( asURL, asTarget, sOpcoes );
}


/***********************************************************************
 * A fun��o "begin();" � chamada no onLoad de todas as p�ginas.
 ************************************************************************/
function begin()
{
	incluiBibliotecas();
	addSubmitEvent(function(){return validate(this);}, null);
}

/***********************************************************************
 * Adiciona fun��es ao onLoad da p�gina, sem perder os dados que eventualmente
 * j� estejam no <body onload="">
 * 
 * Exemplo:
 * addLoadEvent(begin);
 ************************************************************************/
function addLoadEvent(func) 
{
	var oEventoAntigo = window.onload;
	if (typeof window.onload != 'function') 
	{
		window.onload = func;
	} 
	else 
	{
		window.onload = function() 
		{
			if (oEventoAntigo) 
			{
				oEventoAntigo();
			}
			func();
		}
	}
}
addLoadEvent(begin);

/***********************************************************************
 * Adiciona fun��es ao evento onsubmit de um formul�rio sem perder os 
 * dados que eventualmente j� estejam no <form onsubmit="">. Caso o 
 * segundo par�metro seja null, a fun��o ser� adicionada � todos os 
 * formul�rios da p�gina.
 * 
 * Exemplo:
 * addSubmitEvent(function(){alert(1);}, document.forms[0]);
 * addSubmitEvent(function(){alert(1);}, document.formulario);
 ************************************************************************/
function addSubmitEvent(func, oFormulario) 
{
	var iAux = 0;
	
	if( oFormulario )
	{
		var oEventoAntigo = oFormulario.onsubmit;
		if (typeof oFormulario.onsubmit != 'function') 
		{
			oFormulario.onsubmit = eval(func);
		} 
		else 
		{
			oFormulario.onsubmit = function() 
			{
				if (oEventoAntigo) 
				{
					oEventoAntigo();
				}
				eval(func);
			}
		}
	}
	else
	{
		for( iAux = 0; iAux < document.forms.length; iAux++ )
		{
			var oEventoAntigo = document.forms[iAux].onsubmit;
			if (typeof document.forms[iAux].onsubmit != 'function') 
			{
				document.forms[iAux].onsubmit = eval(func);
			} 
			else 
			{
				document.forms[iAux].onsubmit = function() 
				{
					if (oEventoAntigo) 
					{
						oEventoAntigo();
					}
					eval(func);
				}
			}
		}
	}
}

/***********************************************************************
 * Adiciona fun��es ao evento onKeyPress de um objeto sem perder os 
 * dados que eventualmente j� estejam atribu�dos � ele. 
 * 
 * Exemplo:
 * addKeyPressEvent(function(){alert(1);}, document.forms[0].nomeUsuario);
 * addKeyPressEvent(function(){alert(1);}, document.formulario.nomeUsuario);
 ************************************************************************/
function addKeyPressEvent(func, oObjeto) {
	var oEventoAntigo = oObjeto.onkeypress;
	
	if (typeof oObjeto.onkeypress != 'function') 
	{
		oObjeto.onkeypress = eval(func);
	} 
	else 
	{
		oObjeto.onkeypress = function() 
		{
			if (oEventoAntigo) 
			{
				oEventoAntigo();
			}
			eval(func);
		}
	}
}

/***********************************************************************
 * Coloca os includes dos javascripts corretos
 ************************************************************************/
function incluiBibliotecas() 
{
	var iAux = 0;
	var j = 0;
	var oXml = carregaObjetoXmlHTTPRequest();
	
	if( !oXml )
		return false;
	
	//window['oBiblioteca'] = oBiblioteca;
	
	for( iAux = 0; iAux < document.forms.length; iAux++ ) {
		for( j = 0; j < document.forms[iAux].elements.length; j++ ) {
			oElemento = document.forms[iAux].elements[j];
			if( oElemento.getAttribute("et_type") ) {
				if( !oBiblioteca[oElemento.getAttribute("et_type")].usada ) {
					carregaScript( oXml, oBiblioteca[oElemento.getAttribute("et_type")].nome );
					oBiblioteca[oElemento.getAttribute("et_type")].usada = true;
				
					switch( oBiblioteca[oElemento.getAttribute("et_type")].classe ) {
						case "ETDate":
							//addKeyPressEvent( function() { return window['oETDate'].mascara(this, function(){if(event){return event;}else{return window.event;}}); }, oElemento );
							addKeyPressEvent( function(evt) { return window['oETDate'].mascara(this, evt); }, oElemento );
							oElemento.maxLength = 10;
							break;
						case "ETEmail":
							addKeyPressEvent( function(evt) { return window['oETEmail'].mascara(this, evt); }, oElemento );
							break;
						case "ETDecimal":
							addKeyPressEvent( function(evt) { return window['oETDecimal'].mascara(this, evt); }, oElemento );
							break;
						case "ETNumber":
							addKeyPressEvent( function(evt) { return window['oETNumber'].mascara(this, evt); }, oElemento );
							break;
					}
				}
			}
		}
	}
	
	oXml = null;
}

function carregaObjetoXmlHTTPRequest(){
	if(typeof(XMLHttpRequest)!='undefined')
		return new XMLHttpRequest();

	var vObjetos = ['Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.4.0',
		'Msxml2.XMLHTTP.3.0', 'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP'];
	var i;
		
	for( i = 0; i < vObjetos.length; i++ ) {
		try {
			return new ActiveXObject(vObjetos[i]);
		} catch(e) {
			
		}
	}
	return null;
}

function carregaScript(oXml, sClasse) {
	oXml.open('GET', sClasse, false);
	oXml.send('');
	
	var sNome = sClasse.substring(3,sClasse.length);
	sNome = sNome.substring(0, sNome.indexOf('.') );
	
	window[sClasse] = null;
	window['o' + sNome] = null;
	
	eval(oXml.responseText);
	window[sClasse] = eval( sNome );
	window['o' + sNome] = new window[sClasse]();
}

function Elemento() {
	this.nome = '';
	this.classe = '';
	this.usada = false;
} 

var oElemento = null;
var oBiblioteca = new Array();

oElemento = new Elemento();
oElemento.nome = "LibETDate.js";
oElemento.classe = "ETDate";
oBiblioteca["et_date"] = oElemento;

oElemento = new Elemento();
oElemento.nome = "LibETEmail.js";
oElemento.classe = "ETEmail";
oBiblioteca["et_email"] = oElemento;

oElemento = new Elemento();
oElemento.nome = "LibETDecimal.js";
oElemento.classe = "ETDecimal";
oBiblioteca["et_decimal"] = oElemento;

oElemento = new Elemento();
oElemento.nome = "LibETNumber.js";
oElemento.classe = "ETNumber";
oBiblioteca["et_number"] = oElemento;