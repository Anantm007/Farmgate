import React from "react";
import ShopItem from "./ShopItem";

const ShopListItems = ({
  items,
  loading,
  setRun = (f) => f,
  run = undefined,
}) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="row">
      {items.length &&
        items.map((item, i) => (
          <div key={i} className="col-xs-12 col-sm-12 col-md-6 lg-6">
            {
              <ShopItem
                item={item}
                index={i}
                setRun={setRun}
                run={run}
                showCartButton={true}
              />
            }
            <br />
            <br />
            <br />
          </div>
        ))}
    </div>
  );
};

export default ShopListItems;
