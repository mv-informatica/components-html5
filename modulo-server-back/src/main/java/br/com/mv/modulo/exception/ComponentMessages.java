package br.com.mv.modulo.exception;

import org.springframework.stereotype.Component;

import br.com.mv.modulo.model.type.EnumTipoMensagem;

@Component
public class ComponentMessages {
	public EnumTipoMensagem messageType;
	public String message;
}
