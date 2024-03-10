import { Button } from "@/components/ui/button";
import * as actions from "@/app/actions";
import { auth } from "@/app/auth";

export default async function Login() {
  const session = await auth();

  return (
    <div>
      <form action={actions.signIn}>
        <Button type="submit">Sign In with GitHub</Button>
      </form>

      <form action={actions.signOut}>
        <Button type="submit">Sign Out</Button>
      </form>
      {session?.user ? (
        <div>Signed in as {session.user.email}</div>
      ) : (
        <div>Not signed in</div>
      )}
    </div>
  );
}
