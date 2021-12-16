import "../../App.css";
import ThreeScene from "../threejs/three-scene.js"
import Title  from "../threejs/title.js"

function Home() {
  return (
    <div className="App">
      <div className="container">
          <ThreeScene/>
          <Title/>
      </div>
    </div>
  );
}

export default Home;
