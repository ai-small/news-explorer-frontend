export default function getAdjectiveEnding(number, endingsArray) {
  const numberMod100 = number % 100;
  const numberMod10 = numberMod100 % 10;

  if (numberMod100 === 11) return endingsArray[1];
  if (numberMod10 === 1) return endingsArray[0];
  return endingsArray[1];
}
