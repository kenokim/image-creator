import JSZip from "jszip";
import { saveAs } from "file-saver";

export async function downloadImagesAsZip(urls: string[], filename = "images.zip") {
  const zip = new JSZip();
  const folder = zip.folder("images");
  if (!folder) return;

  const fetchAsBlob = async (url: string) => {
    const res = await fetch(url);
    const blob = await res.blob();
    return blob;
  };

  await Promise.all(
    urls.map(async (url, idx) => {
      try {
        const blob = await fetchAsBlob(url);
        const ext = blob.type.split("/")[1] || "jpg";
        folder.file(`image_${String(idx + 1).padStart(2, "0")}.${ext}`, blob);
      } catch (e) {
        console.error("다운로드 실패:", url, e);
      }
    })
  );

  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, filename);
}
