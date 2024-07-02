import Link from "next/link";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  date: string;
  description: string;
  slug: string;
};

export function PostLink({ title, date, description, slug }: Props) {
  return (
    <div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{description}</p>
    </div>
  );
}
