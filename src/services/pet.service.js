import dbConnect from '@/lib/db';
import Pet from '@/models/Pet';

export async function getPets(query = {}) {
  await dbConnect();
  const pets = await Pet.find(query).sort({ createdAt: -1 }).lean();
  return pets;
}

export async function getPetById(id) {
  await dbConnect();
  const pet = await Pet.findById(id).lean();
  return pet;
}

export async function createPet(data) {
  await dbConnect();
  const pet = await Pet.create(data);
  return pet;
}

export async function updatePet(id, data) {
  await dbConnect();
  const pet = await Pet.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).lean();
  return pet;
}

export async function deletePet(id) {
  await dbConnect();
  const deletedPet = await Pet.findByIdAndDelete(id).lean();
  return deletedPet;
}
