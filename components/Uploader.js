import Button from "@mui/material/Button";

/**
 * 可以读取txt, md, csv, json文件，返回文件内容
 */
async function parsePlainTextFile(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => resolve(event.target.result);
    fileReader.onerror = (error) => reject(error);
    fileReader.readAsText(file);
  });
}

export default function Uploader({ onUpload, children }) {
  const handleUploadFile = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const object = await parsePlainTextFile(file);
      onUpload(object);
    }
  };

  return (
    <Button variant="contained" component="label">
      {children}
      <input
        hidden
        accept=".json, .txt, .md"
        type="file"
        onChange={handleUploadFile}
      />
    </Button>
  );
}
