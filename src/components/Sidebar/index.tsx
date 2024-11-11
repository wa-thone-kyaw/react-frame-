import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../../images/logo/logo.svg';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ViewListIcon from '@mui/icons-material/ViewList';
import AddBoxIcon from '@mui/icons-material/AddBox';
import HailIcon from '@mui/icons-material/Hail';
import RawOnIcon from '@mui/icons-material/RawOn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import CategoryIcon from '@mui/icons-material/Category';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;
  const { t } = useTranslation();
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] = useState(false);
  const [isSupplierDropdownOpen, setIsSupplierDropdownOpen] = useState(false);
  const [isRawMaterialDropdownOpen, setIsRawMaterialDropdownOpen] =
    useState(false);
  const [isOrderDropdownOpen, setIsOrderDropdownOpen] = useState(false);
  const [isRoleAndPermissionDropdownOpen, setIsRoleAndPermissionDropdownOpen] =
    useState(false);
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });
  ///for side bar dropdown
  const toggleProductDropdown = () => {
    setIsProductDropdownOpen((prev) => !prev);
  };
  const toggleCustomerDropdown = () => {
    setIsCustomerDropdownOpen((prev) => !prev);
  };

  const toggleSupplierDropdown = () => {
    setIsSupplierDropdownOpen((prev) => !prev);
  };
  const toggleRawMaterialDropdown = () => {
    setIsRawMaterialDropdownOpen((prev) => !prev);
  };
  const toggleOrderDropdown = () => {
    setIsOrderDropdownOpen((prev) => !prev);
  };
  const toggleRoleAndPermissionDropdown = () => {
    setIsRoleAndPermissionDropdownOpen((prev) => !prev);
  };
  const toggleSettingsDropdown = () => {
    setIsSettingsDropdownOpen((prev) => !prev);
  };
  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-70 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img src={Logo} alt="Logo" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    (pathname === '/' || pathname.includes('dashboard')) &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <GridViewOutlinedIcon />
                  {t('sidebar.dashboard')}
                </NavLink>
              </li>
              {/* Product with Dropdown */}
              <li>
                <div
                  className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 cursor-pointer"
                  onClick={toggleProductDropdown}
                  aria-expanded={isProductDropdownOpen}
                >
                  <ShoppingCartIcon />
                  {t('sidebar.products')}
                  <svg
                    className={`transform duration-300 ${
                      isProductDropdownOpen ? 'rotate-180' : ''
                    }`}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 8.33334L10 13.3333L5 8.33334"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {isProductDropdownOpen && (
                  <ul className="ml-8 mt-2 space-y-1">
                    <li>
                      <NavLink
                        to="productList"
                        className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 cursor-pointer"
                      >
                        <ViewListIcon />
                        {t('sidebar.productList')}
                      </NavLink>
                    </li>{' '}
                    <li>
                      <NavLink
                        to="addProduct"
                        className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 cursor-pointer"
                      >
                        <AddBoxIcon />
                        {t('sidebar.addProducts')}
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              {/* Customer with Dropdown */}
              <li>
                <div
                  className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 cursor-pointer"
                  onClick={toggleCustomerDropdown}
                  aria-expanded={isCustomerDropdownOpen}
                >
                  <PeopleOutlineOutlinedIcon />
                  {t('sidebar.customers')}
                  <svg
                    className={`transform duration-300 ${
                      isCustomerDropdownOpen ? 'rotate-180' : ''
                    }`}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 8.33334L10 13.3333L5 8.33334"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {isCustomerDropdownOpen && (
                  <ul className="ml-8 mt-2 space-y-1">
                    <li>
                      <NavLink
                        to="customersList"
                        className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 cursor-pointer"
                      >
                        <ViewListIcon />
                        {t('sidebar.customersList')}
                      </NavLink>
                    </li>{' '}
                    <li>
                      <NavLink
                        to="addCustomer"
                        className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 cursor-pointer"
                      >
                        <AddBoxIcon />
                        {t('sidebar.addCustomer')}
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              {/* Supplier with Dropdown */}
              <li>
                <div
                  className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 cursor-pointer"
                  onClick={toggleSupplierDropdown}
                  aria-expanded={isSupplierDropdownOpen}
                >
                  <HailIcon />
                  {t('sidebar.suppliers')}
                  <svg
                    className={`transform duration-300 ${
                      isSupplierDropdownOpen ? 'rotate-180' : ''
                    }`}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 8.33334L10 13.3333L5 8.33334"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {isSupplierDropdownOpen && (
                  <ul className="ml-8 mt-2 space-y-1">
                    <li>
                      <NavLink
                        to="suppliersList"
                        className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 cursor-pointer"
                      >
                        <ViewListIcon />
                        {t('sidebar.suppliersList')}
                      </NavLink>
                    </li>{' '}
                    <li>
                      <NavLink
                        to="addSupplier"
                        className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 cursor-pointer"
                      >
                        <AddBoxIcon />
                        {t('sidebar.addSupplier')}
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              {/* RawMaterial with Dropdown */}
              <li>
                <div
                  className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 cursor-pointer"
                  onClick={toggleRawMaterialDropdown}
                  aria-expanded={isRawMaterialDropdownOpen}
                >
                  <RawOnIcon />
                  {t('sidebar.rawMaterials')}
                  <svg
                    className={`transform duration-300 ${
                      isRawMaterialDropdownOpen ? 'rotate-180' : ''
                    }`}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 8.33334L10 13.3333L5 8.33334"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {isRawMaterialDropdownOpen && (
                  <ul className="ml-8 mt-2 space-y-1">
                    <li>
                      <NavLink
                        to="rawMaterialsList"
                        className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 cursor-pointer"
                      >
                        <ViewListIcon />
                        {t('sidebar.rawMaterialsList')}
                      </NavLink>
                    </li>{' '}
                    <li>
                      <NavLink
                        to="addRawMaterial"
                        className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 cursor-pointer"
                      >
                        <AddBoxIcon />
                        {t('sidebar.addRawMaterial')}
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              {/* order with Dropdown */}
              <li>
                <div
                  className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 cursor-pointer"
                  onClick={toggleOrderDropdown}
                  aria-expanded={isOrderDropdownOpen}
                >
                  <AssignmentIcon />
                  {t('sidebar.orders')}
                  <svg
                    className={`transform duration-300 ${
                      isOrderDropdownOpen ? 'rotate-180' : ''
                    }`}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 8.33334L10 13.3333L5 8.33334"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {isOrderDropdownOpen && (
                  <ul className="ml-8 mt-2 space-y-1">
                    <li>
                      <NavLink
                        to="ordersList"
                        className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 cursor-pointer"
                      >
                        <ViewListIcon />
                        {t('sidebar.ordersList')}
                      </NavLink>
                    </li>{' '}
                    <li>
                      <NavLink
                        to="addOrder"
                        className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 cursor-pointer"
                      >
                        <AddBoxIcon />
                        {t('sidebar.addOrder')}
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>{' '}
              {/* Role and Permission  with Dropdown */}
              <li>
                <div
                  className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 cursor-pointer"
                  onClick={toggleRoleAndPermissionDropdown}
                  aria-expanded={isRoleAndPermissionDropdownOpen}
                >
                  <LockPersonIcon />
                  {t('sidebar.roleAndPermission')}
                  <svg
                    className={`transform duration-300 ${
                      isRoleAndPermissionDropdownOpen ? 'rotate-180' : ''
                    }`}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 8.33334L10 13.3333L5 8.33334"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {isRoleAndPermissionDropdownOpen && (
                  <ul className="ml-8 mt-2 space-y-1">
                    <li>
                      <NavLink
                        to="rolesAndPermissionsList"
                        className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 cursor-pointer"
                      >
                        <ViewListIcon />
                        {t('sidebar.rolesAndPermissionsList')}
                      </NavLink>
                    </li>{' '}
                    <li>
                      <NavLink
                        to="addRoleAndPermission"
                        className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 cursor-pointer"
                      >
                        <AddBoxIcon />
                        {t('sidebar.addRoleAndPermission')}
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              {/* Settings with Dropdown */}
              <li>
                <div
                  className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 cursor-pointer"
                  onClick={toggleSettingsDropdown}
                  aria-expanded={isSettingsDropdownOpen}
                >
                  <SettingsApplicationsIcon />
                  {t('sidebar.settings')}
                  <svg
                    className={`transform duration-300 ${
                      isSettingsDropdownOpen ? 'rotate-180' : ''
                    }`}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 8.33334L10 13.3333L5 8.33334"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {isSettingsDropdownOpen && (
                  <ul className="ml-8 mt-2 space-y-1">
                    <li>
                      <NavLink
                        to="colors"
                        className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 cursor-pointer"
                      >
                        <ColorLensIcon />
                        {t('sidebar.colors')}
                      </NavLink>
                    </li>{' '}
                    <li>
                      <NavLink
                        to="types"
                        className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 cursor-pointer"
                      >
                        <MergeTypeIcon />
                        {t('sidebar.types')}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="categories"
                        className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 cursor-pointer"
                      >
                        <CategoryIcon />
                        {t('sidebar.categories')}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="generalSettings"
                        className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 cursor-pointer"
                      >
                        <SettingsApplicationsIcon />
                        {t('sidebar.generalSettings')}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="usersManagement"
                        className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 cursor-pointer"
                      >
                        <ManageAccountsIcon />
                        {t('sidebar.usersManagement')}
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};
export default Sidebar;
