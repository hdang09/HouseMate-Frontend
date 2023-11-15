import { useEffect, useRef } from 'react';

interface InfiniteScrollProps {
    children: JSX.Element;
    loader: JSX.Element;
    fetchMore: () => void;
    hasMore: boolean;
    endMessage?: JSX.Element;
}

const InfiniteScroll = ({
    children,
    loader,
    fetchMore,
    hasMore,
    endMessage,
}: InfiniteScrollProps) => {
    const pageEndRef = useRef(null);

    useEffect(() => {
        if (hasMore) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    fetchMore();
                }
            });

            if (pageEndRef.current) {
                observer.observe(pageEndRef.current);
            }

            return () => {
                if (pageEndRef.current) {
                    observer.unobserve(pageEndRef.current);
                }
            };
        }
    }, [hasMore]);

    return (
        <>
            {children}

            {hasMore ? <div ref={pageEndRef}>{loader}</div> : endMessage}
        </>
    );
};

export default InfiniteScroll;
