const ListItems = (item: any) => {
  return (
    <div>
      <h2>{item.id}</h2>
      <h1>{item.name}</h1>
    </div>
  );
};

export default ListItems;
