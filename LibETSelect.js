/************************************************************************
 * Ordena um select utilizando uma variação do método quicksort.
 *
 * Exemplo de chamada:
 * quicksort( document.formulario.pais );
 ************************************************************************/
function quicksort( oSelect )
{
	quicksortSelect( oSelect, 0, oSelect.options.length - 1 )
}

function quicksortSelect( oSelect, iInicio, iFim )
{
	var oVetor = oSelect.options;
	var iMeio = parseInt((iInicio + iFim)/2,10);
	var iAux = 0;
	var iTemp;
	
	if( !oSelect.multiple )
	{
		var iSelected = oSelect.options[oSelect.selectedIndex].value;
	}
	
	if( !oSelect )
		return false;
	
	iInicio = parseInt(iInicio,10);
	iFim = parseInt(iFim,10);
		
	if( (iFim == '') || (iFim == null) || (iFim >= oSelect.options.length) )
		iFim = oSelect.options.length - 1;
				
	if( (iInicio < 0) || (iInicio == '') || (iInicio == null) )
		iInicio = 0;
			
	if( (iInicio == iFim) || (iInicio > iFim) )
		return;
				
	if( (iInicio + 1) == iFim )
	{
		if( oVetor[iInicio].text > oVetor[iFim].text )
		{
			adicionaOption( oSelect, iFim+1, oVetor[iInicio].value, oVetor[iInicio].text, oVetor[iInicio].id );
			removeOption( oSelect, iInicio );
		}
		return;
	}
			
	for( iAux = iInicio; iAux <= iFim; iAux++ )
	{
		if( oVetor[iAux].text > oVetor[iMeio].text )
		{
			if( iAux < iMeio )
			{
				adicionaOption( oSelect, iAux, oVetor[iMeio].value, oVetor[iMeio].text, oVetor[iMeio].id );
				adicionaOption( oSelect, iMeio+1, oVetor[iAux+1].value, oVetor[iAux+1].text, oVetor[iAux+1].id );
				removeOption( oSelect, iMeio+2 );
				removeOption( oSelect, iAux+1 );
				iMeio = iAux;
			}
		}
		else
		{
			if( iAux > iMeio )
			{
				adicionaOption( oSelect, iAux, oVetor[iMeio].value, oVetor[iMeio].text, oVetor[iMeio].id );
				adicionaOption( oSelect, iMeio, oVetor[iAux+1].value, oVetor[iAux+1].text, oVetor[iAux+1].id );
				removeOption( oSelect, iAux+2 );
				removeOption( oSelect, iMeio+1 );
				iTemp = iMeio;
				iMeio = iAux;
				iAux = iTemp;
			}
		}
	}
	
	quicksortSelect( oSelect, iInicio, iMeio-1 );
	quicksortSelect( oSelect, iMeio+1, iFim );
	
	if( !oSelect.multiple )
	{
		for( iAux = 0; iAux < oSelect.options.length; iAux++ )
		{
			if( oSelect.options[iAux].value == iSelected )
			{
				oSelect.selectedIndex = iAux;
				break;
			}
		}
	}
}

/************************************************************************
 * Move os itens selecionados de uma caixa de seleção para outra
 *
 * Exemplo de chamada:
 * multipleSelectMove(this.form.origem, this.form.destino);
 ************************************************************************/
function multipleSelectMove(oOrigem, oDestino)
{
	var iAux = 0;
	for( iAux = oOrigem.options.length-1; iAux >= 0; iAux-- )
	{
		if( oOrigem.options[iAux].selected )
		{
			adicionaOption( oDestino, '', oOrigem.options[iAux].value, oOrigem.options[iAux].text, oOrigem.options[iAux].getAttribute('id') );
			removeOption( oOrigem, iAux );
		}
	}
	
	quicksort(oDestino);
}

/***********************************************************************
 * Adiciona um item a uma combo.
 * 
 * Exemplos de chamada da função:
 * - adicionaOption( document.formulario.pais, '', 1, 'Rio de Janeiro', '' );
 * - onChange="adicionaOption( this, '', 1, 'Rio de Janeiro', '' );"
 ***********************************************************************/
function adicionaOption( oSelect, iPos, iValue, sText, sId )
{
	if( (iPos == '') && (iPos.length == 0) )
		iPos = oSelect.options.length;
		
	var oOption = new Option(sText, iValue);
	oSelect.options.add(oOption, iPos);
	
	oSelect.options[iPos].value = iValue;
	oSelect.options[iPos].innerText = sText;
	oSelect.options[iPos].id = sId;
}
		
/***********************************************************************
 * Remove um item de uma combo.
 * 
 * Exemplos de chamada da função:
 * - removeOption( document.formulario.pais, 1 );
 * - onChange="removeOption( this, 1 );"
 ***********************************************************************/
function removeOption( oSelect, iPos )
{
	oSelect.remove( iPos );
}