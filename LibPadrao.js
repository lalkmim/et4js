/***********************************************************************
* Função fnAbrePopup()
*
* Descrição: 	Abre uma popup com as características passadas
************************************************************************/
function fnAbrePopup( asURL, asTarget, aiLargura, aiAltura, aiOpcoes, aiScroll, aiResize, szTipo ) 
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
		var lX = parseInt((screen.availWidth  - aiLargura) /2); // Posição X da janela
		var lY = parseInt((screen.availHeight - aiAltura ) /2); // Posição y da janela

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