import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { collection, addDoc } from 'firebase/firestore';
import { encryptPOI } from '@/lib/privacy';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, lat, lng, category, description } = body;

    if (!name || !lat || !lng) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 1. Encrypt the data HERE before it touches the DB
    const encryptedData = encryptPOI({
      name,
      lat,
      lng,
      category,
      description
    });

    // 2. Upload the meaningless ciphertext to Firebase
    const docRef = await addDoc(collection(db, "secure_pois"), encryptedData);

    return NextResponse.json({ 
      success: true, 
      id: docRef.id, 
      message: "Data encrypted and stored securely." 
    });

  } catch (error) {
    return NextResponse.json({ error: "Upload Failed" }, { status: 500 });
  }
}