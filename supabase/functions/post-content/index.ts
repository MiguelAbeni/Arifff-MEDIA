import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(
        JSON.stringify({ error: "Missing Supabase configuration" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const body = await req.json();
    const { type, data } = body;

    if (!type || !data) {
      return new Response(
        JSON.stringify({ error: "Missing type or data" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let result;

    if (type === "news") {
      const { error } = await supabase.from("news").insert([
        {
          title: data.title,
          description: data.description,
          image_url: data.image_url,
          category: data.category || "general",
          is_headline: data.is_headline || false,
        },
      ]);

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      result = { success: true, message: "News published successfully" };
    } else if (type === "sports") {
      const { error } = await supabase.from("sports_matches").insert([
        {
          home_team: data.home_team,
          away_team: data.away_team,
          home_score: parseInt(data.home_score) || 0,
          away_score: parseInt(data.away_score) || 0,
          match_status: data.match_status || "scheduled",
          match_time: data.match_time,
        },
      ]);

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      result = { success: true, message: "Match added successfully" };
    } else if (type === "cinema") {
      const { error } = await supabase.from("movies").insert([
        {
          title: data.title,
          rank: parseInt(data.rank) || 5,
          youtube_url: data.youtube_url,
          thumbnail_url: data.thumbnail_url,
          description: data.description,
        },
      ]);

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      result = { success: true, message: "Movie added successfully" };
    } else if (type === "schedule") {
      const { error } = await supabase.from("cinema_schedules_extended").insert([
        {
          cinema_name: data.cinema_name,
          movie_title: data.movie_title,
          genre: data.genre || "",
          show_time: data.show_time,
          day_of_week: data.day_of_week,
        },
      ]);

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      result = { success: true, message: "Schedule added successfully" };
    } else if (type === "featured") {
      const { error } = await supabase.from("featured_posts").upsert([
        {
          post_id: data.post_id || "00000000-0000-0000-0000-000000000000",
          post_type: data.post_type || "news",
          position: parseInt(data.position) || 1,
        },
      ], { onConflict: "post_type,position" });

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      result = { success: true, message: "Featured post updated successfully" };
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid content type" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Request failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
