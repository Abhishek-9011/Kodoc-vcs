import crypto from "crypto";

export const normalizeContent = (content = "") => content.trim();

export const hashContent = (content = "") => {
  const normalized = normalizeContent(content);
  return crypto.createHash("sha256").update(normalized).digest("hex");
};

export const buildCommitId = ({
  contentHash,
  versionNumber,
  createdAt = new Date(),
}) => {
  const seed = `${contentHash}:${versionNumber}:${createdAt.toISOString()}`;
  return crypto.createHash("sha1").update(seed).digest("hex").slice(0, 10);
};

export const buildDefaultCommitMessage = ({
  action = "save",
  versionNumber,
  restoredFromVersionNumber,
}) => {
  if (action === "initial") {
    return `Initialize document history (v${versionNumber})`;
  }

  if (action === "restore") {
    return `Restore from v${restoredFromVersionNumber} into v${versionNumber}`;
  }

  return `Save changes as v${versionNumber}`;
};
