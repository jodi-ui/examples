import {Builder, WebDriver} from 'selenium-webdriver';

declare const process;

export const browser = process.env.E2E_BROWSER || 'chrome';
export const host = process.env.E2E_HOST || 'localhost';
export const port = process.env.E2E_PORT || 19892;
export const rootDir = process.cwd();

export const getWebDriver = (): WebDriver => new Builder().forBrowser(browser).build();
