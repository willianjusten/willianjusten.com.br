"use client";

import { useEffect, useState } from "react";
import { formatSaoPauloTime } from "../lib/sao-paulo-time";

const REFRESH_INTERVAL_IN_MILLISECONDS = 30_000;
const TIME_PLACEHOLDER = "--:--";

/** Live São Paulo clock. Renders a placeholder on the server and fills in after mount. */
export function LocalTime() {
  const [formattedTime, setFormattedTime] = useState(TIME_PLACEHOLDER);

  useEffect(() => {
    function refreshTime() {
      setFormattedTime(formatSaoPauloTime(new Date()));
    }
    refreshTime();
    const intervalId = window.setInterval(refreshTime, REFRESH_INTERVAL_IN_MILLISECONDS);
    return () => window.clearInterval(intervalId);
  }, []);

  return <span suppressHydrationWarning>{formattedTime}</span>;
}
