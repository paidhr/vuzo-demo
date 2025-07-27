import { useState } from "react";
import {
  useQuery,
  QueryFunctionContext,
  useQueryClient,
} from "@tanstack/react-query";
import { TablePaginationConfig } from "antd/es/table";
import { useDebounce } from "use-debounce";
import { FilterValue, SorterResult } from "antd/es/table/interface";

type Dates = {
  startDate?: string;
  endDate?: string;
};

type FetchDataFunction<T> = (
  context: QueryFunctionContext<
    [
      string,
      TablePaginationConfig,
      string?,
      string?,
      string?,
      Record<string, FilterValue | null>?,
      (SorterResult<any> | SorterResult<any>[])?
    ]
  >
) => Promise<T>;

interface UseAntDTableProps<T> {
  queryKey: string;
  fetchData: FetchDataFunction<T>;
  initialPagination?: TablePaginationConfig;
  useQueryOptions?: Record<string, unknown>;
}

export const useAntDTable = <T,>({
  queryKey,
  fetchData,
  initialPagination,
  useQueryOptions,
}: UseAntDTableProps<T>) => {
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 20,
    ...initialPagination,
  });

  const queryCLient = useQueryClient();

  const [search, setSearch] = useState<string>("");
  const [dates, setDates] = useState<Dates>({
    startDate: "",
    endDate: "",
  });

  const [searchedWord] = useDebounce(search, 1000);
  const [filters, setFilters] = useState<Record<string, FilterValue | null>>();
  const [sorters, setSorters] = useState<
    SorterResult<any> | SorterResult<any>[] | undefined
  >();
  const startDate = dates.startDate;
  const endDate = dates.endDate;

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: [
      queryKey,
      pagination,
      searchedWord,
      startDate,
      endDate,
      filters,
      sorters,
    ],
    queryFn: fetchData,
    gcTime: 1000 * 60 * 5, // 5 minutes

    ...useQueryOptions,
  });

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[]
  ) => {
    setPagination(pagination);
    if (filters) {
      setFilters?.(() => filters);
    }
    if (sorter) {
      setSorters?.(sorter);
    }
  };

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    // Reset pagination to page 1
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  };

  const handleDateChange = (newDates: Dates) => {
    setDates((prev) => ({
      ...prev,
      ...newDates,
    }));
    // Reset pagination to page 1
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  };

  const invalidateQuery = () => {
    queryCLient.invalidateQueries({
      queryKey: [queryKey],
    });
  };

  return {
    data,
    pagination,
    isLoading,
    isFetching,
    isError,
    handleTableChange,
    search,
    setSearch: handleSearchChange,
    dates,
    setDates: handleDateChange,
    invalidateQuery,
  };
};
