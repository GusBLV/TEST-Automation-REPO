const { remote } = require('webdriverio');
const assert = require('assert');

(async () => {
    const browser = await remote({
        logLevel: 'error',
        capabilities: {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: ['--headless', '--disable-gpu']
            }
        }
    });

    try {
        await browser.url('https://regression4.unqork.io/app/designer#/display/home');

        // Wait and verify welcome text
        const welcome = await browser.$("//h1[contains(text(),'Welcome, automation+designer@unqork.com')]");
        await welcome.waitForDisplayed({ timeout: 10000 });
        const welcomeText = await welcome.getText();
        assert(welcomeText.includes("automation+designer@unqork.com"), "❌ Welcome text not found");

        // Check for "Edit Module" card
        const editCard = await browser.$("//div[contains(@class,'quickStartCard')]//h2[contains(text(),'Edit Module')]");
        const isEditVisible = await editCard.isDisplayed();
        assert(isEditVisible, "❌ Edit Module card not visible");

        // Ensure at least one recent module row exists
        const rows = await browser.$$("table tbody tr");
        assert(rows.length > 0, "❌ No recent modules found");

        console.log("✅ All assertions passed.");

    } catch (err) {
        console.error(err);
    } finally {
        await browser.deleteSession();
    }
})();
