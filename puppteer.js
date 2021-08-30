const puppeteer = require('puppeteer');
// npm i puppeteer
//headless open browser false // if headless remove then 
// no browser open but runnig on background
let browserStartPromise = puppeteer.launch( {
    //visibility of browser
    headless:false,
    // size of browser
    defaultViewport: null,
    //setting 
    arg:["--start-maximized", "--start-fullscreen", "--disable-notifications"]
});

// browserStartPromise.then(function (browserObj) {
//     console.log("Browser Opened");
//     let browserTabOpenPromise = browserObj.newPage();
//     browserTabOpenPromise.then(function (page) {
//         console.log("new Tab opened");
//         let googlePageOpenPromise = page.goto("http://www.google.com/");
//         googlePageOpenPromise.then(function () {
//             console.log("google opend");
//         }) // this for opeining new page 
//     })
// })

//##################### Efficiant way of writing above code#############

// browserStartPromise.then(function (browserObj) {
//     console.log("Browser Opened");
//     let browserTabOpenPromise = browserObj.newPage();
//     return browserTabOpenPromise;
// }).then(function (page) {
//     let googlePageOpenPromise = page.goto("http://www.google.com/");
//     // this for opeining new page 
//     return googlePageOpenPromise;
// }).then(function (page){
//     console.log("google open" +page);
// })


//########### opening gooogle and search keyword
let page,browser,rTab;
browserStartPromise.then(function (browserObj){
    console.log("Browser opened");
    browser = browserObj;
    let browserOpenNewTab = browserObj.newPage();
    return browserOpenNewTab;
}).then(function(newTab){
    page = newTab;
    console.log("new Tab has Opened");
    let openGoogle = newTab.goto("http://www.google.com/");
    return openGoogle;
}).then(function(){
    console.log("google home page opened");
    let waitTypingPromise = page.type("input[title='Search']", "pepcoding");
    return waitTypingPromise;
}).then(function(){
    let enterWillBeDonePromise = page.keyboard.press('Enter',{delay:1000});
    return enterWillBeDonePromise;
}).then(function(){
    let waitForElement = page.waitForSelector(".LC20lb.DKV0Md", {visible: true});
    return waitForElement;
}).then(function(){
    let elementClcikPromise = page.click(".LC20lb.DKV0Md");
    return elementClcikPromise;
}).then(function(){
    let clickModal = page.click("#lp_modal_close", {delay:1000});
    return clickModal;
}).then(function (){
    let allLisPromise = page.$$(".site-nav-li");
    return allLisPromise;
}).then(function(allLisPromise){
    let elementWillBeClicked = allLisPromise[6].click();
    return elementWillBeClicked;
}).then(function(){
    let waitPromise = page.waitFor(2000);
    return waitPromise;
}).then(function(){
    console.log("page opened");
}).then(function(){
    let listOfOpenTab = browser.pages();
    return listOfOpenTab;
}).then(function(array){
    rTab   = array[array.length-1];
    let waitForLevel1 = rTab.waitForSelector('h2[title="Data Structures and Algorithms in Java [Level 1 - Foundation]"]',{visible : true});
    return waitForLevel1;
}).then(function(){
    let openLevel1 = rTab.click('h2[title="Data Structures and Algorithms in Java [Level 1 - Foundation]"]');
    return openLevel1;
}).then(function(){
    console.log("level1");
})

