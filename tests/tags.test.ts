import { Browser, Page } from "puppeteer";
import { getContentOf, getValueOf, launch, login } from "./helpers";

let p: Page, b: Browser;

beforeEach(async () => {
  [p, b] = await launch();
});

afterEach(async () => {
  await b.close();
});

describe("when logged in", () => {
  beforeEach(async () => {
    await login(p);
    await p.waitForSelector("#drawerTags a");
    await p.click("#drawerTags a");
    await p.waitForSelector("table#tags");
  });

  test("can see tags table", async () => {
    const pageTitle = await getContentOf(p, "h5");
    expect(pageTitle).toEqual("My Tags");
  });

  test("can edit tags", async () => {
    await p.click("table#tags svg[data-testid='EditOutlinedIcon']");
    const input = await getValueOf(p, "input#title");
    expect(input).toEqual("Tag 1");
    await p.click("input#title", { clickCount: 3 });
    await p.keyboard.press("Backspace");
    await p.type("input#title", "Tag 1 Changed", { delay: 100 });
    await p.click("button#submit");
    const firstRowTitleSelector =
      "#tags > tbody > tr:nth-child(1) > td:nth-child(2)";
    await p.waitForTimeout(2000);
    const firstRowTitle = await getContentOf(p, firstRowTitleSelector);
    expect(firstRowTitle).toEqual("Tag 1 Changed");
    // Rename tag back
    await p.waitForTimeout(2000);
    await p.click("table#tags svg[data-testid='EditOutlinedIcon']");
    await p.click("input#title", { clickCount: 3 });
    await p.keyboard.press("Backspace");
    await p.type("input#title", "Tag 1", { delay: 100 });
    await p.click("button#submit");
  });
});
