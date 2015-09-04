package br.com.mv.modulo;

import org.junit.After;
import org.junit.Before;
import org.openqa.selenium.WebDriver;
import org.springframework.test.web.servlet.htmlunit.webdriver.MockMvcHtmlUnitDriverBuilder;

import br.com.mv.modulo.webdriver.pages.LoginPage;

public abstract class WebDriverTestsConfig extends TestsConfig {
	
	protected WebDriver webDriver;
	
	@Before
	@Override
    public void setup() {
		super.setup();
		webDriver = MockMvcHtmlUnitDriverBuilder
			    .mockMvcSetup(mockMvc)
			    .contextPath(contextPath)
			    .build();
		
		LoginPage loginPage = new LoginPage(webDriver, contextPath, port);
		loginPage.login(ADMIN_USER_NAME, ADMIN_PASSWORD);
	}
	
	@After
	public void close() {
		webDriver.close();
	}

}
