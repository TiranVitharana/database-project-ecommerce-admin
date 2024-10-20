import styles from "./search.module.css"
import {MdSearch} from "react-icons/md";

interface Props {
    placeholder: string;
}

const Search = ({placeholder}:Props) => {
  return (
      <div className={styles.container}>
        <MdSearch/>
          <input type="text" placeholder={placeholder} className={styles.input}></input>
      </div>
  );
}

export default Search;