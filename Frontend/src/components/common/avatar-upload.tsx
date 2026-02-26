import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, User, BotMessageSquare } from "lucide-react";

interface AvatarUploadProps {
  profilePhoto: string;
  handlePhotoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: "user" | "agent";
}

export function AvatarUpload({
  profilePhoto,
  handlePhotoUpload,
  type,
}: AvatarUploadProps) {
  return (
    <div className="flex items-center gap-4 text-left w-full">
      <div className="relative shrink-0">
        <Avatar className="h-24 w-24 border-2 border-border">
          <AvatarImage
            src={profilePhoto}
            className="h-full w-full object-cover"
          />
          <AvatarFallback>
            {type === "user" ? <User className="h-10 w-10 text-muted-foreground" /> : <BotMessageSquare  className="h-10 w-10 text-muted-foreground" />}
          </AvatarFallback>
        </Avatar>

        <label
          htmlFor="photo-upload"
          className="absolute bottom-2 right-0 bg-blue-500 rounded-full p-1 text-white cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoUpload}
          />
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold text-foreground">
          Upload an avatar
        </h3>
        <p className="text-sm font-normal text-muted-foreground leading-tight">
          PNG, JPG or WEBP up to 1MB.
          <br />
          Recommended square size.
        </p>
      </div>
    </div>
  );
}
