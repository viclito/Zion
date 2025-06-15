import FishDetails from './FishDetails'; // Import the Client Component
import { data } from '@/Datas/Fish';

export const dynamic = 'force-dynamic'; // Force dynamic rendering

export default function Page({ params }) {
  const { id } = params;

  // Find the fish in the static data array
  const fish = data.find((c) => c.id === parseInt(id));

  if (!fish) {
    return <p>Fish not found</p>;
  }

  return <FishDetails fish={fish} />; // Pass the fish data to the Client Component
}

export async function generateStaticParams() {
  // Generate static paths for all fish in the data array
  return data.map((fish) => ({
    id: fish.id.toString(),
  }));
}