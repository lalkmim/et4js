?/***********************************************************************
* Função formatarValorDecimal()
*
* Descrição: 	Trata o input de um campo decimal, colocando vírgula onde
*             desejado
*
* campo               campo
* maxlength           tamanho máximo da mantissa (sem ponto decimal)
* totalCasasDecimais  total de casas decimais
* event               evento de teclado (onKeyPress)
************************************************************************/
function formatarValorDecimal(campo, maxlength, totalCasasDecimais, event) {
  var tecla = event.keyCode;

  if (      (tecla != 08) // [BackSpace]
        &&  (tecla != 09) // [TAB]
        &&  (tecla < 48 || tecla > 57) // (0 a 9)
      ) {

    return false;
  }

  if (tecla == 09) { //[TAB]
    return true;
  }

  valorSemFormato = campo.value;

  // Tirando pontos e vírgulas (depois a vírgula será recolocada
  while (true) {
    valorSemFormato = valorSemFormato.replace( ",", "" );
    valorSemFormato = valorSemFormato.replace( ".", "" );

    if ((valorSemFormato.indexOf(".", 0) < 1) && (valorSemFormato.indexOf(",", 0) < 1)) {
      break;
    }
  }

  valortmp = "";
  tamanho = valorSemFormato.length;

  // tirando os zeros à esquerda
  for (i = 0; i < tamanho; i++) {
    var digito = valorSemFormato.substr(i, 1);

    // primeiro dígito diferente de 0. Considero o número começando deste digito
    if (digito != "0") {
      valortmp = valortmp + valorSemFormato.substr(i, tamanho - i);
      break;
    }
  }

  valorSemFormato = valortmp;

  // calculo do tamanho final da mantissa (sem ponto decimal)
  tamanho = valorSemFormato.length + 1;

  var INICIO_MASCARA = '0,00000000000000000000000';
  var prefixo = '';
  
  if (tamanho <= totalCasasDecimais) {
    prefixo = INICIO_MASCARA.substr(0, 2 + (totalCasasDecimais - tamanho));
    campo.value = prefixo + valorSemFormato;
    return true;
  }
  else if (tamanho <= maxlength) {
    campo.value = valorSemFormato.substr(0, tamanho - totalCasasDecimais) + ',' +
                  valorSemFormato.substr(tamanho - totalCasasDecimais, tamanho);
    return true;
  }

  return false;
}

/***********************************************************************
* Função fnAbrePopup()
*
* Descrição: 	Abre uma popup com as características passadas
************************************************************************/
function fnAbrePopup( asURL, asTarget, aiLargura, aiAltura, aiOpcoes, aiScroll, aiResize, szTipo ) {
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

		if ((lX>0)&&(sOpcoes=='0')) {
        sOpcoes += ",left=" + lX + ",top=" + lY;
		}
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
  if ((szTipo != null)&&(szTipo != '')){
    asURL+="&tipo="+szTipo;
  }
	window.open( asURL, asTarget, sOpcoes );
}


/********************************************************************************************\
* Função fnMascDinam()
*
* Descrição: 	Cria dinâmicamente uma máscara especifica
* 
* StrCampo : o Objeto Campo o qual deseja validar
* StrMask  : String com a formatação da Máscara Ex.: '##/##/####'
*            onde: S - Sinais ( + - * / , .)
*                  N - Numéricos e Sinais
*                  # - Numéricos
*                  L - Alfabéticos
*                  A - Alfanumérico (Letras não acentuadas e Números)
*                  C - Customizados (Necessita de informao no parmetro pePossiveisChars)
* PossiveisChars: String contendo Sigla da mscara default + caracretes permitidos.
*                 Ex.: '#-./' => Caracteres Numricos e os caracteres # - . /
* 
\********************************************************************************************/
function fnMascDinam(strCampo, strMask, possiveisCaracteres) {
	var locObj       = strCampo;
	var locStr       = locObj.value;
	 
	var locCharPos   = locStr.length;
	var locCharInput = String.fromCharCode(event.keyCode);

	var locCharMask  = strMask.substring(locCharPos, locCharPos + 1);
	var locCharProx  = strMask.substring(locCharPos + 1, locCharPos + 2);
  var locStrSinais = '+-*/.,';
	var locStrNumSin = '0123456789+-*/.,';
	var locStrNumeros= '0123456789';
	var locStrAlfa   = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	var locStrLetras = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

	if (locStr.length >= strMask.length) {
		locObj.value = locStr.substring(0,strMask.length);
		return false;
	}
  
  possiveisCaracteres += '';
  var locChar1 = possiveisCaracteres.substring(0,1);
  var locChar2 = possiveisCaracteres.substring(1);
  var locStrCustomizado = '';
  
  switch (locChar1){
    case "S": {
      locStrCustomizado = locStrSinais + locChar2;
      break;
    }
    
    case "N": {
      locStrCustomizado = locStrNumSin + locChar2;
      break;
    }
    
    case "#": {
      locStrCustomizado = locStrNumeros + locChar2;
      break;
    }
    
    case "L": {
      locStrCustomizado = locStrLetras + locChar2;
      break;
    }
    
    case "A": {
      locStrCustomizado = locStrAlfa + locChar2;
      break;
    }
  }
 
	switch (locCharMask) {
		case "S": {
			if (locStrSinais.indexOf(locCharInput) == -1) {
				return false;
			}
			break;
		}

		case "N": {
			if (locStrNumSin.indexOf(locCharInput) == -1) {
				return false;
			}
			break;
		}

		case "#": {
			if (locStrNumeros.indexOf(locCharInput) == -1) {
				return false;
			}
			break;
		}

		case "L": {
			if (locStrLetras.indexOf(locCharInput) == -1) {
				return false;
			}
			break;
		}

		case "A": {
			if (locStrAlfa.indexOf(locCharInput) == -1) {
				return false;
			}
			break;
		}

		case "C": {
			if (locStrCustomizado.indexOf(locCharInput) == -1) {
				return false;
			}
			break;
		}

		default: {
			switch (locCharProx) {
        case "S": {
          if (locStrSinais.indexOf(locCharInput) == -1) {
            return false;
          }
          break;
        }
        case "N": {
          if (locStrNumSin.indexOf(locCharInput) == -1) {
            return false;
          }
          break;
        }
				case "#": {
					if (locStrNumeros.indexOf(locCharInput) == -1) {
						return false;
					}
					break;
				}
				case "L": {
					if (locStrLetras.indexOf(locCharInput) == -1) {
						return false;
					}
					break;
				}
        case "A": {
          if (locStrAlfa.indexOf(locCharInput) == -1) {
            return false;
          }
          break;
        }
        case "C": {
          if (locStrCustomizado.indexOf(locCharInput) == -1) {
            return false;
          }
          break;
        }
			}
		}
		locObj.value += locCharMask;
	}
}

/******************************************************************************\
* Função validaCampoData(peCampo)
*
* Descrição: 	Valida o campo de data recebido como parâmetro devolvendo o foco 
*             ao campo, caso a data esteja incorreta.
* 
* peCampo : Objeto que comtém a string de Data.
* 
\*****************************************************************************/
function validaCampoData(peCampo){
  if (!validaData(peCampo.value)){
    peCampo.select();
    peCampo.focus();
  }
}

/******************************************************************************\
* Função validaData(peData)
*
* Descrição: 	Valida data recebida como parâmetro.
* 
* peData : String com a data no formato 'dd/mm/aaaa'.
* 
\*****************************************************************************/
function validaData(peData){
  if (peData.length == 0){
    return true;
  }

  if ((peData.length > 0) && (peData.length < 10)){
    alert('Data em formato inv?lido. O formato esperado ? dd/mm/aaaa.')
    return false;
  }

  dia = peData.substring(0,2);
  mes = peData.substring(3,5);
  ano = peData.substring(6);
  
  if ((dia.indexOf('/') != -1)||(mes.indexOf('/') != -1)||(ano.indexOf('/') != -1)){
    alert('O formato esperado ? dd/mm/aaaa.')
    return false;
  }

  if ((parseInt(mes) > 12)||(parseInt(mes) < 1)){
    alert('O mês digitado deve ser entre 01 e 12.');
    return false;
  }

  timeA = new Date(ano, mes, 1);
  timeD = timeA - 86400000;
  timeB = new Date(timeD);
  var daysInMonth = timeB.getDate();

  if ((daysInMonth >= dia)&&(dia > 0)){
     return true;
  }
  else{
     //alert('O dia digitado deve ser entre 01 e ' + daysInMonth + ' para o mês/ano ' + mes + '/' + ano + '.');
     alert('O dia digitado deve ser entre 01 e ' + daysInMonth + ' para o mês/ano informado.');
     return false;
  }
}

/**************************************************************************\
* Funcao confirmaRestauracao()
*
* Descricao: 	Exibe a pergunta padrao de confirmao de 
*             restaurao dos dados de campos do formulrio
\**************************************************************************/
function confirmaRestauracao(){
  return confirm('Ao restaurar os dados originais, as alterações feitas serão perdidas. Confirma?');
}

/**************************************************************************\
* Funcao confirmaLimpeza()
*
* Descricao: 	Exibe a pergunta padrao de confirmao de 
*             limpeza de campos do formulrio
\**************************************************************************/
function confirmaLimpeza(){
  return confirm('Confirma a limpeza do(s) campo(s) do formulario do cadastro?');
}

/**************************************************************************\
* Funcao confirmaLimpezaInclusao()
*
* Descricao: 	Exibe a pergunta padrao de confirmao de 
*             limpeza de campos do formulario de inclusao.
\**************************************************************************/
function confirmaLimpezaInclusao(){
  return confirm('Confirma a limpeza do(s) campo(s) do formulario de inclusao?');
}


/***********************************************************************
* Funo fnFormataValor()
*
* Descricao: 	Formata o numero no padrao: 1 - 1.000,00, 2 - 1000,00
************************************************************************/
function fnFormataValor(Valor,numDecs,formato)
{
  Valor = Valor.replace(/\./g,"");
  Valor = Valor.replace(",",".");

  var cValor = new String(Valor);
  
  var cRetu, nPos, inte2;
  var zeros, sepmil, sepdec;
  var k, x, deci;
  
  if (cValor == ''){
    return '';
  }
  
  //-- define o tipo de formatacao --//
  if (formato==1){
    sepmil = ".";
    sepdec = ",";
  }else{
    sepmil = "";
    sepdec = ",";
  }

  nPos = cValor.indexOf(".");
  numDecs = parseInt(numDecs, 10);

  var vetValor, inteiros, decimais;

  if (nPos > -1){
    vetValor = cValor.split(".");
    inteiros = (vetValor.length == 2)?parseInt("0" + vetValor[0], 10):parseInt("0" + cValor, 10);
    decimais = (vetValor.length == 2)?parseInt("0" + vetValor[1], 10):0;
  }
  else{
    inteiros = parseInt("0" + cValor, 10);
    decimais = 0;
  }
  
  if ((inteiros == 0)&&(decimais == 0)){
    if (formato == 1){
      return "0,00";
    }
    else{
      return "0";
    }
  }
  
  inte1 = inteiros.toString();
  inte2="";
  x = 0;
  
  //-- coloca os separadores de milhar --//
  for (k=inte1.length-1;k>=0;k--){
      inte2 = inte1.substr(k,1) + inte2;
      x++;
      if ((x == 3) && (k > 0)){
          inte2 = sepmil + inte2;
          x = 0;
      }
  }
  
  deci = "";
  zeros = "";
  zeros += Math.pow(10, numDecs);
  if (numDecs > 0){
      if (nPos > 0){
          deci = cValor.substr(nPos + 1, numDecs);
      }

      for(k=zeros.length-1; k >= 0; k--){
          deci += zeros.substr(k, 1);
      }
      if (formato == 1){
        cRetu = inte2 + sepdec + deci.substr(0, numDecs);
      }
      else{
        cRetu = inte2 + ((decimais== 0)?"":sepdec + deci.substr(0, numDecs));
      }
  }
  else{
      cRetu = inte2;
  }
  return cRetu;
}

/***********************************************************************\
* Funo mascaraValor(campo, numeroCasasInteiras, numeroCasasDecimais)
*
* Descricao: 	Valida a digitacao do valor conforme o limite informado.
*
* campo : deve ser passado o campo propriamente dito.
* numeroCasasInteiras : total de caracteres permitidos - Defaul: 6
* numeroCasasDecimais : numero de casas decimais permitidas - Defaul: 2
*
* Ex.: onKeyPress="javascript: return mascaraValor(this, 12, 2);"
*
\***********************************************************************/
function mascaraValor(campo)
{
  var valor  = new String(campo.value);
  var tecla  = event.keyCode;
 
  if ((tecla != 08) &&           // [BackSpace]
      (tecla != 09) &&           // [Tab]
      (tecla != 44) &&           // (,)
      (tecla < 48 || tecla > 57) // (0 a 9)
     ) {
    return false;
  }
  if ((tecla == 44)&&(valor.indexOf(",") > -1)){
    return false;
  }
  return true
}

function fnVerificaData(peStrDescricao, peStrData){
                      
    var erro      = false;                  
    var dia = Number(peStrData.substring(0,2));
    var mes = Number(peStrData.substring(3,5));
    var ano = Number(peStrData.substring(6));
    var ultDiaMes = 0;

    if(peStrData == ''){
      return true;
    }

    if(ano<1900){
      erro = true;
    }

    if (mes == 2)
    {
      if (ano % 4 == 0)
      {
        ultDiaMes = 29;
      }
      else
      {
        ultDiaMes = 28;
      }
    }
    else if (mes == 1 || mes == 3 || mes == 5 || mes == 7 || mes == 8 || mes == 10 || mes == 12)
    {
      ultDiaMes = 31;
    }
    else if (mes == 4 || mes == 6 || mes == 9 || mes == 11)
    {
      ultDiaMes = 30;
    }
    else
    {
      erro = true;
    }

    if (dia < 1 || dia > ultDiaMes)
    {
      erro = true;
    }
    
    if (erro == true){
      alert('A data preenchida no campo ' + peStrDescricao + '  invalida!');
      return false;                      
    }else{
      return true;
    }
  }