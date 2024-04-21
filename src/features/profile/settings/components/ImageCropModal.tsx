import { FC, useRef, useState } from "react";
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop, type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { ModalBase } from "../../../common/components/modal/ModalBase";
import { ModalHeaderCloseButton } from "../../../common/components/modal/ModalHeaderCloseButton";
import { setCanvasPreview } from "./setCanvasPreview";

type Props = {
  closeModal: () => void;
  imageUrl: string;
  handleImageChange: any;
};

export const ImageCropModal: FC<Props> = ({ imageUrl, closeModal, handleImageChange }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    handleImageChange.handleImageChange(value);
  };

  const centerAspectCrop = (mediaWidth: number, mediaHeight: number, aspect: number) => {
    const cropWidthInPercent = (150 / mediaWidth) * 100;
    return centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: cropWidthInPercent,
        },
        aspect,
        mediaWidth,
        mediaHeight,
      ),
      mediaWidth,
      mediaHeight,
    );
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    setCrop(centerAspectCrop(naturalWidth, naturalHeight, 1));
  };

  return (
    <ModalBase onClickClose={closeModal}>
      <div className="order relative bg-white rounded-lg shadow">
        {/* <!-- Modal header --> */}
        <div className="flex items-center justify-between p-4 md:p-4 rounded-t border-b">
          <h3 className="font-cp-font text-xl font-bold text-rhyth-dark-blue">画像の切り取り</h3>
          <ModalHeaderCloseButton onClickClose={closeModal} />
        </div>
        {/* <!-- Modal body --> */}
        <div className="grid gap-3 p-4 md:p-4">
          <ReactCrop crop={crop} keepSelection onChange={(_, percentCrop) => setCrop(percentCrop)} aspect={1}>
            <img ref={imgRef} src={imageUrl} onLoad={onImageLoad} />
          </ReactCrop>
          <button
            type="button"
            className="w-full text-white bg-rhyth-gray hover:bg-hover-gray active:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={() => {
              setCanvasPreview(
                imgRef.current,
                previewCanvasRef.current,
                convertToPixelCrop(crop, imgRef.current!.width, imgRef.current!.height),
              );
            }}
          >
            画像を切り取る
          </button>
          {crop ? (
            <div className="flex items-center justify-center">
              <canvas
                ref={previewCanvasRef}
                style={{
                  objectFit: "contain",
                  // クロップされてないときは display:none にしたいのにできない
                  // display: isCropped ? "contents" : "none",
                }}
                className="w-full"
              />
            </div>
          ) : null}
          <button
            type="button"
            onClick={() => {
              const dataUrl = previewCanvasRef.current?.toDataURL();
              console.log(dataUrl);
              handleInputChange(dataUrl);
              closeModal();
            }}
            className="w-full text-white bg-rhyth-light-blue hover:bg-rhyth-blue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            送信
          </button>
        </div>
      </div>
    </ModalBase>
  );
};
