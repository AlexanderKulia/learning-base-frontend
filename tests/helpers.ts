import pptr, { Browser, Page } from "puppeteer";
import { keys } from "../src/config/keys";

export const launch = async (): Promise<[p: Page, b: Browser]> => {
  const b = await pptr.launch({
    headless: true,
    args: ["--start-maximized"],
  });
  const p = await b.newPage();
  await p.setViewport({ width: 0, height: 0 });
  return [p, b];
};

export const login = async (p: Page): Promise<void> => {
  await p.goto(keys.frontendUrl);
  await p.waitForSelector("#email");
  await p.waitForSelector("#password");
  await p.click("#email");
  await p.keyboard.type(keys.testEmail);
  await p.click("#password");
  await p.keyboard.type(keys.testPassword);
  await p.click("#signIn[type='submit']");
};

export const logout = async (p: Page): Promise<void> => {
  await p.click("#menu");
  await p.click("#logout");
};

export const getContentOf = (p: Page, selector: string): Promise<string> => {
  return p.$eval(selector, (el) => el.innerHTML);
};

export const getValueOf = (
  p: Page,
  selector: string,
): Promise<string | null> => {
  return p.$eval(selector, (el) => el.getAttribute("value"));
};
