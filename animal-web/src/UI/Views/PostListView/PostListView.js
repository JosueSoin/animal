import posts from "../../../animals.json";
import { PostCell } from "../../Cells/PostCell/PostCell";
import styles from  "./PostListView.module.css";


//we can add children for add a especial children item
export function PostListView() {
  
  return (
    <div>
      <div id="header"></div>
      <div id={styles.animalList}>

        {posts.data.map(function(post){
          return <PostCell post={post}></PostCell>
        })}

      </div>
    </div>

    /*
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React {titulo}
        </a>
      </header>
    </div>
  */
  );
}
