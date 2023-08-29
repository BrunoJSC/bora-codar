import { useState } from "react";
import { User, getUserInfo } from "./services";

export default function App() {
  const [user, setUser] = useState<string>("");
  const [data, setData] = useState<User>({});
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await getUserInfo(`${user}`);
    console.log(data);
    setData(data);

    setUser("");
  };

  const listStyle = "flex items-center justify-between my-2";

  return (
    <section className="object-cover w-screen h-screen bg-hero-image flex items-center justify-center">
      <div className="w-[1440px] h-[408.638px] flex items-center justify-between">
        <div className="p-2 w-[500px]">
          <h1 className="font-normal uppercase text-[40px] leading-10	bg-gradient-to-r from-[#dee0fc] via-[#996dff] to-[#bc9fff] text-transparent bg-clip-text">
            gere seu ticket e compartilhe com o mundo
          </h1>
          <form onSubmit={handleSubmit}>
            <p className="text-[#F3F4FE] font-normal my-4">
              Digite seu usuário do GitHub
            </p>
            <div className="flex items-center relative">
              <input
                className="w-[100%] py-[16px] rounded-md px-9"
                type="text"
                placeholder="Nome de usuário"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />

              <img
                className="absolute z-10 w-6 h-6 left-2"
                src="../src/assets/logo-github.svg"
                alt=""
              />
            </div>
            <button className="w-full mt-4 py-[22px] px-[40px] bg-[#8860E6] text-[14px] font-bold uppercase text-white">
              Gerar meu ticket
            </button>
          </form>
        </div>
        <div className="flex items-center justify-center w-[694px] h-[408.638px] bg-[#844FE5]">
          <div className="flex p-4">
            <img
              src="../src/assets/img-cover-ticket.png"
              alt=""
              className="h-full object-contain"
            />
            <div className="w-[613px] h-[318px] bg-white flex flex-col items-center p-4">
              <img
                src={data.avatar_url ?? "./src/assets/foto.png"}
                alt={data.login}
                className="rounded-full w-28 h-28"
              />
              <p>{data.login}</p>
              <h2>{data.name}</h2>

              <ul className=" w-full p-4">
                <li className={listStyle}>
                  <span className="uppercase">eventos</span>
                  <span className="uppercase">ia para devs</span>
                </li>

                <li className={listStyle}>
                  <span className="uppercase">data</span>
                  <span className="uppercase">14 - 16 ago. 2023</span>
                </li>

                <li className={listStyle}>
                  <span className="uppercase">Hora</span>
                  <span className="uppercase">ao vivo 19H</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
