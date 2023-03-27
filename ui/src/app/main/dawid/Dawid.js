import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import DawidContent from './DawidContent'

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

function Dawid(props) {
  return (
    <Root
      header={
        <div className="p-24">
          <h4>Dawid's page</h4>
        </div>
      }
      content={
        <div className="p-24">
          <DawidContent/>
        </div>
      }
      scroll="content"
    />
  );
}

export default Dawid;
