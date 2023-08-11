/// <reference types="react" />
import { UseInfiniteQueryResult } from "react-query/types/react/types";
export default function useInfinteScroll(infiniteQuery: UseInfiniteQueryResult, deps?: React.DependencyList, reverse?: boolean): import("react").MutableRefObject<any>;
export declare function useReverseInfiniteScroll(infiniteQuery: UseInfiniteQueryResult, deps?: React.DependencyList): import("react").MutableRefObject<any>;
