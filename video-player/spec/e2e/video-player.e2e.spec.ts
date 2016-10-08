import {expect} from 'chai';
import {By, until, WebElement, WebDriver} from 'selenium-webdriver';
import {host, port, rootDir, getWebDriver} from '../../../e2e.core';

describe(`Video Player`, () => {
    let driver: WebDriver;

    const videoPlayerUrl = `http://${host}:${port}/video-player.html`;
    const loadTimeout = 5000;
    const testVideoDuration = 5.568;

    const waitForAppToLoad = () => driver.wait(until.elementLocated(By.tagName('app-component')), loadTimeout);

    const loadTestFile = () => driver.findElement(By.css('loader-component input[type="file"]')).then((file: WebElement) => {
        file.sendKeys(`${rootDir}/video-player/spec/resources/video.mp4`);
    });

    const waitForVideoToLoad = () => driver.wait(
        until.elementLocated(By.css('player-component video[data-duration]:not([data-duration="0"]')) // it's loaded
    );

    beforeEach(() => {
        driver = getWebDriver();
    });

    afterEach(() => {
        driver.quit();
    });

    it(`should be able to load video files`, (done) => {
        driver.get(videoPlayerUrl);
        waitForAppToLoad()
            .then(loadTestFile)
            .then(waitForVideoToLoad)
            .then(() => driver.executeScript(() => {
                const video = <HTMLVideoElement> document.querySelector('player-component video');
                return video.duration;
            }))
            .then((duration) => {
                expect(duration).to.equal(testVideoDuration);
                done();
            });
    });

    it(`should update video's time if user clicks on progress bar`, (done) => {
        driver.get(videoPlayerUrl);
        waitForAppToLoad()
            .then(loadTestFile)
            .then(waitForVideoToLoad)
            .then(() => driver.wait(until.elementLocated(By.tagName('playback-progress-bar-component'))))
            .then(() => driver.executeScript(() => {
                // we're not using Selenium's feature since it doesn't always work on all supported browsers
                const bar = <HTMLElement> document.querySelector('playback-progress-bar-component');
                const rect = bar.getBoundingClientRect();
                const event = new MouseEvent('click', {
                    clientX: rect.left + (rect.width / 5), // 20%
                    clientY: rect.top
                });

                bar.dispatchEvent(event);
            }))
            .then(() => driver.executeScript(() => {
                const video = <HTMLVideoElement> document.querySelector('player-component video');
                return video.currentTime;
            }))
            .then((currentTime) => {
                expect(currentTime).to.be.approximately((testVideoDuration / 5), 1); // 20%
                done();
            });
    });
});
