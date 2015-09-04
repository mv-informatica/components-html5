package br.com.mv.modulo.model.type;

import lombok.Getter;

@Getter
public enum EnumTipoMensagem {

	INFO("info"),
	ERRO("danger"),
	SUCESSO("success"),
	ATENCAO("warning");

	private String descricao;

	private EnumTipoMensagem(String descricao) {
		this.descricao = descricao;
	}

}
