import DogDetails from './DogDetails'; // Import the Client Component
import { data } from '@/Datas/Dog';

export const dynamic = 'force-dynamic'; // Force dynamic rendering

export default function Page({ params }) {
  const { id } = params;

  // Find the dog in the static data array
  const dog = data.find((c) => c.id === parseInt(id));

  if (!dog) {
    return <p>Dog not found</p>;
  }

  return <DogDetails dog={dog} />; // Pass the dog data to the Client Component
}

export async function generateStaticParams() {
  // Generate static paths for all dogs in the data array
  return data.map((dog) => ({
    id: dog.id.toString(),
  }));
}