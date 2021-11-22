// background.js

let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
    console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.commands.onCommand.addListener((command) => {

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        console.log(tab);
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => {

                // Create an XMLHttpRequest object
                const xhttp = new XMLHttpRequest();

                // Define a callback function
                xhttp.onload = function() {
                    console.log('data received');
                    document.body.innerText = `I recieved a request at ${Date.now()}`;
                }

                // Send a request
                const url = 'http://localhost:9999/';
                xhttp.open("GET", url);
                xhttp.send();
            },
        });
    });

});