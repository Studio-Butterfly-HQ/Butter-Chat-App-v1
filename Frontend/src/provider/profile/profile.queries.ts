import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateProfileApi,
  uploadAvatarApi,
  getUserProfileApi,
  updateUserProfileApi,
  updatePasswordApi,
} from "./profile.api";
import {
  ApiResponse,
  Profile,
  ProfilePayload,
  AvatarUploadResponse,
  User,
} from "./profile.types";
import { useQuery } from "@tanstack/react-query";
import { fetchProfileMetaApi } from "./profile.api";
import { ProfileMetaResponse } from "./profile.types";
import { toast } from "sonner";
import { useAppSelector } from "@/store/hooks";
import {
  fetchCompanyProfileApi,
  fetchLocationDefaultsApi,
} from "./profile.api";
import { useAppDispatch } from "@/store/hooks";
import { setCompany, setUser } from "@/store/slices/auth/auth-slice";
import { logout } from "@/store/slices/auth/auth-slice";
import { persistor } from "@/store/index";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useUploadAvatar = (tokenOverride?: string | null) => {
  const reduxToken = useAppSelector((state) => state.auth.token);
  const token = tokenOverride || reduxToken;

  return useMutation({
    mutationFn: (file: File) => {
      if (!token) {
        throw new Error("No auth token found");
      }
      return uploadAvatarApi(file, token);
    },

    onError: (error: any) => {
      console.error("Avatar upload error:", error);
      toast.error(error?.message || "Failed to upload avatar");
    },
  });
};

export const useUpdateCompanyProfile = () => {
  const queryClient = useQueryClient();
  const token = useAppSelector((state) => state.auth.token);
  const company = useAppSelector((state) => state.auth.company);
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (payload: ProfilePayload) => {
      if (!token) {
        throw new Error("No auth token found");
      }
      return updateProfileApi(payload, token);
    },

    onSuccess: (res, variables) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["company-profile"] });

      if (company) {
        dispatch(
          setCompany({
            ...company,
            ...variables,
          }),
        );
      }
    },

    onError: (error: any) => {
      console.error("Update profile error details:", error?.error?.details);
      toast.error(error.message);
    },
  });
};

export const useCompanyProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);

  const query = useQuery({
    queryKey: ["company-profile", token],
    enabled: !!token,

    queryFn: async () => {
      if (!token) {
        throw new Error("No auth token found");
      }
      return fetchCompanyProfileApi(token);
    },

    retry: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  /* Handle SUCCESS (including success:false) */
  useEffect(() => {
    if (!query.isSuccess) return;

    if (!query.data?.success) {
      console.error(
        "Company profile error details:",
        query.data?.error,
      );
      dispatch(logout());
      persistor.purge().then(() => {
        navigate("/login", { replace: true });
      });
      return;
    }
    dispatch(setCompany(query.data.data));

    if (!user) {
      const defaultUser =
        query.data.data.users?.find((u: any) => u.role === "OWNER") ??
        query.data.data.users?.[0];

      if (defaultUser) {
        dispatch(setUser(defaultUser));
      }
    }
  }, [query.isSuccess, query.data, dispatch, navigate, user]);

  /* Handle HTTP / Network errors */
  useEffect(() => {
    if (!query.isError) return;

    console.error("Company profile request failed:",(query.error as any)?.error);

    dispatch(logout());
    persistor.purge().then(() => {
      navigate("/login", { replace: true });
    });
  }, [query.isError, query.error, dispatch, navigate]);

  return query;
};

export const useProfileMeta = () =>
  useQuery({
    queryKey: ["profile-meta"],
    queryFn: fetchProfileMetaApi,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
  });

export const useDetectLocation = () =>
  useQuery({
    queryKey: ["location-defaults"],
    queryFn: fetchLocationDefaultsApi,
  });

export const useUserProfile = () => {
  const token = useAppSelector((state) => state.auth.token);

  return useQuery({
    queryKey: ["user-profile", token],
    queryFn: () => {
      if (!token) {
        throw new Error("No auth token found");
      }
      return getUserProfileApi(token);
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (payload: Partial<User>) => {
      if (!token) {
        throw new Error("No auth token found");
      }
      return updateUserProfileApi(payload, token);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      queryClient.invalidateQueries({ queryKey: ["company-profile"] });
      dispatch(setUser(res.data));
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update profile");
    },
  });
};

export const useUpdatePassword = () => {
  const token = useAppSelector((state) => state.auth.token);

  return useMutation({
    mutationFn: (payload: any) => {
      if (!token) {
        throw new Error("No auth token found");
      }
      return updatePasswordApi(payload, token);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update password");
    },
  });
};
