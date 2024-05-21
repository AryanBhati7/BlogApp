import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import fileupload from "../assets/img/file-upload.svg";

const FileUploader = ({ onFileSelect, imgSrc }) => {
  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (imgSrc && initialLoad) {
      setFileUrl(imgSrc);
      setInitialLoad(false);
    }
  }, [imgSrc, initialLoad]);
  const convertFileToUrl = (file) => URL.createObjectURL(file);
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles);
      onFileSelect(acceptedFiles[0]);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [onFileSelect, convertFileToUrl]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-col bg-dark-3  py-4 border border-dashed border-[#e0e0e0] rounded-xl cursor-pointer w-full items-center justify-center"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {fileUrl ? (
        <>
          <div className="flex flex-1 p-2 w-full justify-center items-center">
            <img
              src={fileUrl}
              alt="image"
              className="w-full h-64 object-cover"
            />
          </div>
          <p className="file_uploader-label mb-2">
            Click or drag photo to replace
          </p>
        </>
      ) : (
        <div className="file_uploader-box w-full flex flex-col justify-center items-center">
          <img
            src={fileupload}
            // src="./assets"
            width={96}
            height={77}
            alt="file upload"
          />

          <h3 className="base-medium text-light-2 mb-2 mt-6">
            Drag photo here
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>

          <button
            type="button"
            className="w-1/3 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Select from computer
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
