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
import { useOptions } from "../../context/OptionsProvider";
import { useDocumentActions } from "../../hooks/useDocuments";

export default function DocumentRow({ doc, view, onToggleStar, getAccent }) {
  const { openOptions } = useOptions();
  const { handleActionClick, downloadDocHandler, toggleFavoriteHandler } =
    useDocumentActions();
  const accent = getAccent(doc);
  const isImage = ["JPG", "JPEG", "PNG", "GIF", "WEBP"].includes(
    doc.fileType.toUpperCase(),
  );

  function handleMoreClick(e) {
    openOptions(e, doc, [
      { type: "Preview", label: "Preview", icon: IconEye },
      { type: "Download", label: "Download", icon: IconDownload },
      { type: "Share", label: "Share", icon: IconShare },
      { type: "Edit", label: "Edit", icon: IconEdit },
      { type: "Move", label: "Move to folder", icon: IconFolder },
      {
        type: "Favorite",
        label: doc.favorite ? "Remove from favorites" : "Add to favorites",
        icon: IconStar,
      },
      {
        type: "Delete",
        label: "Move to bin",
        icon: IconTrash,
        dividerBefore: true,
      },
    ]);
  }

  function handleActionButton(e, actionType) {
    e.preventDefault();
    if (actionType === "Download") {
      downloadDocHandler(doc);
    } else if (actionType === "Favorite") {
      toggleFavoriteHandler(doc.id);
    } else {
      handleActionClick(e, actionType, doc);
    }
  }

  return (
    <div className={`doc-row-v2 doc-row-v2--${view}`} key={doc.id}>
      <button
        type="button"
        className="doc-row-v2__star"
        onClick={(e) => {
          e.preventDefault();
          toggleFavoriteHandler(e, doc.id);
        }}
        aria-label={doc.favorite ? "Unstar" : "Star"}
      >
        <IconStar filled={doc.favorite} />
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
            <IconSparkleSmall /> AI analysed
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
            onClick={(e) => handleActionButton(e, "Preview")}
          >
            <IconEye /> Preview
          </button>
          <button
            type="button"
            className="doc-row-v2__action"
            onClick={(e) => handleActionButton(e, "Share")}
          >
            <IconShare /> Share
          </button>
          <button
            type="button"
            className="doc-row-v2__action"
            onClick={(e) => handleActionButton(e, "Download")}
          >
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
