import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/store/hooks";
import { fetchCompanyListApi } from "./company.api";

export const useCompanyList = () => {
  const token = useAppSelector((state) => state.auth.token);

  return useQuery({
    queryKey: ["company-list", token],
    queryFn: () => {
      if (!token) {
        throw new Error("No auth token found");
      }
      return fetchCompanyListApi(token);
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false, // don't refetch when window regains focus
    refetchOnMount: false, // don't refetch when component mounts
  });
};
