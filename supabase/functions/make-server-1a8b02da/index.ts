// @ts-nocheck
// @edge-runtime

export const config = {
  runtime: "edge",
  verifyJWT: false, // função pública
};

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

Deno.serve(async (req) => {
  const method = req.method;

  if (method === "GET") {
    return new Response(
      JSON.stringify({ ok: true, message: "GET funcionando!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  if (method === "POST") {
    const body = await req.json();

    return new Response(
      JSON.stringify({
        ok: true,
        message: `Hello ${body.name}!`,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response("Método não permitido", { status: 405 });
});
