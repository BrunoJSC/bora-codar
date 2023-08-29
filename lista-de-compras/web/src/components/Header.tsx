import banner from "../assets/banner.png";

export function Header() {
  return (
    <header className="w-full h-[185px] bg-red-500 bg-banner-img">
      <img
        src={banner}
        alt=""
        className="w-full h-full object-cover relative"
      />
    </header>
  );
}
