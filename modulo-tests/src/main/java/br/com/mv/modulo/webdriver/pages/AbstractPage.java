package br.com.mv.modulo.webdriver.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class AbstractPage {
	
	protected WebDriver driver;
	private String context;
	private int port;

	@FindBy(css = "label.error, .alert-error")
	private WebElement errors;

	
	public AbstractPage(WebDriver driver, String context, int port) {
		this.driver = driver;
		this.context = context;
		this.port = port;
	}

	
	public String getErrors() {
		return errors.getText();
	}

    protected void get(String relativeUrl) {
    	String url = "http://localhost:" + port + context + relativeUrl;
    	driver.get(url);
    }
}
