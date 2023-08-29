import { FormEvent, useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Beef, Plus, Sandwich } from "lucide-react";
import axios from "axios";
import { Item } from "./components/Item";

interface Item {
  id: number;
  name: string;
  quantity: number;
  category: string;
  completed: boolean;
}

const foods = [
  { id: 1, icon: Sandwich, category: "Padaria" },
  { id: 2, icon: Beef, category: "Carne" },
];

export default function App() {
  const [data, setData] = useState<Item[]>([]);
  const [item, setItem] = useState<Item>({
    id: 0,
    name: "",
    quantity: 0,
    category: "",
    completed: false,
  });

  function toggleCompleted(id: number) {
    const newData = data.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });

    setData(newData);
    console.log(newData);
    console.log(id);
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3333/create", item);
      const newItem = response.data;
      setData((prev) => [...prev, newItem]);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMarket = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3333/delete/${id}`);
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:3333/all");
      console.log(response.data);

      setData(response.data);
    }

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <form
        className="w-[720px] mx-auto absolute  top-[120px] left-[50%] translate-x-[-50%] flex items-center justify-around p-4"
        onSubmit={onSubmit}
      >
        <div className="w-[250px]">
          <label htmlFor="item" className="block text-white mb-2">
            Item
          </label>
          <input
            id="item"
            type="text"
            value={item.name}
            onChange={(e) => setItem({ ...item, name: e.target.value })}
            className="py-3 px-3 text-white rounded-md w-full bg-[#111112]"
          />
        </div>

        <div className="w-[230px]">
          <label htmlFor="quantity" className="block text-white  mb-2">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            value={item.quantity}
            onChange={(e) =>
              setItem({ ...item, quantity: Number(e.target.value) })
            }
            className="p-3 text-white w-full rounded-md bg-[#111112]"
          />
        </div>

        <div className="w-[100px]">
          <label htmlFor="category" className="block text-white  mb-2">
            Category
          </label>
          <select
            id="category"
            value={item.category}
            onChange={(e) => setItem({ ...item, category: e.target.value })}
            className="p-3 rounded-md bg-[#111112] text-white"
          >
            <option value="food" className="text-white">
              Food
            </option>
            <option value="padaria">
              <Sandwich className="text-[#A881E6]" />
              Padaria
            </option>
            <option value="fruta">Frutas</option>
            <option value="legume">Legume</option>
            <option value="bebida">Bebida</option>
            <option value="carne">Carne</option>
          </select>
        </div>
        <div>
          <button className="rounded-full  bg-[#7450AC] p-[8px] hover:bg-[#7450AC]/80 mt-5">
            <Plus className="text-white" />
          </button>
        </div>
      </form>

      <div className="w-[720px] mx-auto  mt-14">
        {data.map((item) => (
          <Item
            key={item.id}
            category={item.category}
            completed={item.completed}
            name={item.name}
            quantity={item.quantity}
            id={item.id}
            onChange={() => toggleCompleted(item.id)}
            onDelete={() => deleteMarket(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
