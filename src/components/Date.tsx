import { parseISO, format } from "date-fns";

interface Props {
  dateString: string;
}

export const Date = ({ dateString }: Props) => {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
};
