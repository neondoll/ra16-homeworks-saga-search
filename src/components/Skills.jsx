import { changeSearchField } from "../actions/actionCreators";
import { useDispatch, useSelector } from "react-redux";

export default function Skills() {
  const { error, items, loading, search } = useSelector(state => state.skills);
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    const { value } = event.target;

    dispatch(changeSearchField(value));
  };

  const hasQuery = search.trim() !== "";

  return (
    <main>
      <div>
        <input className="input" type="search" value={search} onChange={handleSearch} />
      </div>
      {!hasQuery && <div>Type something to search...</div>}
      {hasQuery && loading && <div>searching...</div>}
      {error
        ? <div>Error occurred</div>
        : <ul>{items.map(item => <li key={item.id}>{item.name}</li>)}</ul>}
    </main>
  );
}
