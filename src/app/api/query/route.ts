import { NextResponse } from "next/server";
import { applyPrivacyPreservation } from "@/lib/privacy";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { location } = body;

    if (!location || !location.lat || !location.lng) {
      return NextResponse.json(
        { error: "Valid location required" },
        { status: 400 },
      );
    }

    // 1. APPLY PRIVACY SHIELD
    const privacyResult = applyPrivacyPreservation(location.lat, location.lng);

    // 2. QUERY DB WITH OBFUSCATED DATA (Not user's exact location)
    const results = await db.queryLocations(
      privacyResult.obfuscatedLat,
      privacyResult.obfuscatedLng,
    );

    // 3. RETURN SAFE RESULTS
    return NextResponse.json({
      success: true,
      privacy_meta: privacyResult,
      data: results,
    });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
