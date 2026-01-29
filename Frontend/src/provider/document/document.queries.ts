import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getDocumentsApi, uploadDocumentsApi } from "./document.api";
import { useAppSelector } from "@/store/hooks";

export const useGetDocuments = () => {
  const token = useAppSelector((state) => state.auth.token);

  return useQuery({
    queryKey: ["documents"],
    queryFn: () => {
      if (!token) {
        throw new Error("Token not found");
      }
      return getDocumentsApi(token);
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: true, // Only refetch on component mount
  });
};

export const useUploadDocuments = () => {
  const queryClient = useQueryClient();
  const token = useAppSelector((state) => state.auth.token);

  return useMutation({
    mutationFn: (files: File[]) => {
      if (!token) {
        throw new Error("Token not found");
      }
      return uploadDocumentsApi(files, token);
    },

    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);

      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },

    onError: (error: any) => {
      console.error("Upload documents error details: ", error?.error?.details);
      toast.error(error.message || "Failed to upload documents");
    },
  });
};
