export function compareArrays(main: Array<string>, toCompare: Array<string>) {
  const missing = main
    .filter((x) => !toCompare.includes(x))
    .map((item) => `-${item}`);

  const additional = toCompare
    .filter((x) => !main.includes(x))
    .map((item) => `+${item}`);

  return [...missing, ...additional];
}
