import { useEffect, useState } from "react";
import {
  formatBytes,
  useFileUpload,
  type FileMetadata,
  type FileWithPreview,
} from "@/hooks/use-file-upload";
import { CheckCircle2Icon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CloudUpload,
  Download,
  FileArchiveIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  HeadphonesIcon,
  ImageIcon,
  RefreshCwIcon,
  Trash2,
  TriangleAlert,
  Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadItem extends FileWithPreview {
  progress: number;
  status: "uploading" | "completed" | "error";
  error?: string;
}

interface TableUploadProps {
  maxFiles?: number;
  maxSize?: number;
  accept?: string;
  multiple?: boolean;
  className?: string;
  onFilesChange?: (files: FileWithPreview[]) => void;
  simulateUpload?: boolean;
}

export default function TableUpload({
  maxFiles = 10,
  maxSize = 50 * 1024 * 1024,
  accept = "*",
  multiple = true,
  className,
  onFilesChange,
  simulateUpload = true,
}: TableUploadProps) {
  const defaultFiles: FileMetadata[] = [];

  const defaultUploadFiles: FileUploadItem[] = [];

  const [uploadFiles, setUploadFiles] =
    useState<FileUploadItem[]>(defaultUploadFiles);

  const [
    { isDragging, errors },
    {
      removeFile,
      clearFiles,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      getInputProps,
    },
  ] = useFileUpload({
    maxFiles,
    maxSize,
    accept,
    multiple,
    initialFiles: defaultFiles,
    onFilesChange: (newFiles) => {
      const newUploadFiles = newFiles.map((file) => {
        const existing = uploadFiles.find((f) => f.id === file.id);
        if (existing) return { ...existing, ...file };

        return {
          ...file,
          progress: 0,
          status: "uploading" as const,
        };
      });

      setUploadFiles(newUploadFiles);
      onFilesChange?.(newFiles);
    },
  });

  useEffect(() => {
    if (!simulateUpload) return;

    const interval = setInterval(() => {
      setUploadFiles((prev) =>
        prev.map((file) => {
          if (file.status !== "uploading") return file;

          const inc = Math.random() * 15 + 5;
          const progress = Math.min(file.progress + inc, 100);

          if (progress >= 100) {
            const fail = Math.random() < 0.1;
            return {
              ...file,
              progress: 100,
              status: fail ? "error" : "completed",
              error: fail ? "Upload failed. Please try again." : undefined,
            };
          }

          return { ...file, progress };
        }),
      );
    }, 500);

    return () => clearInterval(interval);
  }, [simulateUpload]);

  const removeUploadFile = (id: string) => {
    setUploadFiles((prev) => prev.filter((f) => f.id !== id));
    removeFile(id);
  };

  const retryUpload = (id: string) => {
    setUploadFiles((prev) =>
      prev.map((f) =>
        f.id === id
          ? { ...f, progress: 0, status: "uploading", error: undefined }
          : f,
      ),
    );
  };

  const getFileIcon = (file: File | FileMetadata) => {
    const type = file.type;
    const name = file.name.toLowerCase();
    if (type.includes("pdf") || name.endsWith(".pdf")) return <FileTextIcon size={22}/>;
    if (type.includes("word") || name.endsWith(".doc") || name.endsWith(".docx")) return <FileTextIcon size={22}/>;
    if (type.includes("excel") || type.includes("sheet") || name.endsWith(".csv")) return <FileSpreadsheetIcon size={22}/>;
    if (type.includes("zip") || name.endsWith(".zip")) return <FileArchiveIcon size={22}/>;
    if (name.endsWith(".json") || name.endsWith(".xml") || name.endsWith(".md") || name.endsWith(".txt")) return <FileTextIcon size={22}/>;
    return <FileTextIcon size={22}/>;
  };

  const getFileTypeLabel = (file: File | FileMetadata) => {
    const type = file.type;
    const name = file.name.toLowerCase();
    
    if (type.includes("pdf") || name.endsWith(".pdf")) return "PDF";
    if (type.includes("word") || name.endsWith(".doc") || name.endsWith(".docx")) return "Word";
    if (type.includes("json") || name.endsWith(".json")) return "JSON";
    if (type.includes("text") || name.endsWith(".txt")) return "Text";
    if (type.includes("csv") || name.endsWith(".csv")) return "CSV";
    if (name.endsWith(".xml")) return "XML";
    if (name.endsWith(".md")) return "Markdown";
    if (type.includes("excel") || type.includes("sheet")) return "Spreadsheet";
    return "File";
  };

  return (
    <div className={cn("w-full space-y-4 overflow-hidden", className)}>
      <div
        className={cn(
          "rounded-lg border border-dashed p-6 text-center",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/50",
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input {...getInputProps()} className="sr-only" />

        <div 
          className="flex flex-col items-center gap-4 cursor-pointer" 
          onClick={openFileDialog}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openFileDialog(); }}
          tabIndex={0}
          role="button"
          aria-label="Upload files"
        >
            <Upload className="h-6 w-6" />
            <div className="flex flex-col items-center">
                <h3 className="text-base font-medium text-muted-foreground">Click to upload or drag and drop</h3>
                <p className="text-sm text-muted-foreground">PDF, Word, TXT, CSV, JSON, MD, XML (MAX. 40MB) file</p>
            </div>
        </div>      </div>

      {uploadFiles.length > 0 && (
        <div className="rounded-lg border">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="max-w-[150px]">Name</TableHead>
                <TableHead className="min-w-fit">Type</TableHead>
                <TableHead className="min-w-fit">Size</TableHead>
                <TableHead className="text-right min-w-fit">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {uploadFiles.map((file) => (
                <TableRow key={file.id}>
                  <TableCell className="flex items-center gap-2 w-[180px] py-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-5 h-5">
                      {getFileIcon(file.file)}
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="truncate text-sm">{file.file.name}</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{file.file.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {getFileTypeLabel(file.file)}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatBytes(file.file.size)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      {/* {file.preview && (
                        <Button size="icon" variant="outline" asChild>
                          <a
                            href={file.preview}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Download className="size-4" />
                          </a>
                        </Button>
                      )} */}
                      {file.status === "error" ? (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => retryUpload(file.id)}
                        >
                          <RefreshCwIcon />
                        </Button>
                      ) : (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => removeUploadFile(file.id)}
                        >
                          <Trash2 className="text-red-500"/>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {errors.length > 0 && (
        <Alert variant="destructive">
          <TriangleAlert />
          <AlertTitle>Upload error</AlertTitle>
          <AlertDescription>
            {errors.map((e, i) => (
              <p key={i}>{e}</p>
            ))}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
