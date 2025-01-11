import PreKSearch from '../components/PreKSearch';
import PreKResults from '../components/PreKResults';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Find Your Perfect Pre-K in Cobb County</h1>
      <PreKSearch />
      <PreKResults />
    </main>
  );
}