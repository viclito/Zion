'use client';

import { useParams } from 'next/navigation';
import HenDetails from './HenDetails';
import { usePet } from '@/hooks/usePets';

export default function Page() {
  const params = useParams();
  const id = params?.id;

  const { data: hen, isLoading, isError } = usePet(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
         <p className="text-2xl font-black text-[var(--accent-teal)] animate-pulse">Loading clucker details... ⏳</p>
      </div>
    );
  }

  if (isError || !hen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <p className="text-2xl font-black text-[var(--accent-coral)]">Hen not found 🚨</p>
      </div>
    );
  }

  return <HenDetails hen={hen} />;
}