import { useEffect, useState } from "react";
import { useItemsStore } from "../store/items";
//import ListItems from "./ListItems";

const ItemsBlock = () => {
  const { items, loading, fetchItems, addItem } = useItemsStore();

  const [price, setPrice] = useState<number>(0);
  const [name, setName] = useState<string>("");
  console.log("price", price, typeof price);
  useEffect(() => {
    fetchItems();
  }, [fetchItems, addItem]);

  const handleAdd = async () => {
    if (!name) return alert("Name is required");
    await addItem({ name, price });
    setPrice(0);
    setName("");
  };

  console.log("ITEMS", items);
  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(parseFloat(e.target.value.replace(",", ".")))
          }
          step="0.01"
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
        <div
          key={el.id}
        >{`Номер: ${el.id}, Назва: ${el.name}, Ціна: ${el.price}`}</div>
      ))}
    </div>
  );
};

export default ItemsBlock;
