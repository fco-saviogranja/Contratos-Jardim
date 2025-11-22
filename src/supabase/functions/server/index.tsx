// DISABLED - DO NOT DEPLOY
// This Edge Function is not used by the application
// The application uses localStorage for all data storage
// 
// Original code has been commented out to prevent deployment
//
// If you see this file trying to deploy, please:
// 1. Check that edge_functions is disabled in config.toml
// 2. Verify .supabaseignore includes /supabase/functions/
// 3. Consider deploying via Vercel/Netlify instead
//
// --- COMMENTED OUT CODE BELOW ---
//
// Deno.serve(async (req) => {
//   return new Response(
//     JSON.stringify({ 
//       status: 'inactive',
//       message: 'This Edge Function is not used.' 
//     }),
//     { 
//       headers: { 'Content-Type': 'application/json' },
//       status: 200 
//     }
//   );
// });

export default null;
