package br.com.mv.modulo.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.Setter;

@ConfigurationProperties
@Getter @Setter
public class ModuloProperties {

	private String reportPrintServerURI;

}
