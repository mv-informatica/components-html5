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
