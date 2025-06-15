import CatDetails from './CatDetails'; // Import the Client Component
import { data } from '@/Datas/Cat';

export const dynamic = 'force-dynamic'; // Force dynamic rendering

export default function Page({ params }) {
  const { id } = params;

  // Find the cat in the static data array
  const cat = data.find((c) => c.id === parseInt(id));

  if (!cat) {
    return <p>Cat not found</p>;
  }

  return <CatDetails cat={cat} />; // Pass the cat data to the Client Component
}

export async function generateStaticParams() {
  // Generate static paths for all cats in the data array
  return data.map((cat) => ({
    id: cat.id.toString(),
  }));
}