package br.com.mv.modulo.exception;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class GenericMessages {
	
	@Autowired
    private MessageSource messageSource;
	
	private final Locale locale = LocaleContextHolder.getLocale();
	
	
	public String getSaveSuccess() {
		return messageSource.getMessage("ctrl.message.success.save", null, locale);
	}
	
	public String getDeleteSuccess() {
		return messageSource.getMessage("ctrl.message.success.delete", null, locale);
	}
	
	public String getNotFound() {
		return messageSource.getMessage("ctrl.message.error.notfound", null, locale);
	}
	
	public String getMessage(String messageKey) {
		return messageSource.getMessage(messageKey, null, locale);
	}

}
