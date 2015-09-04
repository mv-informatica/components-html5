package br.com.mv.modulo.exception;

import lombok.Getter;
import lombok.Setter;
import br.com.mv.modulo.model.type.EnumTipoMensagem;

@SuppressWarnings("serial")
public class GenericException extends Exception {

	@Getter
	@Setter
	private EnumTipoMensagem messageType;
	
	public GenericException() {
		super();
	}

	public GenericException(String resourceKey) {
		super(resourceKey);
		this.messageType = EnumTipoMensagem.ERRO;
	}

	public GenericException(String resourceKey, EnumTipoMensagem messageType) {
		this(resourceKey);
		this.messageType = messageType;
	}
}
