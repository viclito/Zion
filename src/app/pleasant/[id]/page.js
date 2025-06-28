import PleasantDetails from './PleasantDetails'; // Import the Client Component
import { data } from '@/Datas/Pleasant';

export const dynamic = 'force-dynamic'; // Force dynamic rendering

export default function Page({ params }) {
  const { id } = params;

  // Find the pleasant in the static data array
  const pleasant = data.find((c) => c.id === parseInt(id));

  if (!pleasant) {
    return <p>Pleasant not found</p>;
  }

  return <PleasantDetails pleasant={pleasant} />; // Pass the pleasant data to the Client Component
}

