/**
 * Загружает все блоки АЭС и возвращает отсортированный список опций.
 *
 * @returns {Promise<Array<{text: string, value: number}> | undefined>}
 *   Массив опций { text: "shortName number", value: id }, отсортированный по тексту.
 */
export const getBlocks = () => async () => {
  const data = [];
  return data.sort((a, b) => a.text.localeCompare(b.text));
};