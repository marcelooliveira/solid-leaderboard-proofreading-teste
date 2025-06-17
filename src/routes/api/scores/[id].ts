import { APIEvent } from "@solidjs/start/server";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function DELETE({ params }: APIEvent) {
  const id = params.id;
  const { error } = await supabase
    .from('scores')
    .delete()
    .eq('id', id);
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify({ message: 'Deleted successfully' }), { status: 200 });
}