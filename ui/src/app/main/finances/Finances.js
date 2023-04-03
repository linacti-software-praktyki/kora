import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import FinancesContent from './FinancesContent'

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
  },
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
}));

function Finances(props) {
  return (
    <Root
      header={
        <div className="p-24">
          <h4>Finances</h4>
        </div>
      }
      content={
        <div className="py-32">
          <FinancesContent/>
        </div>
      }
      scroll="content"
    />
  );
}

export default Finances;
