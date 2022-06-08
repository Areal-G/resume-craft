import { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { parseResumeFromPdf } from "lib/parse-resume-from-pdf";
import {
  getHasUsedAppBefore,
  saveStateToLocalStorage,
} from "lib/redux/local-storage";
import { type ShowForm, initialSettings } from "lib/redux/settingsSlice";
import { useRouter } from "next/navigation";
import addPdfSrc from "public/assets/add-pdf.svg";
import Image from "next/image";
import { cx } from "lib/cx";
import { deepClone } from "lib/deep-clone";

const defaultFileState = {
  name: "",
  size: 0,
  fileUrl: "",
};

export const ResumeDropzone = ({
  onFileUrlChange,
  className,
  playgroundView = false,
}: {
  onFileUrlChange: (fileUrl: string) => void;
  className?: string;
  playgroundView?: boolean;
}) => {
  const [file, setFile] = useState(defaultFileState);
  const [isHoveredOnDropzone, setIsHoveredOnDropzone] = useState(false);
  const [hasNonPdfFile, setHasNonPdfFile] = useState(false);
  const [importError, setImportError] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const router = useRouter();

  const hasFile = Boolean(file.name);

  const setNewFile = (newFile: File) => {
    if (file.fileUrl) {
      URL.revokeObjectURL(file.fileUrl);
    }

    const { name, size } = newFile;
    const fileUrl = URL.createObjectURL(newFile);
    setFile({ name, size, fileUrl });
    onFileUrlChange(fileUrl);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsHoveredOnDropzone(false);
    // Dragging text or links has no files, so guard against undefined
    const newFile = event.dataTransfer.files?.[0];
    if (!newFile) return;
    acceptFile(newFile);
  };

  const acceptFile = (newFile: File) => {
    if (isPdfFile(newFile)) {
      setHasNonPdfFile(false);
      setImportError("");
      setNewFile(newFile);
    } else {
      setHasNonPdfFile(true);
    }
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFile = files[0];
    if (newFile) acceptFile(newFile);
    // Reset so selecting the same file again still fires onChange
    event.target.value = "";
  };

  const onRemove = () => {
    if (file.fileUrl) URL.revokeObjectURL(file.fileUrl);
    setImportError("");
    setFile(defaultFileState);
    onFileUrlChange("");
  };

  const onImportClick = async () => {
    setImportError("");
    setIsImporting(true);
    let resume;
    try {
      resume = await parseResumeFromPdf(file.fileUrl);
    } catch {
      setIsImporting(false);
      setImportError(
        "We couldn't read this PDF. It may be damaged, password-protected or a scanned image."
      );
      return;
    }
    const settings = deepClone(initialSettings);

    // Set formToShow settings based on uploaded resume if users have used the app before
    if (getHasUsedAppBefore()) {
      const sections = Object.keys(settings.formToShow) as ShowForm[];
      const sectionToFormToShow: Record<ShowForm, boolean> = {
        workExperiences: resume.workExperiences.length > 0,
        educations: resume.educations.length > 0,
        projects: resume.projects.length > 0,
        skills: resume.skills.descriptions.length > 0,
        custom: resume.custom.descriptions.length > 0,
      };
      for (const section of sections) {
        settings.formToShow[section] = sectionToFormToShow[section];
      }
    }

    saveStateToLocalStorage({ resume, settings });
    router.push("/resume-builder");
  };

  return (
    <div
      className={cx(
        "flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 ",
        isHoveredOnDropzone && "border-indigo-400",
        playgroundView ? "pb-6 pt-4" : "py-12",
        className
      )}
      onDragOver={(event) => {
        event.preventDefault();
        setIsHoveredOnDropzone(true);
      }}
      onDragLeave={() => setIsHoveredOnDropzone(false)}
      onDrop={onDrop}
    >
      <div
        className={cx(
          "text-center",
          playgroundView ? "space-y-2" : "space-y-3"
        )}
      >
        {!playgroundView && (
          <Image
            src={addPdfSrc}
            className="mx-auto h-14 w-14"
            alt="Add pdf"
            aria-hidden="true"
            priority
          />
        )}
        {!hasFile ? (
          <>
            <p
              className={cx(
                "pt-3 text-gray-700",
                !playgroundView && "text-lg font-semibold"
              )}
            >
              Browse for a PDF file or drop it here
            </p>
            <p className="flex text-sm text-gray-500">
              <LockClosedIcon className="mr-1 mt-1 h-3 w-3 text-gray-400" />
              File data is used locally and never leaves your browser
            </p>
          </>
        ) : (
          <div className="flex items-center justify-center gap-3 pt-3">
            <div className="pl-7 font-semibold text-gray-900">
              {file.name} - {getFileSizeString(file.size)}
            </div>
            <button
              type="button"
              className="outline-theme-purple rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              title="Remove file"
              aria-label="Remove file"
              onClick={onRemove}
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        )}
        <div className="pt-4">
          {!hasFile ? (
            <>
              <label
                className={cx(
                  "within-outline-theme-purple cursor-pointer rounded-full px-6 pb-2.5 pt-2 font-semibold shadow-sm",
                  playgroundView ? "border" : "bg-primary"
                )}
              >
                Browse file
                <input
                  type="file"
                  className="sr-only"
                  accept=".pdf"
                  onChange={onInputChange}
                />
              </label>
              {hasNonPdfFile && (
                <p className="mt-6 text-red-400">
                  Only PDF files are supported
                </p>
              )}
            </>
          ) : (
            <>
              {!playgroundView && (
                <button
                  type="button"
                  className="btn-primary"
                  onClick={onImportClick}
                  disabled={isImporting}
                >
                  {isImporting ? "Importing..." : "Import and Continue"}{" "}
                  <span aria-hidden="true">→</span>
                </button>
              )}
              {importError && (
                <p className="mt-6 text-red-500">{importError}</p>
              )}
              <p className={cx("text-gray-500", !playgroundView && "mt-6")}>
                Note: {!playgroundView ? "Import" : "Parser"} works best on
                single-column resumes
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const isPdfFile = (file: File) =>
  file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");

const getFileSizeString = (fileSizeB: number) => {
  const fileSizeKB = fileSizeB / 1024;
  const fileSizeMB = fileSizeKB / 1024;
  if (fileSizeKB < 1000) {
    return fileSizeKB.toPrecision(3) + " KB";
  } else {
    return fileSizeMB.toPrecision(3) + " MB";
  }
};
