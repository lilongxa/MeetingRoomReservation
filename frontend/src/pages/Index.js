import React from "react";
import { Outlet } from "react-router-dom";
import Layout from "../components/layout/ToolpadLayout";

const Index = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default Index;