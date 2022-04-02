import { Browser, Page } from "puppeteer";
import { keys } from "../src/config/keys";
import { getContentOf, launch, login } from "./helpers";

let p: Page, b: Browser;

beforeEach(async () => {
  [p, b] = await launch();
});

afterEach(async () => {
  await b.close();
});

test("can login and logout", async () => {
  await login(p);
  await p.waitForSelector("#home");
  const homeBtn = await getContentOf(p, "#home");
  expect(homeBtn).toEqual("Learning Base");
  await p.click("#menu");
  await p.click("#logout");
  await p.waitForSelector("h5#title");
  const pageTitle = await getContentOf(p, "h5#title");
  expect(pageTitle).toEqual("Sign in");
  expect(p.url()).toEqual(`${keys.frontendUrl}/signin`);
  await p.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
  const titleAfterRefresh = await getContentOf(p, "h5#title");
  expect(titleAfterRefresh).toEqual("Sign in");
});
