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
package org.springframework.data.convert;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class JsonBooleanDeserializer extends JsonDeserializer<Boolean> {

	protected static final String NO = "false";
	protected static final String YES = "true";

	@Override
	public Boolean deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException {
		JsonToken currentToken = jp.getCurrentToken();

		if (currentToken.equals(JsonToken.VALUE_STRING)) {
			String text = jp.getText().trim();

			if (YES.equalsIgnoreCase(text)) {
				return Boolean.TRUE;
			} else if (NO.equalsIgnoreCase(text)) {
				return Boolean.FALSE;
			}

			throw ctxt.weirdStringException(text, Boolean.class, "Only \"" + YES + "\" or \"" + NO + "\" values supported");
		} else if (currentToken.equals(JsonToken.VALUE_NULL)) {
			return getNullValue();
		}

		throw ctxt.mappingException(Boolean.class);
	}

	@Override
	public Boolean getNullValue() {
		return Boolean.FALSE;
	}

}
