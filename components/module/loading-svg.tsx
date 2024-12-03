export default function LoadingSvg({ width }: { width: number }) {
  return (
    <img
      src="/img/Spinner@1x-1.0s-200px-200px.svg"
      className={`w-[${width}px]`}
    />
  );
}
