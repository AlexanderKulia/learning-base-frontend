import { Browser, Page } from "puppeteer";
import { keys } from "../src/config/keys";
import { getContentOf, launch, login } from "./helpers";

let p: Page, b: Browser;

const mockNote = {
  title: "Test note 1",
  content: "Lorem ipsum",
  tags: ["Tag 1", "Tag 2", "Tag 3"],
};

beforeEach(async () => {
  [p, b] = await launch();
});

afterEach(async () => {
  await b.close();
});

describe("when logged in", () => {
  beforeEach(async () => {
    await login(p);
    await p.waitForSelector("#new");
    await p.click("#new");
  });

  test("can see note create form", async () => {
    const pageTitle = await getContentOf(p, "h6");
    expect(pageTitle).toEqual("Create Note");
  });

  describe("using valid inputs", () => {
    beforeEach(async () => {
      await p.type("#title", mockNote.title);
      await p.type(".ProseMirror", mockNote.content, { delay: 100 });
      await p.click("form button[type='submit']");
    });

    test("submitting adds notes to index page", async () => {
      await p.waitForTimeout(2000);
      const title = await getContentOf(p, "#cardHeader span");
      expect(title).toEqual(mockNote.title);
      await p.click("#delete");
      await p.waitForSelector("#mui-1");
      await p.click("#mui-1");
      await p.waitForTimeout(2000);
      const noNotes = await getContentOf(p, "#notesContainer span");
      expect(noNotes).toEqual("No notes found");
    });
  });

  describe("using invalid inputs", () => {
    beforeEach(async () => {
      // sometimes title is not getting validated for some reason. need to touch the field first
      await p.click("#title");
      await p.click("form button[type='submit']");
    });

    test("form shows error messages", async () => {
      const titleError = await getContentOf(p, "#title-helper-text");
      const contentError = await getContentOf(p, "#content-helper-text");
      expect(titleError).toEqual("Required");
      expect(contentError).toEqual("Required");
    });
  });
});

describe("when not logged in", () => {
  test("cannot access notes", async () => {
    await p.goto(`${keys.frontendUrl}/notes`);
    await p.waitForSelector("h5#title");
    const title = await getContentOf(p, "h5#title");
    expect(title).toEqual("Sign in");
  });
});
