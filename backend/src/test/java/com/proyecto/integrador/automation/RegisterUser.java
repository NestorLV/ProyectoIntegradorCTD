package com.proyecto.integrador.automation;

import org.junit.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.ArrayList;
import java.util.concurrent.TimeUnit;


public class RegisterUser {
    private static WebDriver driver;

    @BeforeClass
    public static void initializeDriver(){//arrancar y automatizar

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--incognito");
        DesiredCapabilities capabilities = DesiredCapabilities.chrome();
        capabilities.setCapability(ChromeOptions.CAPABILITY, options);
        driver = new ChromeDriver(capabilities);
    }


    @Test
    public void checkButtonRegister() throws InterruptedException {
        driver.get("http://localhost:3000/");
        WebElement createC= driver.findElement(By.id("createC"));
        createC.click();

        WebDriverWait wait = new WebDriverWait(driver,5);
        WebElement createF = driver.findElement(By.id("name"));
        wait.until(ExpectedConditions.visibilityOf(createF));
        long timeToSleep = 1L;
        TimeUnit time = TimeUnit.SECONDS;
        time.sleep(timeToSleep);

        WebElement nameElem = driver.findElement(By.id("name"));
        nameElem.sendKeys("Pepa");



        WebElement lastElem = driver.findElement(By.id("surname"));
        wait.until(ExpectedConditions.visibilityOf(lastElem));
        lastElem.sendKeys("Pig");
        time.sleep(timeToSleep);

        WebElement emailElem = driver.findElement(By.id("email"));
        wait.until(ExpectedConditions.visibilityOf(emailElem));
        emailElem.sendKeys("digitalhousetestautomation@gmail.com");
        time.sleep(timeToSleep);

        WebElement passElem = driver.findElement(By.id("password"));

        passElem.sendKeys("digitalHouse1");
        time.sleep(timeToSleep);

        WebElement confElem = driver.findElement(By.id("confirm-password"));
        confElem.sendKeys("digitalHouse1");
        time.sleep(timeToSleep);

        WebElement btmCreate = driver.findElement(By.id("butCreate"));
        btmCreate.click();

        ((JavascriptExecutor)driver).executeScript("window.open()");
        ArrayList<String> tabs = new ArrayList<String>(driver.getWindowHandles());
        driver.get("https://accounts.google.com/signin/v2/identifier?passive=1209600&continue=https%3A%2F%2Faccounts.google.com%2FEditPasswd%3Fhl%3Des&followup=https%3A%2F%2Faccounts.google.com%2FEditPasswd%3Fhl%3Des&hl=es&flowName=GlifWebSignIn&flowEntry=ServiceLogin");
        driver.switchTo().window(tabs.get(0));
        WebElement mailElem = driver.findElement(By.id("identifierId"));
        mailElem.sendKeys("digitalhousetestautomation@gmail.com");
        WebElement element = driver.findElement(By.xpath("//*[@id='identifierNext']/div/button"));
        element.click();

        time.sleep(timeToSleep);
        time.sleep(timeToSleep);
        WebElement passwordGmail = driver.findElement(By.xpath("//*[@id=\"password\"]/div[1]/div/div[1]/input"));
        passwordGmail.sendKeys("digitalHouse1");
        time.sleep(timeToSleep);
        time.sleep(timeToSleep);
        WebElement submitGmail = driver.findElement(By.xpath("//*[@id='passwordNext']/div/button"));
        submitGmail.click();
        time.sleep(timeToSleep);
        WebElement passwordGmail2 = driver.findElement(By.xpath("//*[@id=\"password\"]/div[1]/div/div[1]/input"));
        passwordGmail2.sendKeys("digitalHouse1");

        time.sleep(timeToSleep);
        WebElement submitGmail2 = driver.findElement(By.xpath("//*[@id='passwordNext']/div/button"));
        submitGmail2.click();



        ((JavascriptExecutor)driver).executeScript("window.open()");
        ArrayList<String> tabs2 = new ArrayList<String>(driver.getWindowHandles());
        driver.get("https://mail.google.com/mail/u/0/#inbox");
        driver.switchTo().window(tabs2.get(0));

        WebElement corEle = driver.findElement(By.xpath("//*[@id=\":2a\"]"));
        corEle.click();
        long timeToSleep2 = 5L;
        TimeUnit time2 = TimeUnit.SECONDS;
        time2.sleep(timeToSleep2);
        ((JavascriptExecutor)driver).executeScript("(document.getElementsByClassName('a3s aiL '))[0].firstElementChild.click()");

        ((JavascriptExecutor)driver).executeScript("window.open()");
        ArrayList<String> tabs3 = new ArrayList<String>(driver.getWindowHandles());
        driver.get("http://localhost:3000/login");
        driver.switchTo().window(tabs3.get(0));
        WebElement emailEl= driver.findElement(By.id("email"));
        emailEl.sendKeys("digitalhousetestautomation@gmail.com");

        WebElement passEl= driver.findElement(By.id("password"));
        passEl.sendKeys("digitalHouse1");

        WebElement loginEl =driver.findElement(By.id("login"));
        loginEl.click();

    }


   /*@Test
    public void loginGmail () throws InterruptedException {
        driver.get("https://accounts.google.com/signin/v2/identifier?passive=1209600&continue=https%3A%2F%2Faccounts.google.com%2FEditPasswd%3Fhl%3Des&followup=https%3A%2F%2Faccounts.google.com%2FEditPasswd%3Fhl%3Des&hl=es&flowName=GlifWebSignIn&flowEntry=ServiceLogin");
        WebElement mailElem = driver.findElement(By.id("identifierId"));
        mailElem.sendKeys("digitalhousetestautomation@gmail.com");
        WebElement element = driver.findElement(By.xpath("//*[@id='identifierNext']/div/button"));
        element.click();
       long timeToSleep = 1L;
       TimeUnit time = TimeUnit.SECONDS;
       time.sleep(timeToSleep);
       WebElement passwordGmail = driver.findElement(By.xpath("//*[@id=\"password\"]/div[1]/div/div[1]/input"));
       passwordGmail.sendKeys("digitalHouse1");
       time.sleep(timeToSleep);
       WebElement submitGmail = driver.findElement(By.xpath("//*[@id='passwordNext']/div/button"));
       submitGmail.click();
       time.sleep(timeToSleep);
       WebElement passwordGmail2 = driver.findElement(By.xpath("//*[@id=\"password\"]/div[1]/div/div[1]/input"));
       passwordGmail2.sendKeys("digitalHouse1");

       time.sleep(timeToSleep);
        WebElement submitGmail2 = driver.findElement(By.xpath("//*[@id='passwordNext']/div/button"));
        submitGmail2.click();



       ((JavascriptExecutor)driver).executeScript("window.open()");
       ArrayList<String> tabs = new ArrayList<String>(driver.getWindowHandles());
       driver.get("https://mail.google.com/mail/u/0/#inbox");
       driver.switchTo().window(tabs.get(0));

       WebElement corEle = driver.findElement(By.xpath("//*[@id=\":2a\"]"));
       corEle.click();
       long timeToSleep2 = 5L;
       TimeUnit time2 = TimeUnit.SECONDS;
       time2.sleep(timeToSleep2);
       ((JavascriptExecutor)driver).executeScript("(document.getElementsByClassName('a3s aiL '))[0].firstElementChild.click()");



      }*/


}
