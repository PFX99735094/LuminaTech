import { BnccAlignment } from '../components/BnccAlignment';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';
import { Hero } from '../components/Hero';
import { ProjectShowcase } from '../components/ProjectShowcase';
import { TopNav } from '../components/TopNav';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-paper-50 font-body text-ink-900 selection:bg-cyan-spark selection:text-ink-900">
      <TopNav />
      <main>
        <Hero />
        <ProjectShowcase />
        <BnccAlignment />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
