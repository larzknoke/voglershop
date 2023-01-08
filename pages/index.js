import { useSession } from "next-auth/react";
import axios from "axios";
import { getToken } from "next-auth/jwt";

export default function Home({ users }) {
  const { data: session, status } = useSession();

  return (
    <main className="flex flex-col z-50 w-full flex-1 px-20 text-vogler-yellow2  bg-vogler-green p-8">
      <h1 className="text-xl">Willkommen im Hofladen des Voglerhof's</h1>
      <p className="overflow-hidden">Data: {JSON.stringify(session)}</p>
      <p>Status: {JSON.stringify(status)}</p>
      {users &&
        users.map((user) => (
          <p key={user.id} className="mt-4 ml-4">
            {user.email}
          </p>
        ))}
    </main>
  );
}

export async function getServerSideProps(context) {
  const token = await getToken(context);
  let users = [];
  if (token?.accessToken) {
    const res = await axios.get("http://localhost:4000/users", {
      headers: {
        Authorization: `${token?.accessToken || ""}`,
      },
    });
    users = res.data;
  }

  return {
    props: { users }, // will be passed to the page component as props
  };
}
