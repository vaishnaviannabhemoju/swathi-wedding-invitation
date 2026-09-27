import { supabaseServer } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { guest_name, email, attending, guest_count, events, message } = body;

    if (!guest_name || typeof attending !== "boolean") {
      return NextResponse.json(
        { error: "Guest name and attendance are required." },
        { status: 400 },
      );
    }

    const selectedEvents = Array.isArray(events)
      ? events.filter(
          (event): event is string =>
            typeof event === "string" &&
            (event === "Wedding" || event === "Reception"),
        )
      : [];

    if (attending && selectedEvents.length === 0) {
      return NextResponse.json(
        { error: "Please select at least one event." },
        { status: 400 },
      );
    }

    const { error } = await supabaseServer
      .from("wedding_reception_rsvps")
      .insert({
        guest_name,
        email: email || null,
        attending,
        guest_count: attending ? (guest_count ?? 1) : 0,
        events: attending ? selectedEvents : [],
        message: message || null,
      });

    if (error) {
      console.error("Supabase error:", error);

      return NextResponse.json(
        { error: "Failed to save RSVP." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "RSVP submitted successfully!",
    });
  } catch (error) {
    console.error("API error:", error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
