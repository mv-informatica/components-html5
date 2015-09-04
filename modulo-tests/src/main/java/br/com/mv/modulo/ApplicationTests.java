package br.com.mv.modulo;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.springframework.http.HttpStatus;

public class ApplicationTests extends ModuloTestsConfig {

	@Test
	public void testResources() throws Exception {
		setHostSuffix("/lib/bootstrap/dist/css/bootstrap.min.css");
		assertEquals(HttpStatus.OK, getReturnStatus());
		setHostSuffix("/css/menu.css");
		assertEquals(HttpStatus.OK, getReturnStatus());
		setHostSuffix("/lib/jquery/dist/jquery.min.js");
		assertEquals(HttpStatus.OK, getReturnStatus());
		setHostSuffix("/components/components.js");
		assertEquals(HttpStatus.OK, getReturnStatus());
	}
}