import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: "Zion",
  api_key: "539849857385865",
  api_secret: "A3LDwJGxTwZ41y6abO5eKRxm9EI",
});

async function testUpload() {
  try {
    const result = await cloudinary.api.ping();
    console.log("Ping Success:", result);
  } catch (error) {
    console.error("Cloudinary Error:", error);
  }
}

testUpload();
