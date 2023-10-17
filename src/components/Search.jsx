import { Search as SearchIcon } from "lucide-react"
import '../styles/search.css'
const Search = () => {
    return (<div className="search-container"><form className='search'>


        <SearchIcon></SearchIcon>
        <input placeholder="Search" />

    </form></div>)
}
export default Search