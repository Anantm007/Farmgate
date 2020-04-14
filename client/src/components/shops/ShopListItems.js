import React from 'react';
import ShopItems from './ShopItems';

const ShopListItems = ({ items, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
     <div className="row">                
                {items.length && items.map((item, i) =>(
                    <div key={i} className="col-xs-12 col-sm-6 col-md-6 ">    
                        {item.inStock ? <ShopItems item={item} /> : ''}
                        <br/><br/><br/>      
                    </div>
                ))}
      </div>
  );
};

export default ShopListItems;