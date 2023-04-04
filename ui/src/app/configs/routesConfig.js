import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import Error404Page from '../main/404/Error404Page';
import ExampleConfig from '../main/example/ExampleConfig';
import WojciechConfig from '../main/wojciech/WojciechConfig'
import PostConfig from '../main/post/PostConfig';
import SubpageConfig from '../main/subpage/SubpageConfig';
import MatiConfig from "../main/mati/MatiConfig";
import SpecificNameConfig from '../main/specific-name/SpecificNameConfig';
import DominikConfig from '../main/dominik/DominikConfig';
import FinancesConfig from "../main/finances/FinancesConfig";
import InvoicesConfig from "../main/invoices/InvoicesConfig";
import GitProjectsConfig from '../main/gitprojects/GitProjectsConfig';
import DawidConfig from "../main/dawid/DawidConfig";
import PiotrConfig from "../main/piotr/PiotrConfig";

// const routeConfigs = [ExampleConfig, PostConfig, SignOutConfig, SignInConfig, SignUpConfig, GitProjectsConfig];

const routeConfigs = [ExampleConfig, PostConfig, SignOutConfig, SignInConfig, SignUpConfig, SpecificNameConfig, GitProjectsConfig, SubpageConfig, WojciechConfig, MatiConfig, DawidConfig, PiotrConfig, DominikConfig, FinancesConfig, InvoicesConfig];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
  {
    path: '/',
    element: <Navigate to="/example" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  },
];

export default routes;
