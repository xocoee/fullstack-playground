import { useEffect, useState } from "react";
import { useItemsStore } from "../store/items";
import ListItems from "./ListItems";

const ItemsBlock = () => {
  const { items, loading, fetchItems, addItem } = useItemsStore();

  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    fetchItems();
  }, [fetchItems, addItem]);

  const handleAdd = async () => {
    if (!name) return alert("Name is required");
    await addItem({ id, name });
    setId(0);
    setName("");
  };
  
  console.log('ITEMS', items)
  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="number"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(Number(e.target.value))}
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleAdd} disabled={loading}>
          {loading ? "Loading..." : "Add"}
        </button>
      </div>

      {items.map((el) => (
          <div>
      <h2>id: {el.id}</h2>
      <h1>name: {el.name}</h1>
    </div>
      ))}
    </div>
  );
};

export default ItemsBlock;
