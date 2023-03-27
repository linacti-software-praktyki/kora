import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import WorkTrackingContent from './WorkTrackingContent'

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

function WorkTracking(props) {
  return (
    <Root
      header={
        <div className="p-24">
          <h4>Work Tracking</h4>
        </div>
      }
      content={
        <div className="p-32">
          <WorkTrackingContent/>
        </div>
      }
      scroll="content"
    />
  );
}

export default WorkTracking;
