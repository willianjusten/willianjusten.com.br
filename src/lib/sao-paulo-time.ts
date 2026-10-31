const saoPauloClockFormat = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: "America/Sao_Paulo",
});

/** Local time in São Paulo as 24h "HH:MM". */
export function formatSaoPauloTime(moment: Date): string {
  return saoPauloClockFormat.format(moment);
}
