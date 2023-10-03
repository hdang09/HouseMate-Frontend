type SearchProps = {
    placeholder: string;
    handleSearch: (
        value: string,
        event?:
            | React.ChangeEvent<HTMLInputElement>
            | React.MouseEvent<HTMLElement>
            | React.KeyboardEvent<HTMLInputElement>,
        info?: {
            source?: 'clear' | 'input';
        },
    ) => void;
};

export default SearchProps;
