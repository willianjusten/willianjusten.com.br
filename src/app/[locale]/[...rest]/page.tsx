import { notFound } from "next/navigation";

/** Unknown paths inside a locale have no route of their own, so they render the localized 404. */
export default function UnknownRoutePage() {
  notFound();
}
