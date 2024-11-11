import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import DefaultLayout from './layout/DefaultLayout';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/products/ProductList';
import AddProduct from './pages/products/AddProduct';
import CustomersList from './pages/customers/CustomersList';
import AddCustomer from './pages/customers/AddCustomer';
import AddSupplier from './pages/suppliers/addSupplier';
import SuppliersList from './pages/suppliers/SuppliersList';
import RawMaterialsList from './pages/rawMaterials/RawMaterialsList';
import AddRawMaterial from './pages/rawMaterials/addRawMaterial';
import OrdersList from './pages/orders/OrdersList';
import AddOrder from './pages/orders/addOrder';
import RolesAndPermissionsList from './pages/roleAndPermissions/RolesAndPermissionsList';
import AddRoleAndPermission from './pages/roleAndPermissions/addRoleAndPermission';
import Categories from './pages/settings/Categories';
import Colors from './pages/settings/Colors';
import GeneralSettings from './pages/settings/GeneralSettings';
import Types from './pages/settings/Types';
import UsersManagement from './pages/settings/UsersManagement';
function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Dashboard" />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile" />
              <Profile />
            </>
          }
        />
        <Route
          path="/productList"
          element={
            <>
              <PageTitle title="Product List" />
              <ProductList />
            </>
          }
        />
        <Route
          path="/addProduct"
          element={
            <>
              <PageTitle title="Add Product" />
              <AddProduct />
            </>
          }
        />
        <Route
          path="/customersList"
          element={
            <>
              <PageTitle title="CustomersList" />
              <CustomersList />
            </>
          }
        />
        <Route
          path="/addCustomer"
          element={
            <>
              <PageTitle title="Add Customer" />
              <AddCustomer />
            </>
          }
        />
        <Route
          path="/suppliersList"
          element={
            <>
              <PageTitle title="SuppliersList" />
              <SuppliersList />
            </>
          }
        />
        <Route
          path="/addSupplier"
          element={
            <>
              <PageTitle title="AddSupplier" />
              <AddSupplier />
            </>
          }
        />
        <Route
          path="/RawMaterialsList"
          element={
            <>
              <PageTitle title="RawMaterialsList" />
              <RawMaterialsList />
            </>
          }
        />
        <Route
          path="/addRawMaterial"
          element={
            <>
              <PageTitle title="AddRawMaterial" />
              <AddRawMaterial />
            </>
          }
        />
        <Route
          path="/OrdersList"
          element={
            <>
              <PageTitle title="OrdersList" />
              <OrdersList />
            </>
          }
        />
        <Route
          path="/addOrder"
          element={
            <>
              <PageTitle title="AddOrder" />
              <AddOrder />
            </>
          }
        />
        <Route
          path="/rolesAndPermissionsList"
          element={
            <>
              <PageTitle title="RolesAndPermissionsList" />
              <RolesAndPermissionsList />
            </>
          }
        />
        <Route
          path="/addRoleAndPermission"
          element={
            <>
              <PageTitle title="AddRoleAndPermission" />
              <AddRoleAndPermission />
            </>
          }
        />{' '}
        <Route
          path="/RawMaterialsList"
          element={
            <>
              <PageTitle title="RawMaterialsList" />
              <RawMaterialsList />
            </>
          }
        />
        <Route
          path="/categories"
          element={
            <>
              <PageTitle title="Categories" />
              <Categories />
            </>
          }
        />
        <Route
          path="/colors"
          element={
            <>
              <PageTitle title="Colors" />
              <Colors />
            </>
          }
        />
        <Route
          path="/generalSettings"
          element={
            <>
              <PageTitle title="GeneralSettings" />
              <GeneralSettings />
            </>
          }
        />
        <Route
          path="/types"
          element={
            <>
              <PageTitle title="Types" />
              <Types />
            </>
          }
        />
        <Route
          path="/usersManagement"
          element={
            <>
              <PageTitle title="UsersManagement" />
              <UsersManagement />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}
export default App;
