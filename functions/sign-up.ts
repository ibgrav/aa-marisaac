import * as contentful from "contentful-management";

type Env = {
  CONTENTFUL_ACCESS_TOKEN: string;
  FOLLOWING_ID: string;
  VITE_SPACE_ID: string;
  VITE_PREVIEW_TOKEN: string;
  VITE_DELIVERY_TOKEN: string;
};

export const onRequest: PagesFunction<Env> = async (ctx) => {
  const url = new URL(ctx.request.url);
  const email = url.searchParams.get("email");

  if (!email) {
    return new Response(null, { status: 400 });
  }

  const client = contentful.createClient({
    accessToken: ctx.env.CONTENTFUL_ACCESS_TOKEN,
    adapter: async (config) => {
      const url = new URL(`${config.baseURL}/${config.url}`);

      if (config.params) {
        for (const key of Object.keys(config.params)) {
          url.searchParams.append(key, config.params[key]);
        }
      }

      const request = new Request(url.href, {
        method: config.method ? config.method.toUpperCase() : "GET",
        headers: config.headers ? config.headers : {},
        body: config.data,
        redirect: "manual"
      });

      const response = await fetch(request);

      const headers: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });

      return {
        data: await response.json(),
        status: response.status,
        statusText: response.statusText,
        headers,
        config: config,
        request: request
      };
    }
  });

  const space = await client.getSpace(ctx.env.VITE_SPACE_ID);
  const env = await space.getEnvironment("master");
  const entry = await env.getEntry(ctx.env.FOLLOWING_ID);

  const emails = ((entry.fields.emails["en-US"] as string) || "").split(",");

  if (!emails.includes(email)) {
    emails.push(email);

    entry.fields.emails["en-US"] = emails.join(",");

    await entry.update();
  }

  return new Response(JSON.stringify(entry), {
    status: 200,
    headers: {
      "content-type": "application/json"
    }
  });
};
