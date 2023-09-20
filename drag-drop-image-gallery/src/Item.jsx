import React, { forwardRef } from "react";

const Item = forwardRef(({ id, ...props }, ref) => {
  return (
    <div className="w-auto md:w-[240px] h-[240px]" {...props} ref={ref}>
      <img
        className="w-full h-full object-cover rounded"
        src={`${id}`}
        alt=""
      />
    </div>
  );
});

export default Item;
