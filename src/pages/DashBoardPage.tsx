import React from 'react';
import Sidebar from '@/components/constants/sidebar';
import Dashboard from '@/components/Dashboard';

const DashBoardPage: React.FC = () => {
    return (
        <div className=" flex gap-2 ">
          <div className=" fixed  lg:relative my-sidebar z-10 lg-z-0">
            <Sidebar />
          </div>
          <div className="flex my-body">
            <Dashboard      />
          </div>
        </div>
      );

};

export default DashBoardPage;
