import * as actions from "@/app/actions";
import { auth } from "@/app/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Login() {
  const session = await auth();

  return (
    <div>
      <div className="flex flex-col gap-2 items-center">
        <h2 className="text-2xl">Login</h2>
        <form
          action={async () => {
            "use server";
            actions.signIn("GitHub");
          }}
        >
          <Button type="submit">Sign In with GitHub</Button>
        </form>
        <form
          action={async () => {
            "use server";
            actions.signIn("Google");
          }}
        >
          <Button type="submit">Sign In with Google</Button>
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
    </div>
    // <div className="flex justify-center items-center h-screen">
    //   <Card className="w-[350px] h-[350px] flex flex-col justify-center items-center gap-2 ">
    //     <CardHeader>
    //       <CardTitle>Login</CardTitle>
    //     </CardHeader>
    //     <CardContent>
    //       <form
    //         className="mb-2"
    //         action={async () => {
    //           "use server";
    //           actions.signIn("GitHub");
    //         }}
    //       >
    //         <Button type="submit">Sign In with GitHub</Button>
    //       </form>
    //       <form
    //         action={async () => {
    //           "use server";
    //           actions.signIn("Google");
    //         }}
    //       >
    //         <Button type="submit">Sign In with Google</Button>
    //       </form>

    //       <form action={actions.signOut}>
    //         <Button type="submit">Sign Out</Button>
    //       </form>
    //     </CardContent>
    //     <CardFooter>
    //       <p>Card Footer</p>
    //     </CardFooter>
    //   </Card>
    // </div>
  );
}
