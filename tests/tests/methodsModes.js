// @ts-check

const { expect } = require("@playwright/test");

//МЕТОДЫ ДЛЯ ПОЛЕЙ
//очищение поля
async function clearInput(page, locator, label) {
  const input = await locator.getByLabel(label);
  await input.click();
  await input.fill("");
  await input.press("Enter");
  await input.click();
  return input;
}

//ввод значения в поле
async function inputValue(page, locator, label, value, valueExpect) {
  const input = await clearInput(page, locator, label);
  await input.fill(value);
  await input.press("Enter");
  await expect(input).toHaveValue(valueExpect);
}

//Стрелки "Вверх" и "Вниз" (увеличение/уменьшение значения в поле)
async function upAndDownArrow(page, locator, label, arrow, value, valueExpect) {
  const input = await clearInput(page, locator, label);
  const arrows = await arrow;
  await input.fill(value);
  await input.press("Enter");
  await arrows.first().click();
  await expect(input).toHaveValue(valueExpect);
}

//Копирование из одного поля в другое
async function ctrl(page, locator, label, locator2, value, valueExpect) {
  const input = await clearInput(page, locator, label);
  const locator_2 = await locator2;
  await input.fill(value);
  await input.press("Enter");
  await input.click();
  await input.press("Control+a");
  await input.press("Control+c");
  await locator_2.click();
  await locator_2.press("Control+a");
  await locator_2.press("Control+v");
  await locator_2.press("Enter");
  await expect(locator_2).toHaveValue(valueExpect);
}

//Изменение значения колесиком мыши, прокрутка ВВЕРХ и ВНИЗ шаг целое число
async function mouseWheel(page, locator, label, value, initialValue) {
  const input = await clearInput(page, locator, label);
  const box = await input.boundingBox();

  if (box === null) {
    return;
  }

  await page.mouse.move(box.width + box.x, box.height + box.y);
  await input.click();
  await input.fill(value);
  await page.mouse.wheel(0, -100); //прокрутка вверх
  const actual = await input.inputValue();
  const expected = (parseFloat(initialValue) + 1).toFixed();
  expect(actual).toEqual(expected);
  await page.mouse.wheel(0, 100); //прокрутка вниз
  const resetValue = await input.inputValue();
  expect(resetValue).toEqual(initialValue);
}

module.exports = {
  clearInput,
  inputValue,
  upAndDownArrow,
  ctrl,
  mouseWheel,
};
