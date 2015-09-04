package br.com.mv.modulo.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ModuloController {

	@RequestMapping("/")
    public String index() {
        return "index";
    }
	
}
