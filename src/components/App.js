import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
  //component items został przeniesiony z form do App aby był w parent component Packing listy, ktora wyrenderuje nam powstaly item.
  const [items, setItems] = useState([]); // początkowa list jest pusta dlatego początkowy useState będzie empty array.

  function handleAddItems(item) {
    setItems((items) => [...items, item]); // nie możemy mutować arrays, więc robimy spread (...)istniejącej array i dodajemy do niej nową. Wiec dodajemy nowe elementy, nie mutując oryginalnej array.
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all the items?"
    );

    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />{" "}
      {/* funkcja handleAddItems z App jest przekazywana do komponentu Form jako prop( ) */}
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />{" "}
      {/* funkcja handleAddItems z App jest przekazywana do komponentu Form jako prop( ) */}
      <Stats items={items} />
    </div>
  );
}
