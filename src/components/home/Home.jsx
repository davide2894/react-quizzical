import { Link } from "react-router-dom";
import "./Home.scss";

function Home() {
  return (
        <div className="home">
            <h1 className="home__h1">Quizzical</h1>
            <h2 className="home__h2">A simple quiz game made in React</h2>
            <Link className="link" to="quiz">Start</Link>
        </div>
    )
}

export default Home