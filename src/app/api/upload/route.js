import { NextResponse } from 'next/server';
import { uploadImageBuffer } from '@/services/upload.service';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const uploadedImages = {};
    const uploadPromises = [];

    // Iterate through formData entries
    // We expect keys like 'mainImage', 'gallery0', 'gallery1', etc.
    for (const [key, value] of formData.entries()) {
      if (value && typeof value === 'object' && value.name) {
        // It's a file object
        const promise = (async () => {
           const arrayBuffer = await value.arrayBuffer();
           const buffer = Buffer.from(arrayBuffer);
           const result = await uploadImageBuffer(buffer, 'zion_pets');
           uploadedImages[key] = result.secure_url;
        })();
        uploadPromises.push(promise);
      }
    }

    if (uploadPromises.length === 0) {
      return NextResponse.json({ success: false, message: 'No valid files received.' }, { status: 400 });
    }

    // Wait for all uploads to complete
    await Promise.all(uploadPromises);

    return NextResponse.json({ 
      success: true, 
      urls: uploadedImages 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ success: false, message: 'Upload failed' }, { status: 500 });
  }
}
