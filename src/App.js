
import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState(" ")

  //  useCallback --- it is use for optimizing. it memorize the function in cache momery
  // useRef hook --- it take the reference of any element in the web page and manupulate them.

  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = " "
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "~!@#$%^&*()_+`<>,.?/:[];{}"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password)

  }, [password])

  useEffect(() => {
    passwordGenerator()

  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div className='div1'>

      <div className='div2'>
        <h1 style={{ color: "white", padding: "20px" }}>Password Generator</h1>

        <div>
          <input style={{ fontSize: "18px", width: "250px" }}
            type='text'
            value={password}
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />

          <button onClick={copyPasswordToClipboard}>Copy</button>
        </div>

        <div className='div3'>
          <div>
            <input style={{ cursor: "pointer" }}
              type='range'
              value={length}
              min={6}
              max={20}
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length: {length}</label>
          </div>

          <div>
            <input
              type='checkbox'
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>

          <div>
            <input
              type='checkbox'
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label>Character</label>
          </div>

        </div>

      </div>

    </div>
  );
}

export default App;
