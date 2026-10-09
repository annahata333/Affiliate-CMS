import { seed } from "./seed";

export default {
  async fetch(request: Request, env: SeedWorkerEnv): Promise<Response> {
    await seed(env.affiliate_cms_db);

    return new Response("Seed data inserted successfully!");
  },
};
