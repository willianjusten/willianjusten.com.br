const saoPauloClockFormat = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: "America/Sao_Paulo",
});

export function formatSaoPauloTime(moment: Date): string {
  return saoPauloClockFormat.format(moment);
}
