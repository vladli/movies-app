import React from "react";

export default function Header() {
  return (
    <header className="relative z-[999]">
      <nav className="flex h-[5rem] items-center bg-slate-500">
        <div className="grow pl-5">Logo</div>
        <ul className="flex gap-4 pr-5">
          <li>Title</li>
          <li>Title2</li>
          <li>Title3</li>
          <li>Title4</li>
          <li>Title5</li>
        </ul>
      </nav>
    </header>
  );
}
