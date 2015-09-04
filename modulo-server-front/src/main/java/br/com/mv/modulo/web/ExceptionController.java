package br.com.mv.modulo.web;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;

import br.com.mv.modulo.exception.ExceptionInfo;
import br.com.mv.modulo.exception.GenericException;
import br.com.mv.modulo.utils.ModuloEmailSender;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@ControllerAdvice
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class ExceptionController {
	
	private Exception exception;
	
	private final ModuloEmailSender moduloMailSender;
	
	@ExceptionHandler(Exception.class)
	@RequestMapping("/exception")
    public ModelAndView handleException(HttpServletRequest req, Exception e) throws Exception {
		log.trace("Exceção capturada:", e);
		e.printStackTrace();
		if (AnnotationUtils.findAnnotation(e.getClass(), ResponseStatus.class) != null) {
			throw e;
		}
		
        ModelAndView mav = new ModelAndView("exception");
        mav.addObject("exception", e);
        exception = e;
        
        mav.addObject("timestamp", new Date());
        mav.addObject("url", req.getRequestURL());
        mav.addObject("status", 500);
        return mav;
    }
	
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(GenericException.class)
	@ResponseBody ExceptionInfo handleBadRequest(HttpServletRequest req, GenericException ex) {
	    return new ExceptionInfo(req.getRequestURL(), ex);
	} 
	
	@RequestMapping(value = "/sendException")
	public String sendException(Model model) {
        
		moduloMailSender.sendException(exception);
		
		model.addAttribute("exception", exception);
		model.addAttribute("timestamp", new Date());
		model.addAttribute("status", 500);
		model.addAttribute("success", "Enviado com sucesso");
		return "exception";
	}
	
//	@ExceptionHandler(AuthorizationServiceException.class)
//    public ModelAndView handleAuthorizationServiceException(HttpServletRequest req, Exception e) throws Exception {
//		if (AnnotationUtils.findAnnotation(e.getClass(), ResponseStatus.class) != null) {
//			throw e;
//		}
//		
//        ModelAndView mav = new ModelAndView("index");
//        mav.addObject("exception", e);
//        exception = e;
//        
//        mav.addObject("timestamp", new Date());
//        mav.addObject("url", req.getRequestURL());
//        mav.addObject("status", HttpStatus.UNAUTHORIZED);
//        return mav;
//    }
	
}
