export default function Title({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="max-w-3xl">
      <h2 className="mb-2 text-2xl">{title}</h2>
      <p>{text}</p>
    </div>
  );
}
