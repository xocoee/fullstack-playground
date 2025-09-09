import { useEffect, useState } from "react";
import { useItemsStore } from "../store/items";
//import ListItems from "./ListItems";

const ItemsBlock = () => {
  const { items, loading, fetchItems, addItem } = useItemsStore();

  const [price, setPrice] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [photo, setPhoto] = useState<File | null>(null);
  console.log("price", price, typeof price);
  useEffect(() => {
    fetchItems();
  }, [fetchItems, addItem]);

  const handleAdd = async () => {
    if (!name) return alert("Name is required");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", String(price));
    if (photo) {
      formData.append("photo", photo);
    }

    await addItem(formData);

    setPrice(0);
    setName("");
    setPhoto(null);
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
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setPhoto(e.target.files[0]);
            }
          }}
        />
        <button onClick={handleAdd} disabled={loading}>
          {loading ? "Loading..." : "Add"}
        </button>
      </div>

      {items.map((el) => (
        <div key={el.id} style={{ marginBottom: "1rem" }}>
          <div>{`Номер: ${el.id}, Назва: ${el.name}, Ціна: ${el.price}`}</div>
          {el.photo_url && (
            <img
              src={el.photo_url}
              alt={el.name}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                marginTop: "0.5rem",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ItemsBlock;
