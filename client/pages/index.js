import Link from "next/link";

const Home = ({ currentUser }) => {
  return currentUser ? (
    <div>
      <h1>Successfully logged in</h1>
    </div>
  ) : (
    <div>
      <h1>Not logged in</h1>
      
    </div>
  );
};



export default Home;
