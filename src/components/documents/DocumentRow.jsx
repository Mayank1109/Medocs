import React from "react";
import {
  IconStar,
  IconFileImage,
  IconFilePdf,
  IconEye,
  IconShare,
  IconEdit,
  IconDownload,
  IconMoreVertical,
  IconFolder,
  IconTrash,
  IconSparkleSmall,
} from "../../icons/AppIcons";
import { useOptions } from "../../hooks/useOptions";
import { useDocumentActions } from "../../hooks/useDocuments";
import { notImplementedToast } from "../../utility/Functions";
import { useToast } from "../../hooks/useToast";
export default function DocumentRow({
  doc,
  view,
  isStarred,
  onToggleStar,
  getAccent,
}) {
  const { openOptions } = useOptions();
  const { handleActionClick } = useDocumentActions();
  const accent = getAccent(doc);
  const { setDocPayload } = useOptions();
  const isImage = ["JPG", "JPEG", "PNG", "GIF", "WEBP"].includes(
    doc.fileType.toUpperCase(),
  );
  const toast = useToast();

  function handleMoreClick(e) {
    openOptions(e, doc, [
      { type: "Preview", label: "Preview", icon: IconEye },
      { type: "Download", label: "Download", icon: IconDownload },
      { type: "Share", label: "Share", icon: IconShare },
      { type: "Edit", label: "Edit", icon: IconEdit },
      { type: "Move", label: "Move to folder", icon: IconFolder },
      { type: "Favorite", label: "Add to favorites", icon: IconStar },
      {
        type: "Delete",
        label: "Move to bin",
        icon: IconTrash,
        dividerBefore: true,
      },
    ]);
  }

  function handleShareClick(e) {
    e.preventDefault();
    notImplementedToast(toast, "Sharing");
  }

  function handlePreviewClick(e) {
    e.preventDefault();
    setDocPayload(doc);
    handleActionClick(e, "Preview");
  }

  return (
    <div className={`doc-row-v2 doc-row-v2--${view}`} key={doc.id}>
      <button
        type="button"
        className="doc-row-v2__star"
        onClick={() => onToggleStar(doc.id)}
        aria-label={isStarred ? "Unstar" : "Star"}
      >
        <IconStar filled={isStarred} />
      </button>

      <span className={`doc-icon-v2 doc-icon-v2--${accent}`}>
        {isImage ? <IconFileImage /> : <IconFilePdf />}
        <span className="doc-icon-v2__type">{doc.fileType}</span>
      </span>

      <div className="doc-row-v2__info">
        <div className="doc-row-v2__name">{doc.name}</div>
        <div className="doc-row-v2__meta">
          {doc.fileType} · {doc.size} · Uploaded {doc.date}
        </div>
        {doc.aiStatus === "available" ? (
          <span className="badge badge--amber doc-row-v2__ai-badge">
            <IconSparkleSmall /> AI analysis available
          </span>
        ) : (
          <span className="badge doc-row-v2__ai-badge doc-row-v2__ai-badge--none">
            No AI analysis
          </span>
        )}
      </div>

      {view === "list" && (
        <div className="doc-row-v2__actions">
          <button
            type="button"
            className="doc-row-v2__action"
            onClick={handlePreviewClick}
          >
            <IconEye /> Preview
          </button>
          <button
            type="button"
            className="doc-row-v2__action"
            onClick={handleShareClick}
          >
            <IconShare /> Share
          </button>
          <button type="button" className="doc-row-v2__action">
            <IconDownload /> Download
          </button>
        </div>
      )}

      <button
        type="button"
        className="doc-row-v2__more"
        aria-label="More options"
        onClick={handleMoreClick}
      >
        <IconMoreVertical />
      </button>
    </div>
  );
}
