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
