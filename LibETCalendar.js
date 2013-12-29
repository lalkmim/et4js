function ETCalendar() {
	this.oDataBase = new Date();
	this.oDataSelecionada = new Date( this.oDataBase );
	
	this.sTabela = '<table bgcolor="#006699" border="1" cellpadding="0" cellspacing="0">';
	this.sFimTabela = '</table>';
	this.sAnoAnterior = '<img border="0" src="IMG/icoPagAnteriorDes.gif">';
	this.sProximoAno = '<img border="0" src="IMG/icoPagProximaDes.gif">';
	this.sLocal = '';
	this.sVariavel = '';
	this.sFuncao = '';
	
	this.i = 0;
	this.j = 0;
	
	this.oMeses = new Array('Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro');
	
	this.montaAno = function() {
		return '<th style="font-size: 20px;"><a href="#" onClick="' + this.sVariavel + '.anoAnterior();">' 
		  + this.sAnoAnterior + '</a> ' + this.oDataSelecionada.getFullYear() 
		  + ' <a href="#" onClick="' + this.sVariavel + '.anoPosterior();">' + this.sProximoAno + '</a></th>';
	}
		
	this.montaMeses = function() {
		var sMeses = '<th><select name="mesSelecionado" onChange="' + this.sVariavel + '.atualizaMes(this);">';
		
		for( i=1; i<=12; i++ ) {
			sMeses = sMeses + '<option value="' + i + '"';
			if( (1+this.oDataBase.getMonth()) == i )
				sMeses = sMeses + ' selected';
			sMeses = sMeses + '>' + this.oMeses[i-1] + '</option>';
		}
		
		return sMeses + '</select></th>';
	}
	
	this.montaDias = function() {
		var bInicio = false;
		var bFim = false;
		
		var iDia = 1;
		
		var sDia = '';
		
		this.oDataSelecionada.setDate(iDia);
		
		for( i=0; i<6; i++ ) {
			sDia = sDia + '<tr>';
			for( j=1; j<=7; j++ ) {
				if( (!bInicio) && (this.oDataSelecionada.getDay() == (j-1)) )
						bInicio = true;
				if( bInicio && (!bFim) ) {
					sDia = sDia + '<td id="dia' + ((i*7)+j) + '" onMouseOver="this.style.backgroundColor = \'#DDDDDD\'; this.setAttribute(\'bgcolor\',\'#DDDDDD\');" onMouseOut="this.style.backgroundColor = \'\'; this.setAttribute(\'bgcolor\',\'\');" style="cursor: pointer;" onClick="' + this.sVariavel + '.selecionaData(\''+ this.oDataSelecionada.getDateBr() + '\');">' + this.oDataSelecionada.getDate() + '</td>';
					this.oDataSelecionada.setDate(this.oDataSelecionada.getDate()+1);
					if( this.oDataSelecionada.getMonth() != this.oDataBase.getMonth() )
						bFim = true;
				}
				else {
					sDia = sDia + '<td id="dia' + ((i*7)+j) + '">&nbsp;</td>';
				}
			}
			sDia = sDia + '</tr>';
		}
		
		return sDia;
	}
	
	this.montaCalendario = function(sNomeVariavel) {
		this.sVariavel = sNomeVariavel;
		this.oDataSelecionada = new Date(this.oDataBase);
		var sResultado = this.sTabela + '<tr>' + this.montaAno() + this.montaMeses() + '</tr>';
		sResultado = sResultado + '<tr><td colspan="2"><table width="100%" border="1" cellpadding="0" cellspacing="0">' + this.montaDias() + '</table></td></tr>';
		sResultado = sResultado + this.sFimTabela;
		document.getElementById(this.sLocal).innerHTML = sResultado;
	}
	
	this.anoAnterior = function() {
		this.oDataBase.setFullYear(this.oDataBase.getFullYear() - 1);
		this.montaCalendario(this.sVariavel);
	}
	
	this.anoPosterior = function() {
		this.oDataBase.setFullYear(this.oDataBase.getFullYear() + 1);
		this.montaCalendario(this.sVariavel);
	}
	
	this.atualizaMes = function(oSelect) {
		this.oDataBase.setMonth(parseInt(oSelect.options[oSelect.selectedIndex].value,10)-1);
		this.montaCalendario(this.sVariavel);
	}
	
	this.selecionaData = function(sData) {
		eval( this.sFuncao + '(\'' + sData + '\')' );
	}
	
	this.selecionaLocal = function( sLocalId ) {
		this.sLocal = sLocalId;
	}
	
	this.eventoSelecao = function( sFunc ) {
		this.sFuncao = sFunc;
	}
}