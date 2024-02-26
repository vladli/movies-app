type Props = { children: React.ReactNode };
export default function DotBackground({ children }: Props) {
  return (
    <div className="w-full grow dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="z-10 relative">{children}</div>
    </div>
  );
}
