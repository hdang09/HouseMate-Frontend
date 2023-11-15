const shortenNumber = (num: number | string | undefined): string => {
    const cleanedNum =
        typeof num === 'number' ? num.toString() : (num || '').toString().replace(/[^0-9.]/g, '');

    if (parseFloat(cleanedNum) < 1000) {
        return cleanedNum;
    }

    const si = [
        { v: 1e3, s: 'K' },
        { v: 1e6, s: 'M' },
        { v: 1e9, s: 'B' },
        { v: 1e12, s: 'T' },
        { v: 1e15, s: 'P' },
        { v: 1e18, s: 'E' },
    ];

    let index = si.length - 1;
    while (index > 0 && parseFloat(cleanedNum) < si[index].v) {
        index--;
    }

    return (
        (parseFloat(cleanedNum) / si[index].v)
            .toFixed(2)
            .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[index].s
    );
};

export default shortenNumber;
