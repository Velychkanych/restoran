/**
 * Template перемонтовується при кожній навігації — дає плавну появу
 * сторінки (CSS-анімація .page-enter у globals.css).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
