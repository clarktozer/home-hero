import React from "react";

export interface HorizontalListProps<T> {
    title: string;
    loading: boolean;
    data: T[];
    onPageChange: (page: number) => void;
    page: number;
    limit: number;
    total: number;
    noResultText: string;
    onRenderItem: (item: T) => React.ReactNode;
    onRenderLoader: () => React.ReactNode;
}
