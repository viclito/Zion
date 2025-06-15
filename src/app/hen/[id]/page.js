import HenDetails from './HenDetails'; // Import the Client Component
import { data } from '@/Datas/Hen';

export const dynamic = 'force-dynamic'; // Force dynamic rendering

export default function Page({ params }) {
  const { id } = params;

  // Find the hen in the static data array
  const hen = data.find((c) => c.id === parseInt(id));

  if (!hen) {
    return <p>Hen not found</p>;
  }

  return <HenDetails hen={hen} />; // Pass the hen data to the Client Component
}

export async function generateStaticParams() {
  // Generate static paths for all hens in the data array
  return data.map((hen) => ({
    id: hen.id.toString(),
  }));
}