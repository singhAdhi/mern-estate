import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef, FormEvent } from "react";

function Header() {
  const [data, setData] = useState<string>("");
  const inputData = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputData.current) {
      setData(inputData.current.value);
    }
  }

  console.log(data);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Sahand</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="search"
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            ref={inputData}
            name=""
            id=""
          />
          <button type="submit">submit</button>
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
export default Header;