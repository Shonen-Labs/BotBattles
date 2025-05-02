import { useEffect, useState } from "react";
import { CopyIcon } from "./icons";
import { CheckIcon } from "lucide-react";

interface CopyButtonProps {
  copyText: string;
  className?: string;
  iconClassName?: string;
}

function CopyButton({
  copyText,
  className,
  iconClassName = "",
}: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsCopied(false);
    }, 1500);

    return () => clearTimeout(id);
  }, [isCopied]);

  function handleFallbackCopy(text: string) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      const successful = document.execCommand("copy");
      setIsCopied(successful);
    } catch (error) {
      console.error("Fallback: Oops, unable to copy", error);
    }
    document.body.removeChild(textarea);
  }

  function handleCopyClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (!copyText) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(copyText)
        .then(() => setIsCopied(true))
        .catch((err) => console.log(err));
    } else {
      handleFallbackCopy(copyText);
    }
  }

  return (
    <button
      aria-label={isCopied ? "Copied!" : "copy"}
      aria-live="assertive"
      title={isCopied ? "Copied!" : "click to copy address"}
      onClick={(e) => {
        e.preventDefault();
        handleCopyClick(e);
      }}
      className={className}
    >
      <span aria-hidden className={iconClassName}>
        {isCopied ? (
          <CheckIcon className="h-4 w-4 text-white" />
        ) : (
          <CopyIcon className="w-4 h-4 text-white" />
        )}
      </span>
    </button>
  );
}

export default CopyButton;
