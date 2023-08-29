import { Menu, Transition } from "@headlessui/react";
import { MoreVertical } from "lucide-react";
import { Fragment, useEffect } from "react";

interface ItemProps {
  id: number;
  name: string;
  quantity: number;
  category: string;
  completed: boolean;
  onChange: () => void;
  onDelete: (id: number) => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export function Item({
  id,
  name,
  quantity,
  category,
  completed,
  onChange,
  onDelete,
}: ItemProps) {
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(completed));
    localStorage.setItem("id", JSON.stringify(id));
  }, [completed, id]);

  return (
    <div
      key={id}
      className={`${
        completed && "opacity-50"
      } flex items-center justify-between p-4 mb-5 bg-[#17171A] rounded-[8px]`}
    >
      <div className="flex gap-5">
        <input type="checkbox" onChange={onChange} checked={completed} />
        <div>
          <h1 className="text-white font-bold">{name}</h1>
          <p className="text-white">{quantity} unidades</p>
        </div>
      </div>

      <div className="flex items-center">
        <p className="text-white">{category}</p>
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button>
            <MoreVertical className="text-[#A881E6]" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Editar
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                      onClick={() => onDelete(id)}
                    >
                      Excluir
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
