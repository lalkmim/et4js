function ETTree()
{
	this.oArray = null;
	
	this.buscaPosicao = function( sPai, oVetor )
	{
		var oTemp;
		
		if( !oVetor )
		{
			return null;
		}
		else
		{
			var iAux = 0;
			for( iAux = 0; iAux < oVetor.length; iAux++ )
			{
				if( oVetor[iAux].id )
				{
					if( oVetor[iAux].id == sPai )
					{
						if( !oVetor[iAux].filhos )
							oVetor[iAux].filhos = new Array();
						return oVetor[iAux].filhos;
					}
					else 
					{
						if( oVetor[iAux].filhos )
						{
							oTemp = this.buscaPosicao( sPai, oVetor[iAux].filhos );
							if( oTemp )
								return oTemp;
						}
					}
				}
			}
		}
		
		return null;
	}
	
	this.adicionaElemento = function( sId, sLink, sName, sIdPai, sTarget )
	{
		var oPos = null;
		var oElemento = new ETTreeElement();
		
		oElemento.id = sId;
		oElemento.link = sLink;
		oElemento.name = sName;
		oElemento.pai = sIdPai;
		oElemento.target = sTarget;
		
		if( !this.oArray )
		{
			this.oArray = new Array();
			this.oArray.push( oElemento );
		}
		else
		{
			if( oElemento.pai )
			{
				oPos = this.buscaPosicao( oElemento.pai, this.oArray );
				if( oPos )
				{
					oPos.push( oElemento );
				}
				else
				{
					this.oArray.push( oElemento );
				}
			}
			else
			{
				this.oArray.push( oElemento );
			}
		}
	}
	
	this.constroiArvore = function()
	{
		var oUL = document.createElement("UL");
		var oLI = null;
		var oElemento = null;
		var iAux = 0;
		var oTemp = null;
		
		if( arguments[0] )
		{
			oTemp = arguments[0];
			oUL.setAttribute( 'pai', arguments[1] );
		}
		else
		{
			oTemp = this.oArray;
		}
		
		for( iAux = 0; iAux < oTemp.length; iAux++ )
		{
			oLI = document.createElement("LI");
			oElemento = oTemp[iAux];
			
			if( oElemento.pai )
				oLI.setAttribute( 'pai', oElemento.pai );
			
			if( oElemento.link ) {
				if( oElemento.target ) 
					oLI.innerHTML = '<a href="' + oElemento.link + '" target="' + oElemento.target + '">' + oElemento.name + '</a>';
				else
					oLI.innerHTML = '<a href="' + oElemento.link + '">' + oElemento.name + '</a>';
			}
			else
				oLI.innerHTML = oElemento.name;
				
			if( oElemento.filhos )
			{
				oLI.innerHTML = '<IMG id="' + oElemento.id + '" style="CURSOR: pointer;" onclick="oArvore.mostraEscondeElemento(this);" src="IMG/menos.jpg"> <b>' + oLI.innerHTML + '</b>';
				oLI.appendChild( this.constroiArvore( oElemento.filhos, oElemento.id ) );
			}
			else
			{
				oLI.innerHTML = '<IMG src="IMG/nada.jpg"> ' + oLI.innerHTML;
			}
			
			oUL.appendChild( oLI );	
		}
		
		return oUL;
	}
	
	this.mostraEscondeElemento = function( oImagem )
	{
		var oLista = document.getElementsByTagName( "UL" );
		var iAux = 0;
		
		for( iAux = 0; iAux < oLista.length; iAux++ )
		{
			if( oLista[iAux].getAttribute('pai') )
			{
				if( oLista[iAux].getAttribute('pai') == oImagem.getAttribute('id') )
				{
					if( oLista[iAux].style.display == 'none' )
					{
						oLista[iAux].style.display = '';
						oImagem.src = 'IMG/menos.jpg';
					}
					else
					{
						oLista[iAux].style.display = 'none';
						oImagem.src = 'IMG/mais.jpg';
					}
					break;
				}
			}
		}
	}
	
	this.exibeArvore = function( sId )
	{
		var sTemp = document.getElementById( sId ).style.display;
		document.getElementById( sId ).style.display = 'none';
		document.getElementById( sId ).appendChild( this.constroiArvore() );
		var i=0;
		if( document.images ) {
			if( document.images[0] ) {
				for( i=0; i<document.images.length; i++ ) {
					if( document.images[i].src == 'IMG/menos.jpg' ) {
						this.mostraEscondeElemento( document.images[i] );
					}
				}
			}
			else {
				if( document.images.src == 'IMG/menos.jpg' )
					this.mostraEscondeElemento( document.images );
			}
		}
		document.getElementById( sId ).style.display = sTemp;
	}
}

function ETTreeElement()
{
	this.id = '';
	this.link = '';
	this.name = '';
	this.pai = '';
	this.filhos = null;
}