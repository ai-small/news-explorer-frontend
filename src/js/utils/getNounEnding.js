export default function getNounEnding(number, endingsArray) {
  const numberMod100 = number % 100;
  const numberMod10 = numberMod100 % 10;

  if (numberMod100 >= 5 && numberMod100 <= 20) return endingsArray[1];
  if (numberMod10 === 1) return endingsArray[0];
  if (numberMod10 >= 2 && numberMod10 <= 4) return endingsArray[2];
  return endingsArray[1];
}
