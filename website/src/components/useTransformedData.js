import { useMemo, useState } from 'react';

const useTransformedData = (data, visiblePoints) => {
    const [startIndex, setStartIndex] = useState(0);

    const sortedData = useMemo(() => {
        return [...data].sort((a, b) => a.block_height - b.block_height);
    }, [data]);
    const transformedData = useMemo(() => {
        const transformed = sortedData.reduce((acc, current) => {
            const convertedDate = new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(current.signed_at));
            const existingIndex = acc.findIndex(item => item.signed_at === convertedDate);
            if (existingIndex > -1) {
                acc[existingIndex][current.name] = current.value;
            } else {
                acc.push({
                    signed_at: convertedDate,
                    [current.name]: current.value
                });
            }
            return acc;
        }, []);

        if (transformed.length > visiblePoints && startIndex === 0) {
            setStartIndex(transformed.length - visiblePoints);
        }
        return transformed;
    }, [sortedData, startIndex, visiblePoints]);

    return [transformedData, startIndex, setStartIndex];
}

export default useTransformedData;
