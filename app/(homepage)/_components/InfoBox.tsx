const InfoBox = ({
  caption,
  value,
  captionFontSize = "text-[50px]",
  style = "primary",
}: {
  caption: string;
  value: number;
  captionFontSize?: string;
  style?: string;
}) => {
  return (
    <div className="flex flex-col items-center space-y-4 font-semibold">
      <div
        className={`border-10 border-${style} text-${style} w-[180px] h-[180px] bg-white ${captionFontSize} rounded-full flex items-center justify-center`}
      >
        {value}
      </div>
      <span className={`text-[20px] text-${style}`}>{caption}</span>
    </div>
  );
};

export default InfoBox;
