export function slugToWords(slug) {
    return decodeURIComponent(slug)
      .replace(/_/g, "-")
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }