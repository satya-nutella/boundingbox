export const BoundingBox = (props: { bbox: Bbox; type: string }) => {
  return (
    <div
      data-testid="bounding-box"
      className="absolute border-2 border-blue-500 z-20 group"
      style={{
        left: `${props.bbox.left}%`,
        top: `${props.bbox.top}%`,
        width: `${props.bbox.width}%`,
        height: `${props.bbox.height}%`,
      }}
    >
      <div className="text-xs absolute top-0 -left-0.5 -translate-y-[100%] rounded-t-md px-2 py-1 border-2 border-blue-500 bg-blue-500 text-white hidden group-hover:block">
        {props.type}
      </div>
    </div>
  );
};
