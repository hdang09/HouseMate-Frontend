import { SearchInput } from './Search.styled';
import SearchProps from './Search.type';

const Search = ({ placeholder, handleSearch }: SearchProps) => {
    return <SearchInput placeholder={placeholder} onSearch={handleSearch} />;
};

export default Search;
