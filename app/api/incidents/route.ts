import { NextResponse } from "next/server";
import { serverStore } from "@/app/lib/server-store";

export async function GET() {
  try {
    const state = serverStore.getState();
    return NextResponse.json({
      success: true,
      data: state,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, incidentId, state, details, incident } = body;

    if (action === "reset") {
      const resetState = serverStore.reset();
      return NextResponse.json({ success: true, data: resetState });
    }

    if (action === "add" && incident) {
      const updatedState = serverStore.addOrUpdateIncident(incident);
      return NextResponse.json({ success: true, data: updatedState });
    }

    if (action === "updateState" && incidentId && state) {
      const updatedState = serverStore.updateIncidentState(incidentId, state, details);
      return NextResponse.json({ success: true, data: updatedState });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action or parameters specified" },
      { status: 400 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
