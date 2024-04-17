import React, { useCallback, useEffect, useState, useRef } from "react";

const App = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [signAllowed, setSignAllowed] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) pass += "123456789";
    if (signAllowed) pass += "`~!@#$%^&*()_+-";
    var passwords = "";
    for (let i = 1; i <= length; i++) {
      let ind = Math.floor(Math.random() * pass.length + 1);
      passwords += pass.charAt(ind);
    }
    setPassword(passwords);
  }, [length, numberAllowed, signAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, signAllowed, passwordGenerator]);

  const passwordRef = useRef(null);
  const copyToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  }, [password]);

  return (
    <div className="w-screen h-screen bg-black flex justify-center">
      <div className="w-full max-w-md mx-auto h-1/3 shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800">
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-8.5 shrink-0"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label>Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={signAllowed}
              onChange={() => {
                setSignAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="">Sign</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
