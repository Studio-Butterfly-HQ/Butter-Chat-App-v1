import type React from "react";
import { useState } from "react";
import { toast } from "sonner";

interface UsePhotoUploadOptions {
  fallbackPhoto?: string;
}

export function usePhotoUpload(options: UsePhotoUploadOptions = {}) {
  const { fallbackPhoto = "" } = options;

  const [profilePhoto, setProfilePhoto] = useState(fallbackPhoto);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setAvatarFile(null);
      setProfilePhoto(fallbackPhoto);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Please select an image smaller than 5MB");
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (
      avatarFile &&
      file.name === avatarFile.name &&
      file.size === avatarFile.size
    ) {
      return;
    }
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setProfilePhoto(ev.target?.result as string);
    reader.onerror = () => {
      toast.error("Failed to read the selected image");
      setAvatarFile(null);
      setProfilePhoto(fallbackPhoto);
    };
    reader.readAsDataURL(file);
  };

  return {
    profilePhoto,
    setProfilePhoto,
    avatarFile,
    setAvatarFile,
    handlePhotoUpload,
  };
}
