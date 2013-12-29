function ETMessage()
{
	this.confirmaInclusao = function()
	{
		return confirm('Confirma a inclus�o?');
	}
	
	this.confirmaAlteracao = function()
	{
		return confirm('Confirma a altera��o?');
	}
	
	this.confirmaExclusao = function()
	{
		return confirm('Confirma a exclus�o?');
	}
	
	this.cancelar = function()
	{
		return confirm('Os dados que n�o foram salvos ser�o perdidos. Deseja continuar?');
	}
	
	this.erroInclusao = function( sDetalhes )
	{
		if( sDetalhes.length != 0 )
			return 'N�o foi poss�vel incluir os dados.\n\n' + sDetalhes;
		else
			return 'N�o foi poss�vel incluir os dados.';
	}
	
	this.erroAlteracao = function( sDetalhes )
	{
		if( sDetalhes.length != 0 )
			return 'N�o foi poss�vel alterar os dados.\n\n' + sDetalhes;
		else
			return 'N�o foi poss�vel alterar os dados.';
	}
	
	this.erroExclusao = function( sDetalhes )
	{
		if( sDetalhes.length != 0 )
			return 'N�o foi poss�vel excluir os dados.\n\n' + sDetalhes;
		else
			return 'N�o foi poss�vel excluir os dados.';
	}
}

var oMensagem = new ETMessage();