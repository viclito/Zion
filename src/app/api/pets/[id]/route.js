import { NextResponse } from 'next/server';
import { getPetById, updatePet, deletePet } from '@/services/pet.service';

export async function GET(request, { params }) {
  console.log("Triggering HMR for GET /api/pets/[id]");
  try {
    const { id } = await params;
    const pet = await getPetById(id);
    if (!pet) {
      return NextResponse.json({ success: false, message: 'Pet not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: pet });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  console.log("Triggering HMR for PUT /api/pets/[id]");
  try {
    const { id } = await params;
    const body = await request.json();
    const updatedPet = await updatePet(id, body);
    
    if (!updatedPet) {
      return NextResponse.json({ success: false, message: 'Pet not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedPet });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const deletedPet = await deletePet(id);
    
    if (!deletedPet) {
      return NextResponse.json({ success: false, message: 'Pet not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
