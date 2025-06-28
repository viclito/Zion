import SilkieDetails from './SilkieDetails'; // Import the Client Component
import { data } from '@/Datas/Silkie';

export const dynamic = 'force-dynamic'; // Force dynamic rendering

export default function Page({ params }) {
  const { id } = params;

  // Find the silkie in the static data array
  const silkie = data.find((c) => c.id === parseInt(id));

  if (!silkie) {
    return <p>Silkie not found</p>;
  }

  return <SilkieDetails silkie={silkie} />; // Pass the silkie data to the Client Component
}

export async function generateStaticParams() {
  // Generate static paths for all silkies in the data array
  return data.map((silkie) => ({
    id: silkie.id.toString(),
  }));
}