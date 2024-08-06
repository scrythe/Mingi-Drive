interface RegisterReq {
  username?: string;
  password?: string;
  email?: string;
}

function register({ username, password, email }: RegisterReq) {
  if (!username || !password || !email)
    return Response.json("Fill in all fields");
  return Response.json({ });
}

Bun.serve({
  async fetch(req) {
    const path = new URL(req.url).pathname;
    const method = req.method;
    const data = await req.json();

    if (method == "POST" && path == "/register") return register(data as RegisterReq);

    return Response.json("Server does not exist");
  },
});
