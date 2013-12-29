function ETMessage()
{
	this.confirmaInclusao = function()
	{
		return confirm('Confirma a inclusão?');
	}
	
	this.confirmaAlteracao = function()
	{
		return confirm('Confirma a alteração?');
	}
	
	this.confirmaExclusao = function()
	{
		return confirm('Confirma a exclusão?');
	}
	
	this.cancelar = function()
	{
		return confirm('Os dados que não foram salvos serão perdidos. Deseja continuar?');
	}
	
	this.erroInclusao = function( sDetalhes )
	{
		if( sDetalhes.length != 0 )
			return 'Não foi possível incluir os dados.\n\n' + sDetalhes;
		else
			return 'Não foi possível incluir os dados.';
	}
	
	this.erroAlteracao = function( sDetalhes )
	{
		if( sDetalhes.length != 0 )
			return 'Não foi possível alterar os dados.\n\n' + sDetalhes;
		else
			return 'Não foi possível alterar os dados.';
	}
	
	this.erroExclusao = function( sDetalhes )
	{
		if( sDetalhes.length != 0 )
			return 'Não foi possível excluir os dados.\n\n' + sDetalhes;
		else
			return 'Não foi possível excluir os dados.';
	}
}

var oMensagem = new ETMessage();