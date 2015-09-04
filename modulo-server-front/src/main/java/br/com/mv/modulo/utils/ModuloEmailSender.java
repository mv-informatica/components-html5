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
package br.com.mv.modulo.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Component;

@Component
public class ModuloEmailSender {
	
	private final MailSender mailSender;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ModuloEmailSender.class);
	
	@Autowired
	public ModuloEmailSender(MailSender mailSender) {
		this.mailSender = mailSender;
	}
	
	public void sendEmail(String content) {
		SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo("suporte@mv.com.br");
        mailMessage.setFrom("dispensacao@mv.com.br");
        mailMessage.setSubject("Erro no sistema Dispensação de medicamento!");
        mailMessage.setText(content);
        
        try {
        	mailSender.send(mailMessage);
        } catch (MailException ex) {
        	LOGGER.error("Erro ao enviar email:", ex);
        }
	}
	
	public void sendException(Exception exception) {
		StringBuilder str = new StringBuilder();
		str.append("Erro: " + exception.toString() + System.lineSeparator());
		str.append("Mensagem: " + exception.getLocalizedMessage() + System.lineSeparator());
		str.append("Stack: " + System.lineSeparator());
        for (StackTraceElement element : exception.getStackTrace()) {
        	str.append(element.toString() + System.lineSeparator());
        }
        
        sendEmail(str.toString());
	}

}
