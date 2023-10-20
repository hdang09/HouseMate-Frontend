function embedMapUrl(address: string): string {
    const params = new URLSearchParams({
        q: address,
        t: 'm',
        output: 'embed',
        hl: 'vi',
    });

    return `https://maps.google.com/maps?${params}`;
}

export default embedMapUrl;
