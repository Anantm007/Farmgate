import React from 'react';
import ShopItems from './ShopItems';

const ShopListItems = ({ items, loading, setRun = f => f, run=undefined }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
     <div className="row">                
                {items.length && items.map((item, i) =>(
                    <div key={i} className="col-xs-12 col-sm-6 col-md-6 ">    
                        {<ShopItems item={item} index={i} setRun={setRun} run={run} />}
                        <br/><br/><br/>      
                    </div>
                ))}
      </div>
  );
};

export default ShopListItems;