// @ts-check
const { test, expect } = require("@playwright/test");
const {
  clearInput,
  inputValue,
  upAndDownArrow,
  ctrl,
  mouseWheel,
} = require("./methodsModes");
const { urlToHttpOptions } = require("url");

test.describe("---", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://0.0.0.1:3000");
    await page.getByRole("button", { name: "---" }).click();
  });

    test.describe("Поля", () => {

    //Тесты на Поле "Старт" ("---")
    test.describe("Старт, кейс ---", () => {

    //объявлена переменная для локатора поля "Кол-во знаков после запятой" (Глобальные настройки)
    let globalSettingRoundTitle = '//*[@id="globalSettingRoundTitle"]';

          //объявлена переменная хранящая массив со списками проверяемых значений по типу ["вводимое значение", "ожидаемый рез-т"]
        let valuesToCheck = [
            ["180", "180"],
            ["180.8", "180"],
            ["180.88", "180"],
            ["180,8", "180"],
            ["-1", "0"],
            ["0", "0"],
            ["1", "1"],
            ["359", "359"],
            ["360", "360"],
            ["361", "360"],
            ["абвгдея", "0"],
            ["abcdi", "0"],
            ["~!@#$%^&*()_+{}|:>?<Ё”№Ъ/,.;’[]|", "0"],
            ["", "0"], 
            ["       ", "0"],
            ["     1", "1"],
            ["1   0", "1"],
            ["1      ", "1"],
            ["-180", "0"],
            ["-180.8", "0"],
            ["-180,8", "0"],
            ["0000000000000000", "0"],
            ["3600", "360"]
          ];

            valuesToCheck.forEach((values) => {
              test(values[0] + " " + values[1], async ({ page }) => {
                const locator = page.locator(globalSettingRoundTitle);
                await inputValue(page, locator, values[0], values[1]);
              });
            });

          test("Стрелка вверх", async ({ page }) => {
            const locator = await page
              .locator("div")
              .filter({ hasText: /^---$/ });
            const arrow = await page.locator(".column > button");
            await upAndDownArrow(page, locator, "Старт", arrow, "100", "101");
          });

          test("Стрелка вниз", async ({ page }) => {
            const locator = await page
              .locator("div")
              .filter({ hasText: /^---$/ });
            const arrow = await page.locator(".column > button:nth-child(2)");
            await upAndDownArrow(page, locator, "Старт", arrow, "100", "99");
          });

          test("Изменение значения колесиком мыши, прокрутка ВВЕРХ и ВНИЗ", async ({
            page,
          }) => {
            const locator = await page
              .locator("div")
              .filter({ hasText: /^---$/ });
            const initialValue = "99";
            await mouseWheel(page, locator, "Старт", "99", initialValue);
          });

          test("CTRL+C", async ({ page }) => {
            const locator = await page.locator('div').filter({ hasText: /^---$/ });
            const locator2 = await page.locator('div').filter({ hasText: /^---$/ }).getByLabel('Старт');
            await ctrl(page, locator, "Старт", locator2, "20", "20");
          });

          test("CTRL+V", async ({ page }) => {
            const locator = await page.locator('div').filter({ hasText: /^---$/ });
            const locator2 = await page.locator('div').filter({ hasText: /^---$/ }).getByLabel('Старт');
            await ctrl(page, locator, "Старт", locator2, "5", "5");
          });

          test("359 + Стрелка вверх", async ({ page }) => {
            const locator = await page
              .locator("div")
              .filter({ hasText: /^---$/ });
            const arrow = await page.locator(".column > button");
            await upAndDownArrow(page, locator, "Старт", arrow, "359", "360");
          });

          test("1 + Стрелка вниз", async ({ page }) => {
            const locator = await page
              .locator("div")
              .filter({ hasText: /^---$/ });
            const arrow = await page.locator(".column > button:nth-child(2)");
            await upAndDownArrow(page, locator, "Старт", arrow, "1", "0");
          });
        });
      });
    })
