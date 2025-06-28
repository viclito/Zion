import BrammaDetails from './BrammaDetails'; // Import the Client Component
import { data } from '@/Datas/Bramma';

export const dynamic = 'force-dynamic'; // Force dynamic rendering

export default function Page({ params }) {
  const { id } = params;


  const bramma = data.find((c) => c?.id === parseInt(id));


  if (!bramma) {
    return <p>Bramma not found</p>;
  }

  return <BrammaDetails bramma={bramma} />; // Pass the bramma data to the Client Component
}

