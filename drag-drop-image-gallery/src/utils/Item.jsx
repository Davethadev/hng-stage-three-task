import React, { forwardRef } from "react";

const Item = forwardRef(({ id, ...props }, ref) => {
  return (
    <div
      className="w-auto md:w-[240px] h-[240px] my-4 md:my-0"
      {...props}
      ref={ref}
    >
      <img
        className="w-full h-full object-cover rounded"
        src={`${id}`}
        alt=""
      />
    </div>
  );
});

export default Item;
