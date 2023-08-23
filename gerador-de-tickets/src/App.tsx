import { useEffect, useState } from "react";
import { User, getUserInfo } from "./services";

export default function App() {
  const [user, setUser] = useState<string>("");
  const [data, setData] = useState<User>({});
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await getUserInfo(`${user}`);
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    getUserInfo("bora-codar");
  });
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
            <div>
              <img
                className="absolute z-10 w-6 h-6"
                src="../src/assets/logo-github.svg"
                alt=""
              />
              <input
                className="w-[100%] relative py-[16px] px-[12px] rounded-md"
                type="text"
                placeholder="Nome de usuário"
                value={user}
                onChange={(e) => setUser(e.target.value)}
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
            <div className="w-[613px] h-[318px] bg-white flex flex-col items-center">
              <img
                src={data.avatar_url}
                alt={data.login}
                className="rounded-full w-28 h-28"
              />
              <p>{data.login}</p>
              <h2>{data.name}</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
