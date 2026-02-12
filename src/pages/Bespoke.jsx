import SEO from '../components/SEO';
import BespokeIntro from '../components/bespoke/BespokeIntro';
import BespokeRequestForm from '../components/bespoke/BespokeRequestForm';

const Bespoke = () => {
  return (
    <main className="w-full font-lato">
      <SEO
        title="Bespoke"
        description="Request a bespoke piece or re-creation. Share your measurements, style, and reference photos."
        canonicalPath="/bespoke"
      />
      <BespokeIntro />
      <BespokeRequestForm />
    </main>
  );
};

export default Bespoke;
