import Seo from '../components/Seo.jsx';
import SideNav from '../components/SideNav.jsx';

export default function HomePage() {
  return (
    <>
      <Seo />
      <SideNav />
      <main className="min-h-screen px-6 py-24 md:pl-32">
        <section id="home" className="mx-auto max-w-5xl py-24">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-400">Portfolio</p>
          <h1 className="text-5xl font-bold tracking-tight md:text-8xl">Building digital experiences.</h1>
          <p className="mt-8 max-w-2xl text-lg text-slate-400">A new component-driven portfolio is taking shape here.</p>
        </section>
      </main>
    </>
  );
}
