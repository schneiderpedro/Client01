const { Builder, By, Key, until } = require('selenium-webdriver');

//Asynchronous function to run the test
async function googleSearchTest() {
    //Initializes the browser
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        //Navigates to the Google site
        await driver.get('https://www.google.com');
        await driver.findElement(By.id("L2AGLb")).click();
        

        //Waits until the search field is visible and interactable
        let searchInput = await driver.wait(until.elementLocated(By.name('q')), 5000);
        await driver.wait(until.elementIsVisible(searchInput), 5000);

        //Type "VFX Financial" in the search field and press Enter
        await searchInput.sendKeys('VFX Financial', Key.RETURN);

        //Waits until search results are available
        await driver.wait(until.titleContains('VFX Financial'), 5000);

        //Wait for 2 seconds (sample pause)
        await new Promise(resolve => setTimeout(resolve, 2000));

        //Check if the title of the first result contains 'VFX Financial CLP'
        let searchResults = await driver.findElement(By.css('#search'));
        let businessTitle = await searchResults.findElement(By.css('.tF2Cxc')).getText();
        if (businessTitle.includes('VFX Financial CLP')) {
            console.log('The title of the deal is "VFX Financial CLP". Test successful!');
 } else {
            console.log('The title of the deal is not "VFX Financial CLP". Test failed!');
}
 } finally {
        //Close the browser after the test
        await driver.quit();
}
}

//Calls the function to run the test
googleSearchTest();
