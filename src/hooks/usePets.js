import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_URL = '/api/pets';

// Fetch Pets
export function usePets(category = 'all') {
  return useQuery({
    queryKey: ['pets', category],
    queryFn: async () => {
      const url = category && category !== 'all' ? `${API_URL}?category=${category}` : API_URL;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch pets');
      const json = await res.json();
      return json.data;
    },
  });
}

// Fetch single Pet
export function usePet(id) {
  return useQuery({
    queryKey: ['pet', id],
    queryFn: async () => {
      if (!id) return null;
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) throw new Error('Failed to fetch pet');
      const json = await res.json();
      return json.data;
    },
    enabled: !!id,
  });
}

// Add Pet
export function useAddPet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newPet) => {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPet),
      });
      if (!res.ok) throw new Error('Failed to add pet');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] });
    },
  });
}

// Update Pet
export function useUpdatePet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update pet');
      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['pets'] });
      queryClient.invalidateQueries({ queryKey: ['pet', variables.id] });
    },
  });
}

// Delete Pet
export function useDeletePet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete pet');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] });
    },
  });
}
