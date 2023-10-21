import Link from "next/link";

import { serverApiRequest } from "../api/server-api";

const Home = ({ isLoggedIn }) => {
  return isLoggedIn ? (
    <h1>Successfully logged in</h1>
  ) : (
    <div>
      <h1>Not logged in</h1>
      <Link href="/auth/signup">Sign up</Link>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const { data } = await serverApiRequest(context).get(
      "/api/users/currentuser"
    );
    return { props: { isLoggedIn: !!data.currentUser } };
  } catch (error) {
    return { props: { isLoggedIn: false } };
  }
};

export default Home;
