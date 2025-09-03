export default function MiddleTruncatedText({
  text,
  maxLength = 20,
  className = "",
}: {
  text: string;
  maxLength?: number;
  className?: string;
}) {
  const truncateMiddle = (str: string, max: number) => {
    if (str.length <= max) return str;
    const start = Math.ceil(max / 2) - 2;
    const end = Math.floor(max / 2) - 2;
    return str.substring(0, start) + "..." + str.substring(str.length - end);
  };

  return (
    <span className={`font-mono ${className}`}>
      {truncateMiddle(text, maxLength)}
    </span>
  );
}
