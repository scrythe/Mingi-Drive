import { createUser } from "./queries/insert";
import { getUsers } from "./queries/select";
async function main() {
  await createUser({ username: "hm", email: "hm", password: "hm" })
  console.log("hm")
  const users = await getUsers()
  console.log(users)
}

main()
