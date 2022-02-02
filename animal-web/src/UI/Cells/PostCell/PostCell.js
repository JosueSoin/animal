import Carousel from "react-elastic-carousel";
import styles from "./PostCell.module.css";

export function PostCell({ post }) {
  return (
    <div className={styles.cellDiv}>
      <h2 className={styles.titleCell}>{post.email}</h2>
      <Carousel>
        {post.pathList.map(function (path) {
          return (
            <img
              className={styles.carrouselImage}
              src={"http://localhost:3001/uploads/" + path.path}
              alt={path.path}
            ></img>
          );
        })}
      </Carousel>
      <div className={styles.typesDiv}>
        <i className={"fas fa-house-user " + styles.icon}></i>
        <i className={"fab fa-github-square "+ styles.icon}></i>
      </div>
    </div>
  );
}
