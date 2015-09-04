/*
 * Copyright 2015 MV Informática.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
