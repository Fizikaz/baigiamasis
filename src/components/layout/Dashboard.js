import React from 'react';
import Songs from '../songs/Songs';
import Sidebar from '../layout/Sidebar';

export default () => {
  return (
    <div className="row">
    <div className="col-md-10">
        <Songs />
    </div>
        <div className="col-md-2">
            <Sidebar />
        </div>
    </div>
  )
}
