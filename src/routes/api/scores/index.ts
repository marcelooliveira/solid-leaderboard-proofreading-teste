import { APIEvent } from "@solidjs/start/server";
import { readBody } from "vinxi/http";
import { createClient } from '@supabase/supabase-js';
import { json } from "@solidjs/router";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET({ params }: APIEvent) {

  const { data: scores, error } = await supabase
    .from('scores')
    .select('*');

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  const avatarDic = getAvatarDic();

  const sorted = (scores ?? [])
    .sort((a, b) => b.points - a.points)
    .map((s, i) => ({
      id: s.id,
      ranking: i + 1,
      avatar: avatarDic[s.avatar.toString()] || "not set",
      playername: s.playername,
      points: s.points,
    }));

    return new Response(JSON.stringify(sorted), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST({ params }: APIEvent) {
  const body = await readBody(params);
  const { avatar, playername, points } = body;

  const { data: insertResult, error: insertError } = await supabase
    .from('scores')
    .insert([{ avatar: parseInt(avatar), playername, points: parseInt(points) }])
    .select()
    .single();

  if (insertError) {
    return new Response(JSON.stringify({ error: insertError.message }), { status: 400 });
  }

  return json(insertResult)
}

function getAvatarDic(): Record<string, string> {
  return {
    "0": "not set",
    "1": "👨🏻",
    "2": "👨🏼",
    "3": "👨🏽",
    "4": "👨🏾",
    "5": "👨🏿",
    "6": "👩🏻",
    "7": "👩🏼",
    "8": "👩🏽",
    "9": "👩🏾",
    "10": "👩🏿",
  };
}
