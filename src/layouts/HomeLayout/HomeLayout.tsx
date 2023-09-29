import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
    return (
        <>
            <header>This is header</header>

            <main>
                <Outlet />
            </main>

            <footer>This is footer</footer>
        </>
    );
};

HomeLayout.propTypes = {};

export default HomeLayout;
