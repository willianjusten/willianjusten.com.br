type Props = {
  dateString: string;
};

const DateFormatter = ({ dateString }: Props) => {
  const date = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
  return <time dateTime={dateString}>{date}</time>;
};

export default DateFormatter;
