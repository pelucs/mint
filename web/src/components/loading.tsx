import logo from "@/assets/logo-mint.svg";

export function Loading() {
  return(
    <div className="fixed inset-0 flex items-center justify-center">
      <img src={logo} alt="Logo Penny" className="w-14 animate-pulse"/>
    </div>
  );
}