import * as St from './Home.styled';

import { Button } from '@mui/material';
import logo from '@/assets/svg/logo.svg';
import { useState } from 'react';

function Home() {
    const [count, setCount] = useState(0);

    return (
        <St.Main>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={logo} className="logo" alt="Vite logo" />
                </a>
            </div>

            <h1>Vite + React</h1>

            <St.Card>
                <Button onClick={() => setCount((count) => count + 1)}>count is {count}</Button>
                <p>
                    Edit <code>src/Home.tsx</code> and save to test HMR
                </p>
            </St.Card>

            <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
        </St.Main>
    );
}

export default Home;
