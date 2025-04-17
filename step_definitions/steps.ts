const { I } = inject();
const mongoInstance = require("../helpers/mongoSingleton");
const {ok} = require("assert");
// Add in your custom step files
//const {HomePage}=require("../helpers/HomePage");
Given('I have a defined step', () => {
    // TODO: replace with your own step
    //I.amOnPage('/');
    I.wait(5);
    I.amOnPage("/");
    I.click('.HPHeaderLogin > a');
    I.wait(5);
    I.fillField('#ctl00_MainContent_LoginControl1_TextBoxEmail','test@testing65.com');
    I.wait(1);
    I.fillField('//input[@type=\'password\']','12345');
    I.wait(2);
    I.click('//input[@id=\'ctl00_MainContent_LoginControl1_ButtonLogin\']');
    I.wait(3);
    /*I.assert
    I.waitForText()
    I.waitForValue()*/
});
