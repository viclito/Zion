import { NextResponse } from 'next/server';
import { getPets, createPet } from '@/services/pet.service';

export async function GET(request) {
  console.log("Triggering HMR for GET /api/pets");
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    const query = category && category !== 'all' ? { category } : {};
    const pets = await getPets(query);
    
    return NextResponse.json({ success: true, data: pets });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  console.log("Triggering HMR for POST /api/pets");
  try {
    const body = await request.json();
    const newPet = await createPet(body);
    
    return NextResponse.json({ success: true, data: newPet }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
